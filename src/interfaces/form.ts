export interface IForm {
	email?: string;
	password?: string;
	displayName?: string;
	id?: string;
	title?: string;
	body?: string;
	date?: number;
	imagesURL?: string[];
}

export interface IFormCheckedValues {
	emailValid?: string | null;
	passwordValid?: string | null;
	displayNameValid?: string | null;
	idValid?: string | null;
	titleValid?: string | null;
	bodyValid?: string | null;
	dateValid?: number | null;
}

export interface IFormValidations {
	email?: (((value: string) => boolean) | string)[];
	password?: (((value: string) => boolean) | string)[];
	displayName?: (((value: string) => boolean) | string)[];
	title?: (((value: string) => boolean) | string)[];
	body?: (((value: string) => boolean) | string)[];
	id?: (((value: string) => boolean) | string)[];
	date?: (((value: number) => boolean) | string)[];
}

export type FormField = "email" | "displayName" | "password";

export type FormFieldValidations =
	| "emailValid"
	| "passwordValid"
	| "displayNameValid";
