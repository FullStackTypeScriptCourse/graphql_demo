import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.js";
import Button from "./basic/Button.js";

function LoggedIn() {
	const navigate = useNavigate();
	const { logout, state } = useAuth();

	const onLogout = useCallback(() => {
		logout();
		navigate("/");
	}, []);

	return (
		<div className="flex">
			{/* Logged in as {(()=>{console.log('STATE: ',state); return state.username})()} */}
			<div className="text-amber-400 pt-1 px-2">😀 {'['+state.username.toUpperCase()+']'}</div>
			<Button onClick={onLogout}
			styleString="flex text-amber-400 justify-center h-fit items-center gap-2 p-1 transition-all"
			>Log Out</Button>
		</div>
	);
}
export default LoggedIn;
