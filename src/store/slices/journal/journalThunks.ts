import React from "react";
import { AppDispatch, RootState } from "../../store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase";
import { INote } from "../../../interfaces";
import {
	addNewEmptyNote,
	setActiveNote,
	setSavingNote,
	setNotes,
	updateNote,
	setUploadingImages,
	setPhotosToActiveNote,
	deleteNoteById,
} from "./";
import { fileUpload, loadNotes } from "../../../helpers";

export const startNewNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(setSavingNote(true));

		const { uid } = getState().auth;

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
			imagesURL: [],
		} as INote;

		const newDoc = doc(collection(FirebaseDB, `/${uid}/journal/notes`));
		await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
		dispatch(setSavingNote(false));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const { uid } = getState().auth;

		if (!uid) throw new Error("No uid found");

		const loadedNotes = await loadNotes(uid);

		dispatch(setNotes(loadedNotes));
	};
};

export const startSavingNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(setSavingNote(true));
		const { uid } = getState().auth;
		const { activeNote } = getState().journal;

		const noteToFireStore = { ...activeNote };

		delete noteToFireStore.id;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

		await setDoc(docRef, noteToFireStore, { merge: true });

		dispatch(updateNote(activeNote));
		dispatch(setSavingNote(false));
	};
};

export const startUploadingFiles = (files: FileList) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(setUploadingImages(true));

		const fileUploadPromises = [];

		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photosUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const { uid } = getState().auth;
		const { activeNote } = getState().journal;

		// /sdk4QpPqrrO9YrzpIGveUm0NlVU2/journal/notes/v5GVupxjJtFrqYs3fdd4
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

		await deleteDoc(docRef);

		dispatch(deleteNoteById(activeNote.id!));
	};
};
