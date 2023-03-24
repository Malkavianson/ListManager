import { SHome, theme, UpdateUser, UpperTab } from "presentation";
import { ERoutePath } from "types";

export const Settings = (): JSX.Element => {
	return (
		<SHome theme={theme}>
			<UpperTab path={ERoutePath.SETTINGS} />
			<UpdateUser />
		</SHome>
	);
};
