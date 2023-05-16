import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";

function LoadingSpinner() {
	return (
		<div className="w-full flex justify-center items-center">
			<FontAwesomeIcon
				size="3x"
				color="white"
				icon={faSnowflake}
				className="fa-spin"
			/>
		</div>
	);
}

export default LoadingSpinner;
