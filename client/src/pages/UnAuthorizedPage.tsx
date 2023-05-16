import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UnAuthorized() {
	return (
		<div className="w-full h-[calc(100vh-50px)] img flex gap-6 flex-col justify-center items-center">
			<div className="p-10 w-fit flex flex-col gap-6 justify-center  bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-lg shadow-lg">
				<FontAwesomeIcon icon={faFingerprint} color="white" size="5x" />
				<h1 className="text-white text-center text-3xl">
					You are not authorized for this.
				</h1>
			</div>
		</div>
	);
}

export default UnAuthorized;
