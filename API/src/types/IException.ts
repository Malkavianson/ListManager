import { EExceptionType } from "utils/exceptions/exception.helper";

export interface IException {
	message?: string;
	exception: EExceptionType;
}
