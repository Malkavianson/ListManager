import { SHome, SignIn, theme } from "presentation";

export const Login = (): JSX.Element => {
	return (
		<SHome theme={theme}>
			<SignIn />
		</SHome>
	);
};
