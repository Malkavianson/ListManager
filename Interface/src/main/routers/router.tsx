import { useAuth } from "main";
import { Home, Login, Settings } from "presentation";
import { Navigate, Route, Routes } from "react-router-dom";
import { ERoutePath } from "types";

export const Router = (): JSX.Element => {
	const { logged } = useAuth();
	return (
		<Routes>
			<Route
				path={ERoutePath.HOME}
				element={!logged ? <Login /> : <Home />}
			/>
			{logged && (
				<Route
					path={ERoutePath.SETTINGS}
					element={<Settings />}
				/>
			)}
			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	);
};
