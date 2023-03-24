import { useLists } from "main";
import {
	SColumn,
	SHomeComponentsRow,
	SHomeComponentsTitle,
	SHomeComponentsContainer,
	SCardsConteiner,
	SListsOverlay,
	error,
	Input,
	SHomeComponentsSelectors,
} from "presentation";
import { useState } from "react";
import { ICategory, IList } from "types";

export const ListsContainer = (): JSX.Element => {
	const {
		lists,
		currentList,
		getAllLists,
		getListById,
		deleteList,
		updateList,
		modal,
		setModal,
		categories,
		getCategoryById,
	} = useLists();

	const [editing, setEditing] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [categoryId, setCategoryId] = useState<string>("");

	return (
		<>
			<SHomeComponentsContainer>
				<SColumn>
					<SHomeComponentsSelectors>
						<SHomeComponentsTitle
							onClick={(): void => {
								getAllLists();
							}}
						>
							All
						</SHomeComponentsTitle>
						{categories.map((e: ICategory, i: number) => {
							return (
								<SHomeComponentsTitle
									key={i}
									onClick={(): void => {
										getCategoryById(e.id);
									}}
								>
									{e.name}
								</SHomeComponentsTitle>
							);
						})}
					</SHomeComponentsSelectors>
					<SHomeComponentsRow type="overflow">
						{lists ? (
							lists.map((list: IList, key: number) => (
								<SCardsConteiner
									key={key}
									onClick={(): void => {
										if (list.id) {
											getListById(list.id);
										}
									}}
								>
									<h1>{list.title}</h1>
									<h6>
										{list.category
											? list.category.name
											: ""}
									</h6>
									<p>{list.text}</p>
								</SCardsConteiner>
							))
						) : (
							<></>
						)}
					</SHomeComponentsRow>
				</SColumn>
			</SHomeComponentsContainer>
			{modal && (
				<SListsOverlay>
					<div className="modal">
						<div
							className="close"
							onClick={(): void => {
								setModal(!modal);
							}}
						>
							❌
						</div>
						{editing && (
							<div className="UpdateItens">
								<div>Update List</div>
								<Input
									key={currentList.title}
									label="Title"
									placeholder={currentList.title}
									type="text"
									value={setTitle}
								/>
								<Input
									key={currentList.text}
									label="Description"
									placeholder={currentList.text}
									type="text"
									value={setText}
								/>
								<select
									id="Categories_Selector"
									onChange={(e): void => {
										setCategoryId(e.target.value);
									}}
								>
									{categories.map(
										(c: ICategory, i: number) => {
											return (
												<option
													key={i}
													value={c.id}
													title={c.name}
												>
													{c.name}
												</option>
											);
										},
									)}
								</select>
							</div>
						)}
						{!editing && (
							<>
								<h1 className="title">{currentList.title}</h1>
								<h1 className="category">
									{currentList.category
										? currentList.category.name
										: ""}
								</h1>
								<p className="description">
									{currentList.text}
								</p>
							</>
						)}

						<div className="settings">
							<div
								className="update"
								onClick={(): void => {
									setEditing(!editing);
								}}
							>
								{!editing && "Update"}
								{editing && "Back"}
							</div>
							{!editing && (
								<div
									className="delete"
									onClick={(): void => {
										if (currentList.id) {
											deleteList(currentList.id);
											getAllLists();
											setModal(!modal);
										} else {
											error("Cannot find List");
										}
									}}
								>
									Delete
								</div>
							)}
							{editing && (
								<div
									className="delete"
									onClick={(): void => {
										if (currentList.id) {
											updateList(
												{
													title,
													text,
													categoryId,
												},
												currentList.id,
											);
											getAllLists();
											setModal(!modal);
										} else {
											error("Cannot delete");
										}
									}}
								>
									Submit Update
								</div>
							)}
						</div>
					</div>
				</SListsOverlay>
			)}
		</>
	);
};
