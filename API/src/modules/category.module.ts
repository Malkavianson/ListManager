import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { CategoryController } from "controllers/category.controller";
import { CategoryRepository } from "repositories/category.repository";
import { CategoryService } from "services/category.service";
import { PrismaModule } from "./prisma.module";

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
