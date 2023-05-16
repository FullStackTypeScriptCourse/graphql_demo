import facade from "./apiFacade";
type Role = "user" | "admin";

function decodeJwt() {
	const token = facade.getToken();
	if (!token) return undefined;
	const jwtData = token.split(".")[1];
	const decodedJwtJsonData = window.atob(jwtData);
	const decodedJwtData = JSON.parse(decodedJwtJsonData);
	return decodedJwtData;
}

function getUserInfo() {
	const jwtData = decodeJwt();
	console.log("jwtData: ", jwtData);
	const userInfo = {...jwtData, username: jwtData.userName, id: jwtData.userId};

	return userInfo;
}
function getEmptyUserInfo() {
	return {
		id: "",
		email: "",
		name: "",
		roles: [],
	};
}

export { getUserInfo, getEmptyUserInfo };
