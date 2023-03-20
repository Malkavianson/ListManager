import { Prisma } from "@prisma/client";

export const userSelect = {
	id: true,
	username: true,
	password: true,
	role: true,
	_count: {
		select: {
			categories: true,
		},
	},
} as const;

const userDbResponse = Prisma.validator<Prisma.UserArgs>()({
	select: userSelect,
});

export type UserDbResponse = Prisma.UserGetPayload<typeof userDbResponse>;
