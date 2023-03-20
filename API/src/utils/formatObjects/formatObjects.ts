import { Category } from "@prisma/client";
import { List } from "@prisma/client";
import { TFormattedList } from "types/formattedObjectTypes";

export function formatList(
	list: List & { category: Category },
): TFormattedList {
	return {
		id: list.id,
		title: list.title,
		text: list.text,
		createdAt: list.createdAt,
		category: {
			id: list.category.id,
			name: list.category.name,
		},
	};
}
