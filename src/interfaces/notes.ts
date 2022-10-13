export interface INote {
	id?: string;
	title: string;
	body: string;
	date: number;
	imagesURL?: string[];
}

export interface IImage {}

export interface INoteValidations {
	title: (string | ((value: string) => boolean))[];
	body: (string | ((value: string) => boolean))[];
}

export interface INoteCheckedValues {
	title: string | null;
	body: string | null;
	date: number | null;
}
