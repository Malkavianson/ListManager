import {
	AllProvidersProps,
	IList,
	ListsProviderData,
	EListsEndpoints,
	ICategory,
} from "types";
import { createContext, useContext, useEffect, useState } from "react";
import { api, useAuth } from "main";
import { error, success } from "presentation";

const ListsContext = createContext<ListsProviderData>({} as ListsProviderData);

export const ListsProvider = ({ children }: AllProvidersProps): JSX.Element => {
	const { logged, headers } = useAuth();
	const [modal, setModal] = useState<boolean>(false);
	const [createOn, setCreateOn] = useState(false);
	const allLists: IList[] = [];

	const [lists, setLists] = useState<IList[]>(allLists);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [currentList, setCurrentList] = useState<IList>(allLists[0]);

	const createList = ({ title, text, category, user }: IList): void => {
		if (logged && title && text && user) {
			const data = { title, text, category, user };
			api.post(EListsEndpoints.CREATE, data, headers)
				.then((): void => {
					success("Registrated");
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};
	const updateList = (
		{ title, text, user, category }: IList,
		id: string,
	): void => {
		if (logged) {
			const data = { title, text, user, category };
			api.put(EListsEndpoints.BASE + "/" + id, data, headers)
				.then((): void => {
					success("Updated(reload your page)");
				})
				.catch(err => {
					error(err);
				});
		} else {
			error("Invalid data");
		}
	};
	const deleteList = (id: string): void => {
		api.delete(EListsEndpoints.BASE + "/" + id, headers)
			.then((): void => {
				success("Deleted");
			})
			.catch(err => {
				error(err);
			});
	};

	const getAllCategories = (): void => {
		api.get("/category", headers)
			.then(res => {
				setCategories(res.data);
			})
			.catch(err => {
				error(err);
			});
	};

	const getAllLists = (): void => {
		api.get(EListsEndpoints.BASE, headers)
			.then(res => setLists(res.data))
			.catch(err => {
				error(err);
			});
	};
	const getListById = (id: string): void => {
		api.get(EListsEndpoints.BASE + "/" + id, headers)
			.then(res => {
				setCurrentList(res.data);
				setModal(!modal);
			})
			.catch(err => {
				error(err);
			});
	};

	const getCategoryById = (id: string): void => {
		api.get("/category/" + id, headers)
			.then(res => setLists(res.data.lists))
			.catch(err => {
				error(err);
			});
	};

	useEffect((): void => {
		getAllLists();
		getAllCategories();
	}, [logged]);

	useEffect((): void => {
		getAllCategories();
	}, [lists]);

	return (
		<ListsContext.Provider
			value={{
				lists,
				currentList,
				createList,
				updateList,
				deleteList,
				getListById,
				getAllLists,
				categories,
				getCategoryById,
				modal,
				setModal,
				createOn,
				setCreateOn,
			}}
		>
			{children}
		</ListsContext.Provider>
	);
};

export const useLists = (): ListsProviderData => useContext(ListsContext);
