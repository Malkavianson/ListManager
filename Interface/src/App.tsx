import { Providers, Router } from "main";
// import { Toaster } from "react-hot-toast";
import { GlobalStyle } from "presentation";

function App(): JSX.Element {
	return (
		<Providers>
			{/* <Toaster position="top-center" /> */}
			<GlobalStyle />
			<Router />
		</Providers>
	);
}

export default App;
