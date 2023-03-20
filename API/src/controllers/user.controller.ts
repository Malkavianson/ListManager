import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "models/create-user.dto";
import { PartialUserDto } from "models/update-user.dto";
import { UserService } from "services/user.service";
import { UserResponse } from "types/UserResponse";
import { HandleException } from "utils/exceptions/exception.helper";
import { LoggedUser } from "utils/middlewares/logged-user.decorator";
import { User } from "types/user.entity";

@ApiTags("users")
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiOperation({ summary: "create user" })
	async create(@Body() dto: UserDto): Promise<User> {
		try {
			return await this.userService.create(dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get()
	@ApiOperation({ summary: "get all users" })
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async findAll(@LoggedUser() loggedUser: User): Promise<UserResponse[]> {
		try {
			return await this.userService.findAll(loggedUser.role);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get(":username")
	@ApiOperation({ summary: "get user" })
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async findOne(
		@LoggedUser() loggedUser: User,
		@Param("username") username: string,
	): Promise<UserResponse> {
		try {
			return await this.userService.findOne(loggedUser, username);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Patch(":username")
	@ApiOperation({ summary: "update user" })
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	async update(
		@LoggedUser() loggedUser: User,
		@Param("username") username: string,
		@Body() dto: PartialUserDto,
	): Promise<User> {
		try {
			return await this.userService.update(loggedUser, username, dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Delete(":username")
	@ApiOperation({ summary: "remove user" })
	@UseGuards(AuthGuard())
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(
		@LoggedUser() loggedUser: User,
		@Param("username") username: string,
	): Promise<void> {
		try {
			await this.userService.remove(loggedUser, username);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}
}
