import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ListDto {
	@ApiProperty({ description: "list title", example: "kitchen" })
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({ description: "list text", example: "fruits and vegetables" })
	@IsNotEmpty()
	@IsString()
	text: string;

	@ApiProperty({ description: "category ID" })
	@IsString()
	categoryId?: string;
}
