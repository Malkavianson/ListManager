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
import { CategoryDto } from "models/create-category.dto";
import { PartialCategoryDto } from "models/update-category.dto";
import { CategoryService } from "services/category.service";
import { CategoryResponse } from "types/CategoryResponse";
import { HandleException } from "utils/exceptions/exception.helper";
import { LoggedUser } from "utils/middlewares/logged-user.decorator";
import { User } from "types/user.entity";
import { Category } from "types/category.entity";

@ApiTags("categories")
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiOperation({ summary: "Create category" })
	async create(
		@LoggedUser() loggedUser: User,
		@Body() dto: CategoryDto,
	): Promise<Category> {
		try {
			return await this.categoryService.create(loggedUser.id, dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get()
	@ApiOperation({ summary: "All categories" })
	async findAll(@LoggedUser() loggedUser: User): Promise<CategoryResponse[]> {
		try {
			return await this.categoryService.findAll(loggedUser.id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get(":id")
	@ApiOperation({ summary: "Category by ID" })
	async findOne(@Param("id") id: string): Promise<CategoryResponse> {
		try {
			return await this.categoryService.findOne(id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Patch(":id")
	@ApiOperation({ summary: "Update category by ID" })
	async update(
		@LoggedUser() loggedUser: User,
		@Param("id") id: string,
		@Body() dto: PartialCategoryDto,
	): Promise<Category> {
		try {
			return await this.categoryService.update(loggedUser.id, id, dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Delete(":id")
	@ApiOperation({ summary: "Remove category by ID" })
	async remove(@Param("id") id: string): Promise<Category> {
		try {
			return await this.categoryService.remove(id);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}
}
