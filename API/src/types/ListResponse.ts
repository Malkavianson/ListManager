import { ListDbResponse } from "./ListDbResponse";

export class ListResponse {
	private readonly id: string;
	public readonly title: string;
	private readonly text: string;
	private readonly createdAt: Date;
	private readonly user: string;
	private readonly category: { id: string; name: string };

	constructor(list: ListDbResponse) {
		this.id = list.id;
		this.title = list.title;
		this.text = list.text;
		this.createdAt = list.createdAt;
		this.user = list.user.username;
		this.category = { id: list.category.id, name: list.category.name };
	}
}
