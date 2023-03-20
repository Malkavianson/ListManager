import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ListController } from "controllers/list.controller";
import { ListRepository } from "repositories/list.repository";
import { ListService } from "services/list.service";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [ListController],
	providers: [ListService, ListRepository],
})
export class ListModule {}
