import { formatList } from "utils/formatObjects/formatObjects";
import { CategoryDbResponse } from "./CategoryDbResponse";
import { TFormattedList } from "./formattedObjectTypes";

export class CategoryResponse {
	private readonly id: string;
	private readonly name: string;
	private readonly user: string;
	private readonly listCount: number;
	private readonly lists: TFormattedList[];

	constructor({ id, name, user, _count, lists }: CategoryDbResponse) {
		this.id = id;
		this.name = name;
		this.user = user.username;
		this.listCount = _count.lists;
		this.lists = lists.map(list => formatList(list));
	}
}
