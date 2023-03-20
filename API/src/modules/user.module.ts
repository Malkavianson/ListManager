import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "controllers/user.controller";
import { UserRepository } from "repositories/user.repository";
import { UserService } from "services/user.service";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [UserController],
	providers: [UserService, UserRepository],
})
export class UserModule {}
