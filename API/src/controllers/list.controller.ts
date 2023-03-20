import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ListDto } from "models/create-list.dto";
import { PartialListDto } from "models/update-list.dto";
import { ListService } from "services/list.service";
import { ListResponse } from "types/ListResponse";
import { HandleException } from "utils/exceptions/exception.helper";
import { LoggedUser } from "utils/middlewares/logged-user.decorator";
import { List } from "types/list.entity";
import { User } from "types/user.entity";

@ApiTags("lists")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("list")
export class ListController {
	constructor(private readonly listService: ListService) {}

	@Post()
	@ApiOperation({ summary: "create list" })
	async create(
		@LoggedUser() loggedUser: User,
		@Body() dto: ListDto,
	): Promise<List> {
		try {
			return await this.listService.create(loggedUser.id, dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get()
	@ApiOperation({ summary: "get all lists (logged user)" })
	async findAll(@LoggedUser() loggedUser: User): Promise<ListResponse[]> {
		try {
			return await this.listService.findAll(loggedUser.id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get(":id")
	@ApiOperation({ summary: "get list" })
	async findOne(@Param("id") id: string): Promise<ListResponse> {
		try {
			return await this.listService.findOne(id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Patch(":id")
	@ApiOperation({ summary: "update list" })
	async update(
		@LoggedUser() loggedUser: User,
		@Param("id") id: string,
		@Body() dto: PartialListDto,
	): Promise<List> {
		try {
			return await this.listService.update(loggedUser.id, id, dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Delete(":id")
	@ApiOperation({ summary: "remove list" })
	async remove(@Param("id") id: string): Promise<List> {
		try {
			return await this.listService.remove(id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}
}
