import { EExceptionType } from "./exception.helper";

export class Exception {
	constructor(
		readonly exception: EExceptionType,
		readonly message?: string,
	) {}
}
