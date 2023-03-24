import { useLists } from "main";
import { Input, SListsOverlay } from "presentation";
import { useState } from "react";
import { ICategory } from "types";

export const CreateList = (): JSX.Element => {
	const { createList, createOn, setCreateOn, getAllLists, categories } =
		useLists();
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [categoryId, setCategoryId] = useState<string>("");

	return (
		<SListsOverlay>
			<div className="modal">
				<div className="UpdateItens">
					<div>Create List</div>
					<Input
						key={"1"}
						label="Title"
						placeholder="List Title"
						type="text"
						value={setTitle}
					/>
					<Input
						key={"2"}
						label="Text"
						placeholder="List Description"
						type="text"
						value={setText}
					/>
					<select
						id="Categories_Selector"
						onChange={(e): void => {
							setCategoryId(e.target.value);
						}}
					>
						{categories.map((c: ICategory, i: number) => {
							return (
								<option
									key={i}
									value={c.id}
									title={c.name}
								>
									{c.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="settings">
					<div
						className="update"
						onClick={(): void => {
							setCreateOn(!createOn);
						}}
					>
						Close
					</div>
					<div
						className="delete"
						onClick={(): void => {
							createList({
								title,
								text,
								categoryId,
							});
							setCreateOn(!createOn);
							getAllLists();
						}}
					>
						New List
					</div>
				</div>
			</div>
		</SListsOverlay>
	);
};
