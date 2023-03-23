import { ReactNode } from "react";
import { IAuth, ICategory, IList, IUser } from "types";

export interface AllProvidersProps {
	children: ReactNode;
}

export interface AuthProviderData {
	currentUser: IAuth | undefined;
	logged: boolean;
	login: (params: IAuth) => void;
	logout: () => void;
	headers: IHeaders;
}

export interface IHeaders {
	headers: {
		Authorization: string;
	};
}

export interface UserProviderData {
	user: IUser | undefined;
	valueName: string;
	valuePassword: string;
	mode: boolean;
	validPasswordCharacters: boolean;
	validPasswordLength: boolean;
	setValueName: React.Dispatch<React.SetStateAction<string>>;
	setValuePassword: React.Dispatch<React.SetStateAction<string>>;
	setMode: React.Dispatch<React.SetStateAction<boolean>>;
	setValidPasswordCharacters: React.Dispatch<React.SetStateAction<boolean>>;
	setValidPasswordLength: React.Dispatch<React.SetStateAction<boolean>>;
	action: () => Promise<void>;
	getUsers: () => void;
	updateUser: (data: IUser, user: string) => void;
	deleteUser: (user: string) => void;
}

export interface ListsProviderData {
	lists: IList[];
	currentList: IList;
	createList: (data: IList) => void;
	updateList: (data: IList, id: string) => void;
	deleteList: (id: string) => void;
	getListById: (id: string) => void;
	getAllLists: () => void;
	getCategoryById: (id: string) => void;
	categories: ICategory[];
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	createOn: boolean;
	setCreateOn: React.Dispatch<React.SetStateAction<boolean>>;
}
