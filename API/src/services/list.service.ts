import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ListDto } from "models/create-list.dto";
import { PartialListDto } from "models/update-list.dto";
import { ListRepository } from "repositories/list.repository";
import { List } from "types/list.entity";
import { ListResponse } from "types/ListResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class ListService {
	constructor(private readonly listRepository: ListRepository) {}

	async create(userId: string, dto: ListDto): Promise<List> {
		console.log(userId, dto);
		const duplicateName = await this.listRepository.findOneByTitle(
			userId,
			dto.title,
		);
		if (duplicateName) {
			throw new Exception(EExceptionType.DATA_INVALID, "DUPLICATE LIST");
		}
		const data: Prisma.ListUncheckedCreateInput = {
			...dto,
			userId,
			createdAt: new Date(),
		};

		return await this.listRepository.create(data);
	}

	async findAll(userId: string): Promise<ListResponse[]> {
		const lists = await this.listRepository.findAll(userId);
		return lists.map(list => new ListResponse(list));
	}

	async findOne(id: string): Promise<ListResponse> {
		const list = await this.listRepository.findOne(id);
		if (!list) {
			throw new Exception(
				EExceptionType.RESOURCE_NOT_FOUND,
				"LIST NOT FOUND",
			);
		}
		return new ListResponse(list);
	}

	async update(
		userId: string,
		id: string,
		dto: PartialListDto,
	): Promise<List> {
		const list = await this.findOne(id);
		if ("title" in dto && dto.title !== list.title) {
			const duplicateTitle = await this.listRepository.findOneByTitle(
				userId,
				dto.title,
			);
			if (duplicateTitle) {
				throw new Exception(
					EExceptionType.DATA_INVALID,
					"DUPLICATE LIST",
				);
			}
		}

		return await this.listRepository.update(id, dto);
	}

	async remove(id: string): Promise<List> {
		await this.findOne(id);
		return await this.listRepository.remove(id);
	}
}
