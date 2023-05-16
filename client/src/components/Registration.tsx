import InputField from "./basic/InputField";
import Button from "./basic/Button";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { emptyUser } from "../types";
import { CREATE_USER } from "../queries/mutations";
import { useMutation } from "@apollo/client";
import { create } from "@mui/material/styles/createTransitions";
import { useAuth } from "../hooks/AuthContext";

interface UserRegistrationFromProps {
    toggleModal: () => void;
}

const UserRegistrationForm = ({  toggleModal }: UserRegistrationFromProps) => {
	const [formData, setFormData] = useState(emptyUser);
	const [createUser, createUserResponse] = useMutation(CREATE_USER, {
        // refetchQueries: [GET_ALL_PEOPLE] // Updates page by refetching data from server.
	});
	const {login} = useAuth();


	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFormData((curr) => {
			return { ...curr, [e.target.name]: e.target.value };
		});
	}, []);

	const reset = useCallback(() => {
		setFormData(emptyUser);
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData.userPass !== formData.confirmPass) {
			alert("Repeated Password must be the same!");
			return;
		}

		// TODO: Add user to database
		//updatePerson({ variables: {updateId:person.id, name:person.name, age:person.age} });
		await createUser({ variables: {"input":{ username: formData.username, email: formData.email, password: formData.userPass }}});
		await login(formData.username, formData.userPass);
		reset();
        toggleModal();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex gap-5">
				<InputField
					value={formData.username}
					onChange={onChange}
					label="Username"
					name="username"
					type="text"
					required
				/>
				<InputField
					value={formData.email}
					onChange={onChange}
					label="Email"
					name="email"
					type="text"
					required
				/>
				<InputField
					value={formData.userPass}
					onChange={onChange}
					label="Password"
					name="userPass"
					type="password"
					required
				/>
				<InputField
					value={formData.confirmPass}
					onChange={onChange}
					label="Password 2"
					name="confirmPass"
					type="password"
					required
				/>
			</div>
			<div className="flex gap-5 pt-2">
				<Button onClick={reset} type="reset"
					className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]"
				>
					Reset
				</Button>
				<Button type="submit"
					className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]"
				>Create</Button>
			</div>
		</form>
	);
};

export default UserRegistrationForm;
