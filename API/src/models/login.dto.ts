import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "username",
		example: "user",
	})
	username: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description:
			"User password -> Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
		example: "User*1234",
	})
	password: string;
}
