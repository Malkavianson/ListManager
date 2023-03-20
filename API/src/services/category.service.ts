import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CategoryDto } from "models/create-category.dto";
import { PartialCategoryDto } from "models/update-category.dto";
import { CategoryRepository } from "repositories/category.repository";
import { Category } from "types/category.entity";
import { CategoryResponse } from "types/CategoryResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(userId: string, dto: CategoryDto): Promise<Category> {
		const duplicateName = await this.categoryRepository.findOneByName(
			userId,
			dto.name,
		);
		if (duplicateName) {
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"DUPLICATE CATEGORY",
			);
		}

		const data: Prisma.CategoryUncheckedCreateInput = { ...dto, userId };
		return await this.categoryRepository.create(data);
	}

	async findAll(userId: string): Promise<CategoryResponse[]> {
		const categories = await this.categoryRepository.findAll(userId);
		return categories.map(category => new CategoryResponse(category));
	}

	async findOne(id: string): Promise<CategoryResponse> {
		const category = await this.categoryRepository.findOne(id);
		if (!category) {
			throw new Exception(
				EExceptionType.RESOURCE_NOT_FOUND,
				"CATEGORY NOT FOUND",
			);
		}

		return new CategoryResponse(category);
	}

	async update(
		userId: string,
		id: string,
		dto: PartialCategoryDto,
	): Promise<Category> {
		await this.findOne(id);

		const duplicateName = await this.categoryRepository.findOneByName(
			userId,
			dto.name,
		);
		if (duplicateName) {
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"DUPLICATE CATEGORY",
			);
		}

		const data: Prisma.CategoryUpdateInput = { ...dto };
		return await this.categoryRepository.update(id, data);
	}

	async remove(id: string): Promise<Category> {
		await this.findOne(id);
		return await this.categoryRepository.remove(id);
	}
}
