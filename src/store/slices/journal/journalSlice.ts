import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../../interfaces";

export const journalSlice = createSlice({
	name: "journal",
	initialState: {
		isSaving: false,
		messageSaved: "",
		notes: [] as INote[],
		activeNote: {
			id: "",
			title: "",
			body: "",
			date: 0,
			imagesURL: [],
		} as INote,
	},
	reducers: {
		addNewEmptyNote: (state, { payload }: PayloadAction<INote>) => {
			state.notes.push(payload);
			state.isSaving = false;
		},
		setActiveNote: (state, { payload }: PayloadAction<INote>) => {
			state.activeNote = payload;
		},
		setNotes: (state, { payload }: PayloadAction<INote[]>) => {
			state.notes = payload;
		},
		setSavingNote: (state, { payload }: PayloadAction<boolean>) => {
			state.isSaving = payload;
			if (state.isSaving) {
				state.messageSaved = "";
			}
		},
		updateNote: (state, { payload }: PayloadAction<INote>) => {
			state.notes = state.notes.map((note) => {
				if (note.id === payload.id) return payload;

				return note;
			});

			state.messageSaved = `${payload.title}, updated!`;
		},
		setUploadingImages: (state, { payload }: PayloadAction<boolean>) => {
			state.isSaving = payload;
			if (state.isSaving) {
				state.messageSaved = "";
			}
		},
		setPhotosToActiveNote: (state, { payload }: PayloadAction<string[]>) => {
			state.activeNote.imagesURL = [...state.activeNote.imagesURL!, ...payload];
			state.isSaving = false;
		},
		deleteNoteById: (state, { payload }: PayloadAction<string>) => {
			state.notes = state.notes.filter((note) => note.id !== payload);
			state.activeNote = {
				id: "",
				title: "",
				body: "",
				date: 0,
				imagesURL: [],
			};
			state.messageSaved = "";
			state.isSaving = false;
		},
		clearNotesLogout: (state) => {
			state.activeNote = {
				id: "",
				title: "",
				body: "",
				date: 0,
				imagesURL: [],
			};
			state.messageSaved = "";
			state.notes = [];
			state.isSaving = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyNote,
	deleteNoteById,
	setActiveNote,
	setNotes,
	setSavingNote,
	updateNote,
	setUploadingImages,
	setPhotosToActiveNote,
	clearNotesLogout,
} = journalSlice.actions;
