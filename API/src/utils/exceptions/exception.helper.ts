import {
	InternalServerErrorException,
	BadRequestException,
	UnauthorizedException,
	ForbiddenException,
} from "@nestjs/common";
import { IException } from "types/IException";

export enum EExceptionType {
	INTERNAL_SERVER_ERROR,
	RESOURCE_NOT_FOUND,
	DATA_INVALID,
	UNAUTHORIZED,
	FORBIDDEN,
}

export function HandleException({ exception, message }: IException): void {
	switch (exception) {
		case EExceptionType.INTERNAL_SERVER_ERROR:
			throw new InternalServerErrorException(
				message ? message : "INTERNAL SERVER ERROR",
			);
		case EExceptionType.RESOURCE_NOT_FOUND:
			throw new BadRequestException(
				message ? message : "RESOURCE NOT FOUND",
			);
		case EExceptionType.DATA_INVALID:
			throw new BadRequestException(message ? message : "DATA INVALID");
		case EExceptionType.UNAUTHORIZED:
			throw new UnauthorizedException(message ? message : "UNAUTHORIZED");
		case EExceptionType.FORBIDDEN:
			throw new ForbiddenException(
				message ? message : "INSUFFICIENT PRIVILEGES",
			);
	}
}
