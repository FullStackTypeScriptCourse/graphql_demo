const loc = document.location;
let api_loc = "https://paperrolle.site/sem3-24-hours/api";
if (loc.href.includes("localhost") || loc.href.includes("127.0.0.1")) {
	api_loc = "http://localhost:4000";
}

const BASE_API_URL = api_loc;

export { BASE_API_URL };