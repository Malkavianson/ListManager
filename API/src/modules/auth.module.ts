import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "./prisma.module";
import { AuthController } from "controllers/auth.controller";
import { AuthRepository } from "repositories/auth.repository";
import { AuthService } from "services/auth.service";
import { JwtStrategy } from "utils/strategies/jwt.strategy";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "24h" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, JwtStrategy],
})
export class AuthModule {}
