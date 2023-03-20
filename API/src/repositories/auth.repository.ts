import { Injectable } from "@nestjs/common";
import { PrismaService } from "services/prisma.service";
import { User } from "types/user.entity";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findUser(username: string): Promise<User> {
		try {
			return this.prisma.user.findUnique({ where: { username } });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}
}
