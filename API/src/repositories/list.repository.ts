import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "services/prisma.service";
import { List } from "types/list.entity";
import { ListDbResponse, listSelect } from "types/ListDbResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class ListRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create({
		title,
		text,
		createdAt,
		categoryId,
		userId,
	}: Prisma.ListUncheckedCreateInput): Promise<List> {
		try {
			return this.prisma.list.create({
				data: {
					title,
					text,
					createdAt,
					category: {
						connect: {
							id: categoryId,
						},
					},
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findAll(userId: string): Promise<ListDbResponse[]> {
		try {
			return this.prisma.list.findMany({
				where: { userId },
				include: listSelect,
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findOne(id: string): Promise<ListDbResponse> {
		try {
			return this.prisma.list.findUnique({
				where: { id },
				include: listSelect,
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneByTitle(userId: string, title: string): Promise<List> {
		try {
			return this.prisma.list.findFirst({
				where: { userId, title },
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: string, data: Prisma.ListUpdateInput): Promise<List> {
		try {
			return this.prisma.list.update({ where: { id }, data });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async remove(id: string): Promise<List> {
		try {
			return this.prisma.list.delete({ where: { id } });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}
}
