import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "services/prisma.service";
import { Category } from "types/category.entity";
import { CategoryDbResponse, categorySelect } from "types/CategoryDbResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class CategoryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category> {
		try {
			return this.prisma.category.create({ data });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findAll(userId: string): Promise<CategoryDbResponse[]> {
		try {
			return this.prisma.category.findMany({
				where: { userId },
				include: categorySelect,
				orderBy: { name: "asc" },
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findOne(id: string): Promise<CategoryDbResponse> {
		try {
			return this.prisma.category.findUnique({
				where: { id },
				include: categorySelect,
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneByName(userId: string, name: string): Promise<Category> {
		try {
			return this.prisma.category.findFirst({
				where: { userId, name },
			});
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async update(
		id: string,
		data: Prisma.CategoryUpdateInput,
	): Promise<Category> {
		try {
			return this.prisma.category.update({ where: { id }, data });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}

	async remove(id: string): Promise<Category> {
		try {
			return this.prisma.category.delete({ where: { id } });
		} catch {
			throw new Exception(EExceptionType.INTERNAL_SERVER_ERROR);
		}
	}
}
