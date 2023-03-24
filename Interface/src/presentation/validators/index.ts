import { theme } from "presentation/assets/styles/theme";
import toast from "react-hot-toast";

export const isPw = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const error = (message: string): string => {
	return toast.error(message, {
		style: {
			borderRadius: "1rem",
			fontSize: "3rem",
			backgroundColor: "#dedede",
			fontFamily: `${theme.constants.bodyFontFamily}`,
		},
	});
};

export const success = (message: string): string => {
	return toast.success(message, {
		style: {
			borderRadius: "1rem",
			fontSize: "3rem",
			backgroundColor: "#dedede",
			fontFamily: `${theme.constants.bodyFontFamily}`,
		},
	});
};

export const validateName = (name: string): boolean | void => {
	if (Boolean(name)) {
		return Boolean(name);
	} else {
		error("Name must be filled");
	}
};

export const validatePassword = (pw: string): boolean | void => {
	if (isPw.test(pw) && pw.length > 7) {
		return isPw.test(pw);
	} else {
		error(
			"Must have a minimal of 8 characters, one uppercase, one lowercase, one symbol and one number.",
		);
	}
};
