import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginResponseDto } from "models/login-response.dto";
import { LoginDto } from "models/login.dto";
import { AuthRepository } from "repositories/auth.repository";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwt: JwtService,
	) {}

	async login({ username, password }: LoginDto): Promise<LoginResponseDto> {
		const user = await this.authRepository.findUser(username);
		if (!user) {
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"LOGIN INFO INVALID",
			);
		}

		const validHash = await bcrypt.compare(password, user.password);
		if (!validHash) {
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"LOGIN INFO INVALID",
			);
		}
		delete user.password;
		return {
			token: this.jwt.sign({ username }),
			user,
		};
	}
}
