import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	Input,
	SLogoContainer,
	SMenuContainer,
	SMenuContent,
	SMenuOptions,
	SContentSeach,
} from "presentation";
import { useAuth, useLists } from "main";
import { ERoutePath, IList, MenuProps } from "types";

export const UpperTab = ({ path }: MenuProps): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();

	const { logout } = useAuth();
	const {
		getListById,
		lists,
		getAllLists,
		modal,
		setModal,
		setCreateOn,
		createOn,
		setCreateCatOn,
		createCatOn,
	} = useLists();
	const [allListsSwitch, setAllListsSwitch] = useState<IList[]>([]);
	const [active, setActive] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search.length > 0) {
			setAllListsSwitch(lists);
		} else {
			setAllListsSwitch([]);
		}
	}, [search]);

	return (
		<SMenuContainer>
			<SMenuContent>
				<SLogoContainer></SLogoContainer>
				{Boolean(path === "/") && (
					<SContentSeach>
						<Input
							label="search"
							type="text"
							placeholder="Pesquisa"
							value={setSearch}
						/>
						{allListsSwitch
							.filter((e: IList) =>
								e.title
									.toLowerCase()
									.includes(search.toLowerCase()),
							)
							.map((e: IList, i: number) => {
								return (
									<span
										key={i}
										onClick={(): void => {
											if (e.id) {
												getListById(e.id);
												setSearch("");
												setModal(!modal);
											}
											// setTimeout(
											// 	() => navigate(`/lists/${e.id}`),
											// 	2000,
											// );
										}}
									>
										{e.title}
									</span>
								);
							})}
					</SContentSeach>
				)}
				<div
					onClick={() => {
						setActive(!active);
					}}
				>
					MENU
				</div>
				{active ? (
					<SMenuOptions active={active}>
						<li
							onClick={(): void => {
								navigate(ERoutePath.HOME);
								getAllLists();
								setActive(!active);
							}}
						>
							Home
						</li>
						<li
							onClick={(): void => {
								navigate(ERoutePath.SETTINGS);
								setActive(!active);
							}}
						>
							Settings
						</li>
						<li
							onClick={(): void => {
								setCreateOn(!createOn);
								setActive(!active);
							}}
						>
							Create new List
						</li>
						<li
							onClick={(): void => {
								setCreateCatOn(!createCatOn);
								setActive(!active);
							}}
						>
							Create new category
						</li>
						<li
							onClick={(): void => {
								logout();
								setActive(!active);
							}}
						>
							Logout
						</li>
					</SMenuOptions>
				) : (
					<></>
				)}
			</SMenuContent>
		</SMenuContainer>
	);
};
