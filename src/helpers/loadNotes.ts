import React from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase";
import { INote } from "../interfaces";

export const loadNotes = async (uid: string) => {
	if (!uid) throw new Error("No uid found");

	const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

	const docs = await getDocs(collectionRef);

	const notes = [] as INote[];

	docs.forEach((doc) => {
		notes.push({
			...(doc.data() as INote),
			id: doc.id,
		});
	});

	return notes;
};
