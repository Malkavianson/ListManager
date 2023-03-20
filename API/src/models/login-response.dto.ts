import { ApiProperty } from "@nestjs/swagger";
import { User } from "types/user.entity";

export class LoginResponseDto {
	@ApiProperty({
		description: "JWT token",
	})
	token: string;

	@ApiProperty({
		description: "Current user data",
	})
	user: User;
}
