export enum EListsEndpoints {
	CREATE = "/list",
	BASE = "/list",
	GETBYCAT = "/lists",
}
export enum EAuthEndpoints {
	REGISTER = "/user",
	LOGIN = "/auth",
}
export enum EUserEndpoints {
	BASE = "/user",
}

export interface IAuth {
	token: string;
	user: IUser;
}

export interface IUser {
	id?: string;
	username?: string;
	password?: string;
	role?: string;
	categoryCount?: number;
}

export interface ICategory {
	id?: string;
	name: string;
	user?: string;
	listCount?: number;
	lists?: IList[];
}

export interface IList {
	id?: string;
	title: string;
	text: string;
	createdAt?: string;
	user?: string;
	category?: ICategory;
	categoryId?: string;
}
