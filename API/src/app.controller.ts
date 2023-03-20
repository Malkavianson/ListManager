import { Controller, Get, Res } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AppService } from "./app.service";

@ApiTags("status")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiExcludeEndpoint()
	@Get()
	getAppHome(@Res() res: Response): void {
		res.redirect("/api");
	}

	@Get("/status")
	@ApiOperation({ summary: "Server status" })
	getAppStatus(): string {
		return this.appService.getAppStatus();
	}
}
