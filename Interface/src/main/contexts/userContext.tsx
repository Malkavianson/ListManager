/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	AllProvidersProps,
	EUserEndpoints,
	IUser,
	UserProviderData,
} from "types";
import { createContext, useContext, useState } from "react";
import { error, success, validateName, validatePassword } from "presentation";
import { api, useAuth } from "main";

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const { login, headers, logged, logout } = useAuth();

	const [users, setUsers] = useState<IUser[]>([]);
	const [user, setUser] = useState<IUser | undefined>();

	const [valueName, setValueName] = useState("");
	const [valuePassword, setValuePassword] = useState("");
	const [mode, setMode] = useState(true);

	const [validPasswordCharacters, setValidPasswordCharacters] =
		useState(false);
	const [validPasswordLength, setValidPasswordLength] = useState(false);

	const action = async (): Promise<void> => {
		const isValidName = validateName(valueName);
		const isValidPassword = validatePassword(valuePassword);
		if (isValidName && isValidPassword) {
			const data: IUser = {
				username: valueName,
				password: valuePassword,
			};
			switch (mode) {
				case false:
					data.role = "user";
					const register = await api
						.post(`/user`, data)
						.then((res: any) => res);
					switch (register.status) {
						case 201:
							delete data.role;
							const loginAfterRegister = await api
								.post(`/auth`, data)
								.then((res: any) => res);
							switch (loginAfterRegister.status) {
								case 201:
									login(loginAfterRegister.data);
									break;

								default:
									error("couldn't login after register");
									break;
							}
							break;

						default:
							error("couldn't register");
							break;
					}

					break;

				case true:
					try {
						const sigin = await api
							.post(`/auth`, data)
							.then((res: any) => res);
						switch (sigin.status) {
							case 201:
								login(sigin.data);
								break;

							default:
								error("Try again with correct credentials");
								break;
						}
					} catch (err) {
						error("Try again with correct credentials");
					}
					break;
			}
		}
	};

	const getUsers = (): void => {
		api.get(EUserEndpoints.BASE, headers)
			.then(res => setUsers(res.data))
			.catch(err => {
				error(err);
			});
		setUser(users.find(e => e.username === valueName));
	};

	const updateUser = (data: IUser, user: string): void => {
		if (logged) {
			api.put(EUserEndpoints.BASE + "/" + user, data, headers)
				.then((): void => {
					success("Updated (You must reload your session)");
					logout();
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};

	const deleteUser = (user: string): void => {
		api.delete(EUserEndpoints.BASE + "/" + user, headers)
			.then((): void => {
				success("Deleted");
				logout();
			})
			.catch(err => {
				error(err);
			});
	};

	return (
		<UserContext.Provider
			value={{
				user,
				valueName,
				valuePassword,
				mode,
				validPasswordCharacters,
				validPasswordLength,
				setValueName,
				setValuePassword,
				setMode,
				setValidPasswordCharacters,
				setValidPasswordLength,
				action,
				getUsers,
				updateUser,
				deleteUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserProviderData => useContext(UserContext);
