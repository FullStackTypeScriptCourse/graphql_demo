import { createContext, useContext, useMemo, useReducer, useState, } from "react";
import { getUserInfo, getEmptyUserInfo } from "../credentialHelper";
import facade from "../apiFacade";
type Role = "user" | "admin";
type Action = {
	type: "login" | "logout";
	[key: string]: any; //Index signature to allow any property with shape {key: value} where key is a string and value is any type
};

type State = {
	id: number;
	username: string;
	email: string;
	roles: Role[];
	loggedIn: boolean;
};

type Dispatch = (action: Action) => void;

interface AuthContextProps {
	state: State;
	dispatch: Dispatch;
}

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextProps | null>(null);

function authReducer(state: State, action: Action): State {
	switch (action.type) {
		case "login": {
			const user = getUserInfo();
			return { ...state, loggedIn: true, ...user };
		}
		case "logout": {
			facade.logout();
			const user = getEmptyUserInfo
			return { ...state, loggedIn: false, ...user };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

// we now have a reducer function and an Auth context that we can use to get a state and dispatch function

function AuthProvider({ children }: AuthProviderProps) {
	// AuthProvider can be used to wrap any component that needs access to the auth state and dispatch function.
	// Takes children as props and returns a context provider component with 2 things: 1 The children inside and 2 a callback function that provides the state and dispatch function to any component that calls useAuth (If the component is a child of the AuthProvider)
	// This component is used in App.tsx to wrap the entire app so that all components have access to the auth state and dispatch function
	const [state, dispatch] = useReducer(authReducer, {
		email: "",
		roles: [],
		loggedIn: false,
		id: 0,
		username: "",
	});

	const value = useMemo(() => ({ state, dispatch }), [state]); // useMemo is used to memoize the value so that it only changes when the state changes

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	// getting the context value from the AuthContext containing state and dispatch
	// useAuth does NOT have its own state.
	const context = useContext(AuthContext);

	if (context === undefined || context === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const state = context.state;

	const login = async (username: string, password: string) => {
		try {
			const loginResponse = await facade.login(username, password); // Sets the token in local storage
			// console.log('LOGIN RESPONSE',loginResponse);
			context.dispatch({ type: "login" }); // Reads the token from local storage and sets the user info in the state
		} catch (err: any) {
			return Promise.reject(err);
		}
	};

	const logout = () => {
		context.dispatch({ type: "logout" });
	};

	const revalidate = async () => {
		if (!state.loggedIn) return false;

		try {
			const isValid = await facade.validateToken();
			if (!isValid) throw new Error("Token is not valid");
			return true;
		} catch {
			logout();
			return false;
		}
	};

	const autoLogin = async () => {
		// If the token is there and valid (after page reload) then set status to logged in
		if (facade.getToken() && (await facade.validateToken())) {
			context.dispatch({ type: "login" });
		}
	};

	const hasAccessRights = (allowedRoles: Role[]) => {
		return state.roles.some((role) => allowedRoles.includes(role));
	};

	const hasAccessRightsWithRevalidate = async (allowedRoles: Role[]) => {
		if (await revalidate()) {
			return hasAccessRights(allowedRoles);
		}
		return false;
	};

	return {
		state,
		login,
		logout,
		autoLogin,
		revalidate,
		hasAccessRights,
		hasAccessRightsWithRevalidate,
	};
}

export { AuthProvider, useAuth };
