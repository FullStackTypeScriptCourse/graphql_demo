import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
	children: JSX.Element | JSX.Element[];
	show: boolean;
	color?: string;
	height?: string;
	width?: string;
	toggle: () => void;
}

function Modal({ children, show, toggle, color, height, width }: ModalProps) {
	return (
		<div
		// Take up the full screen to prevent clicking on anything else:
			className={`${
				show ? "display" : "hidden"
			} fixed w-screen  h-screen ${color?color: 'bg-cyan-400'} top-0 left-0 flex justify-center items-center`}
			onClick={toggle}
		>
			<div
			// The actual modal comes here:
				onClick={(e) => e.stopPropagation()}
				className={`relative 
				z-10 
				w-[clamp(100px,_100%_,${width?width:50}vw)] 
				h-[clamp(100px,_100%_,${height?height:30}vh)] 
				p-10
				 bg-white 
				 backdrop-filter 
				 backdrop-blur-lg 
				 bg-opacity-20 
				 rounded-xl 
				 shadow-lg
				 grid 
				 justify-center `}
			>
				{children}
				<button
					onClick={toggle}
					className="absolute -top-3 -right-3 bg-red hover:scale-105 hover:bg-slate-400  transition-all backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg w-8 h-8 "
				>
					<FontAwesomeIcon icon={faX} color={"white"} />
				</button>
			</div>
		</div>
	);
}

export default Modal;
