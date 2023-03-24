/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	SBackgroundForm,
	SSubmitButtom,
	SContainerVerification,
	SVerificationResponse,
	error,
} from "presentation";
import { useEffect } from "react";
import { Input, isPw } from "presentation";
import { useAuth, useUser } from "main";
import { IUser } from "types";

export const UpdateUser = (): JSX.Element => {
	const {
		user,
		valueName,
		valuePassword,
		setValuePassword,
		setValueName,
		validPasswordLength,
		validPasswordCharacters,
		setValidPasswordCharacters,
		setValidPasswordLength,
		updateUser,
		deleteUser,
		getUsers,
	} = useUser();
	const { currentUser } = useAuth();

	useEffect(() => {
		setValidPasswordCharacters(isPw.test(valuePassword));
		setValidPasswordLength(valuePassword.length > 7);
	}, [valuePassword]);

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<SBackgroundForm active={true}>
			<h1>Update User</h1>
			<form name="Gate">
				<div>
					<Input
						label="Name"
						placeholder="username"
						type="text"
						value={setValueName}
					/>
					<Input
						label="Password"
						placeholder="********"
						type="password"
						value={setValuePassword}
					/>
					<SContainerVerification>
						<SVerificationResponse>
							{validPasswordLength ? "✅" : "⛔️"} 8 characters
						</SVerificationResponse>
						<SVerificationResponse>
							{validPasswordCharacters ? "✅" : "⛔️"} Uppercase |
							Lowercase | Symbol | Number
						</SVerificationResponse>
					</SContainerVerification>
				</div>
				<SSubmitButtom
					onClick={(e: any): void => {
						if (currentUser && currentUser.user.username) {
							const data: IUser = {};
							if (valueName) {
								data.username = valueName;
							}
							if (valuePassword) {
								data.password = valuePassword;
							}
							updateUser(data, currentUser.user.username);
						} else {
							error("Login again before to change your data");
						}
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					Update
				</SSubmitButtom>
			</form>
			<SSubmitButtom
				onClick={(e: any): void => {
					if (currentUser && currentUser.user.username) {
						deleteUser(currentUser.user.username);
					}
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				Delete User
			</SSubmitButtom>
		</SBackgroundForm>
	);
};
