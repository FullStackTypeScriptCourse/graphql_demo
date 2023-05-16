import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Unauthorized from "../../pages/UnAuthorizedPage";
import { useAuth } from "../../hooks/AuthContext";
import {Role} from "../../types";

interface GuardedRouteProps {
	allowedRoles: Role[];
	refresh?: any;
}

function GuardedRoute({ allowedRoles, refresh }: GuardedRouteProps) {
	const [auth, setAuth] = useState(false);
	const { state, hasAccessRightsWithRevalidate } = useAuth();

	useEffect(() => {
		const validate = async () => {
			const allowed = await hasAccessRightsWithRevalidate(allowedRoles);
			setAuth(allowed);
		};
		validate();
		return () => {};
	}, [state.loggedIn, refresh]);

	return auth ? <Outlet /> : <Unauthorized />;
}

export default GuardedRoute;
