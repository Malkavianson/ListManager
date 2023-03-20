import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "services/prisma.service";
import { User } from "types/user.entity";
import { UserDbResponse, userSelect } from "types/UserDbResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		try {
			return this.prisma.user.create({ data });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findAll(): Promise<UserDbResponse[]> {
		try {
			return this.prisma.user.findMany({
				select: userSelect,
				orderBy: { username: "asc" },
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findOne(username: string): Promise<UserDbResponse> {
		try {
			return this.prisma.user.findUnique({
				where: { username },
				select: userSelect,
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async update(
		username: string,
		data: Prisma.UserUpdateInput,
	): Promise<User> {
		try {
			return this.prisma.user.update({ where: { username }, data });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async remove(username: string): Promise<User> {
		try {
			return this.prisma.user.delete({ where: { username } });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}
}
