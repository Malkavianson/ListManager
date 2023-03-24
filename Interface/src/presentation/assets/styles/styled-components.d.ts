import { theme } from "../styles/System/theme";
type Theme = typeof theme;

declare module "styled-components" {
	export type DefaultTheme = Theme;
}
