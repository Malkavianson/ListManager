import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "repositories/auth.repository";
import { User } from "types/user.entity";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authRepository: AuthRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: { username: string }): Promise<User> {
		const user = await this.authRepository.findUser(payload.username);
		if (!user) throw new Exception(EExceptionType.UNAUTHORIZED);
		delete user.password;
		return user;
	}
}
