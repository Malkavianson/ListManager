import { useLists } from "main";
import {
	CreateProduct,
	SHome,
	ListsContainer,
	theme,
	UpperTab,
} from "presentation";
import { ERoutePath } from "types";

export const Home = (): JSX.Element => {
	const { createOn } = useLists();
	return (
		<SHome theme={theme}>
			<UpperTab path={ERoutePath.HOME} />
			<ListsContainer />
			{createOn && <CreateProduct />}
		</SHome>
	);
};
