import { useLists } from "main";
import { Input, SListsOverlay } from "presentation";
import { useState } from "react";

export const CreateCategory = (): JSX.Element => {
	const { createCategory, createCatOn, setCreateCatOn, getAllLists } =
		useLists();
	const [name, setName] = useState<string>("");

	return (
		<SListsOverlay>
			<div className="modal">
				<div className="UpdateItens">
					<div>Create Category</div>
					<Input
						key={"1"}
						label="Name"
						placeholder="Category Name"
						type="text"
						value={setName}
					/>
				</div>

				<div className="settings">
					<div
						className="update"
						onClick={(): void => {
							setCreateCatOn(!createCatOn);
						}}
					>
						Close
					</div>
					<div
						className="delete"
						onClick={(): void => {
							createCategory({
								name,
							});
							setCreateCatOn(!createCatOn);
							getAllLists();
						}}
					>
						New Category
					</div>
				</div>
			</div>
		</SListsOverlay>
	);
};
