import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	outline?: boolean;
	styleString?: string;
}
const defaultStyleString = (outline:boolean,disabled:boolean, className:string)=>`flex-grow m-0 w-full px-5 py-1 shadow-lg rounded-lg ${
		outline
			? "border-2 border-white border-opacity-50 text-white"
			: "bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg border-white border-opacity-20 border text-white"
	} transition-all ${
		disabled ? "text-white/40" : "active:scale-95 hover:scale-105"
	} ${className}`;

const Button = ({
	type,
	onClick,
	children,
	className,
	outline,
	disabled,
	styleString,
	...props
}: ButtonProps) => {
	return (
		<button
			// className={}
			className={styleString?styleString:defaultStyleString(outline??false,disabled??false,className?className:"")}
			type={type}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
