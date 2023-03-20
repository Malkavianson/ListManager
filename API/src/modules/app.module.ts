import { Module } from "@nestjs/common";
import { AppController } from "controllers/app.controller";
import { AppService } from "services/app.service";
import { AuthModule } from "./auth.module";
import { CategoryModule } from "./category.module";
import { ListModule } from "./list.module";
import { PrismaModule } from "./prisma.module";
import { UserModule } from "./user.module";

@Module({
	imports: [PrismaModule, AuthModule, UserModule, CategoryModule, ListModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
