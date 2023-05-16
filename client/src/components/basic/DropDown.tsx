import { InputHTMLAttributes } from "react";
import { MeasureUnit } from "../../types";

interface DropDownData {
    [key: string]: string;
}
interface InputFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    alertMsg?: string;
    data: DropDownData[];
    msg?: string;
}

const DropDown = ({
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
    data,
    msg,
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
            <select id="countries" 
            className={`bg-white text-slate-500 backdrop-filter backdrop-blur-lg bg-opacity-20 placeholder-slate-100/30 text-gray border rounded-md px-3 py-1 w-full border-white`}  > 
                <option selected>{msg}</option>
                {data.map((obj) => (
                    <option value={obj.name}>{obj.name}</option>
                ))}
            </select>
            {alertMsg && !hidden && <p className="text-red-400">{alertMsg}</p>}
        </div>
    );
};

export default DropDown;
