/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	SBackgroundForm,
	SSubmitButtom,
	SSwicherContainer,
	SSwicherButtom,
	SContainerVerification,
	SVerificationResponse,
} from "presentation";
import { useEffect } from "react";
import { Input, isPw } from "presentation";
import { useUser } from "main";

export const SignIn = (): JSX.Element => {
	const {
		mode,
		setMode,
		valuePassword,
		setValuePassword,
		setValueName,
		action,
		validPasswordLength,
		validPasswordCharacters,
		setValidPasswordCharacters,
		setValidPasswordLength,
	} = useUser();

	useEffect(() => {
		setValidPasswordCharacters(isPw.test(valuePassword));
		setValidPasswordLength(valuePassword.length > 7);
	}, [valuePassword]);

	return (
		<SBackgroundForm>
			<h1>{!mode ? `Register` : `SignIn`}</h1>
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
					onClick={(): void => {
						action();
					}}
				>
					{!mode ? `Register` : `SignIn`}
				</SSubmitButtom>
			</form>
			<SSwicherContainer>
				<p>
					{mode
						? `Don't have an account?`
						: `Alread have an account?`}
				</p>

				<SSwicherButtom
					onClick={(): void => {
						setMode(!mode);
					}}
				>
					{mode ? `Register` : `SignIn`}
				</SSwicherButtom>
			</SSwicherContainer>
		</SBackgroundForm>
	);
};
