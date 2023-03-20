import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "services/auth.service";
import { LoginDto } from "models/login.dto";
import { LoginResponseDto } from "models/login-response.dto";
import { HandleException } from "utils/exceptions/exception.helper";
import { LoggedUser } from "utils/middlewares/logged-user.decorator";
import { User } from "types/user.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Login" })
	async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
		try {
			return await this.authService.login(dto);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			HandleException(err);
		}
	}

	@Get()
	@UseGuards(AuthGuard())
	@ApiOperation({ summary: "Current logged user" })
	@ApiBearerAuth()
	getLoggedUser(@LoggedUser() user: User): User {
		return user;
	}
}
