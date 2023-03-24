import { AllProvidersProps, AuthProviderData, IHeaders, IAuth } from "types";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "main";

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<IAuth>();
	const [logged, setLogged] = useState<boolean>(false);
	const [headers, setHeaders] = useState<IHeaders>({
		headers: {
			Authorization: `Bearer string`,
		},
	});

	const setHeader = (access_token: string): void => {
		const header = {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		};
		setHeaders(header);
	};

	const login = (data: IAuth): void => {
		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		setLogged(true);
		setCurrentUser(data);
		setHeader(data.token);
	};

	const logout = (): void => {
		localStorage.clear();
		setCurrentUser(undefined);
		setLogged(false);
	};

	const checkTokenExpiration = (currentToken: string): void => {
		api.get(`/auth`, {
			headers: {
				Authorization: `Bearer ${currentToken}`,
			},
		})
			.then(res => {
				const data = res.data;
				setLogged(true);
				setCurrentUser({
					token: currentToken,
					user: data,
				});
				localStorage.setItem("user", JSON.stringify(data));
			})
			.catch(() => {
				logout();
			});
	};
	useEffect(() => {
		const currentToken = localStorage.getItem("token");
		if (currentToken) {
			setHeader(currentToken);
			checkTokenExpiration(currentToken);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				logged,
				login,
				logout,
				headers,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthProviderData => useContext(AuthContext);
