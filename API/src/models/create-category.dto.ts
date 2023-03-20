import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CategoryDto {
	@ApiProperty({ description: "Category name", example: "Important" })
	@IsString()
	name: string;
}
