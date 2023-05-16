import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: string;
	alertMsg?: string;
	rows?: number;
}

const InputField = ({
	label,
	name,
	type,
	required,
	value,
	onChange,
	hidden,
	placeholder,
	className,
	alertMsg,
	rows,
	...props
}: InputFieldProps) => {
	return (
		<div className={"flex flex-col justify-center items-start gap-1 flex-grow"}>
			{label && !hidden && (
				<label
					className={"font-medium spacing text-white tracking-wider"}
					htmlFor={name}
				>
					{label}
				</label>
			)}
			{!rows ? (
			<input
				className={`bg-white text-slate-500 backdrop-filter backdrop-blur-lg bg-opacity-20 placeholder-slate-100/30 text-gray border rounded-md px-3 py-1 w-full 
				${ alertMsg ? "border-red-400" : "border-white" } 
				${className}
				`}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				hidden={hidden}
				required={required}
				{...props}
			/>) : (
			<textarea
				className={`bg-white text-slate-500 backdrop-filter backdrop-blur-lg bg-opacity-20 placeholder-slate-100/30 text-gray border rounded-md px-3 py-1 w-full 
				${ alertMsg ? "border-red-400" : "border-white"} 
				${className}
				`}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				hidden={hidden}
				required={required}
				rows={rows}
				{...props}
			/>	)}

			{alertMsg && !hidden && <p className="text-red-400">{alertMsg}</p>}
		</div>
	);
};

export default InputField;
