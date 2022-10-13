export interface IAuth {
	status?: IAuthStatus;
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	errorMessage?: string | null;
}

export type IAuthStatus =
	| "not-authenticated"
	| "not-authenticated"
	| "authenticated"
	| "checking";
