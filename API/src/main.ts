import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "modules/app.module";
import { PrismaService } from "services/prisma.service";

const PORT = process.env.PORT || 3333;

async function bootstrap(): Promise<void> {
	const logger = new Logger("bootstrap");

	console.clear();
	logger.log("Starting and validating");

	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors({
		allowedHeaders: "*",
		methods: "HEAD, GET, PATCH, POST, PUT, DELETE",
		origin: "*",
	});
	app.set("trust proxy", 1);
	app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
			whitelist: true,
			transform: true,
		}),
	);
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	logger.log("Server Started\n\nMapping documentation");

	const config = new DocumentBuilder()
		.setTitle("API Lists")
		.setDescription("List manager app")
		.setVersion("1.0.1")
		.addTag("auth")
		.addTag("users")
		.addTag("categories")
		.addTag("lists")
		.addTag("status")
		.addServer(`http://localhost:${PORT}`, "Local")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	logger.log("Swagger.setup Builded");
	logger.log("Mapping routes:");

	await app.listen(PORT, () => {
		logger.log(`Locally app bootstraped at http://localhost:${PORT}`);
	});
}
bootstrap();
