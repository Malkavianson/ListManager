/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./controllers/app.controller";
import { AppService } from "./services/app.service";

describe("AppController", () => {
	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();
	});
});
