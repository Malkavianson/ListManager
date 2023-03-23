import { BrowserRouter } from "react-router-dom";
import { AllProvidersProps } from "types";
import { AuthProvider } from "./accountContext";
import { ListsProvider } from "./listContext";
import { UserProvider } from "./userContext";

export * from "./accountContext";
export * from "./listContext";
export * from "./userContext";

export const Providers = ({ children }: AllProvidersProps): JSX.Element => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<ListsProvider>{children}</ListsProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};
