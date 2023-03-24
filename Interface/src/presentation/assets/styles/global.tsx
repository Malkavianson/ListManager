import {
	createGlobalStyle,
	DefaultTheme,
	GlobalStyleComponent,
	ThemeProps,
} from "styled-components/macro";
import { theme } from "./theme";

export const GlobalStyle: GlobalStyleComponent<
	ThemeProps<DefaultTheme>,
	DefaultTheme
> = createGlobalStyle`
@media (max-width: 599px) {
	html {
		font-size: 1vw;
	}
}
@media (min-width: 600px) and (max-width: 1022px) {
	html {
		font-size: 0.7vw;
	}
}
@media (min-width: 1023px) {
	html {
		font-size: 0.8vh;
	}
}

*{
	margin: 0;
	padding: 0;
}

html, body {
		height: 100vh;
		box-sizing: border-box;
		font-family: ${theme.constants.bodyFontFamily};
		font-weight: 400;
	}
body::-webkit-scrollbar-track {
	background-color: ${theme.colors.baseBg1};
}
body::-webkit-scrollbar {
	width: 1.3vw;
	background: ${theme.colors.baseBg2};
}
body::-webkit-scrollbar-thumb {
	background: ${theme.colors.baseBg2};
	box-shadow: 0 0 3rem 0 ${theme.colors.baseBg2}, inset 0 0 1.8rem 0.5rem ${theme.colors.contrast1}33;
	border-radius: 20px;
}
`;
