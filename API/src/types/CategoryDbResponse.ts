import { Prisma } from "@prisma/client";

export const categorySelect = {
	user: true,
	lists: {
		include: {
			category: true,
		},
	},
	_count: {
		select: {
			lists: true,
		},
	},
} as const;

const categoryDbResponse = Prisma.validator<Prisma.CategoryArgs>()({
	include: categorySelect,
});

export type CategoryDbResponse = Prisma.CategoryGetPayload<
	typeof categoryDbResponse
>;
