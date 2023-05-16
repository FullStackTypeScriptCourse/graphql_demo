import { BASE_API_URL } from "./settings";

type APIError = { status: string; fullError: object };
type LoginResponse = { token: string };

export type { APIError };

export function handleHttpErrors(res: Response) {
	if (!res.ok) {
		return Promise.reject<APIError>({
			status: res.status,
			fullError: res.json(),
		});
	}
	return Promise.resolve(res.json() as { [key: string]: any });
}

function apiFacade() {
	const setToken = (token: string) => {
		sessionStorage.setItem("jwtToken", token);
	};

	const getToken = () => {
		const value = sessionStorage.getItem("jwtToken");
		if (value == null) return undefined;
		return value;
	};

	const validateToken = async () => {
		const token = getToken();
		if (!token) return false;

		const options = makeOptions("HEAD", true);
		const res = await fetch(`${BASE_API_URL}/api/users/validateToken`, options);
		return res.ok;
	};

	const loggedIn = () => {
		return getToken() != undefined;
	};

	const logout = () => {
		sessionStorage.removeItem("jwtToken");
	};

	const login = async (email: string, password: string) => {
		try {
			const options = makeOptions("POST", true, { email, password });
			const res = await fetch(BASE_API_URL + "/api/users/login", options);
			const data = await handleHttpErrors(res); //as Promise<{ [key: string]: any; }>;
			setToken((data as LoginResponse).token);
			return data;
		} catch (error: any) {
			return Promise.reject({ ...error });
		}
	};

	function makeOptions<T>(method: string, addToken: boolean, body?: T) {
		method = method ? method : "GET";
		const opts: {
			method: string;
			headers: {
				"Content-type"?: string;
				Accept: string;
				"x-access-token"?: string;
			};
			body?: string;
		} = {
			method: method,
			headers: {
				...(["PUT", "POST"].includes(method) && {
					"Content-type": "application/json",
				}),
				Accept: "application/json",
			},
		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}

	return {
		makeOptions,
		setToken,
		getToken,
		loggedIn,
		login,
		logout,
		validateToken,
	};
}

const facade = apiFacade();
export default facade;
