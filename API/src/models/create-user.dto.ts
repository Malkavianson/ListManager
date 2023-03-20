import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class UserDto {
	@ApiProperty({ description: "username", example: "user" })
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsString()
	@MinLength(8)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Your password must be strong",
	})
	@ApiProperty({
		example: "Abcd*123",
		description:
			"User password => Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
	})
	password: string;
}
