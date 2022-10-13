import {
	addNewEmptyNote,
	setActiveNote,
	setSavingNote,
} from "../../../src/store";
import { startNewNote } from "../../../src/store/slices/journal/journalThunks";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
describe("Test for journalThuks.ts", () => {
	const dispatch = jest.fn();
	const getState = jest.fn();
	beforeEach(() => jest.clearAllMocks());

	test("should create a new blank note", async () => {
		const uid = "Test-uid";

		getState.mockReturnValue({ auth: { uid } });

		await startNewNote()(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(setSavingNote(true));

		expect(dispatch).toHaveBeenCalledWith(
			addNewEmptyNote({
				body: "",
				title: "",
				date: expect.any(Number),
				id: expect.any(String),
				imagesURL: [],
			})
		);

		expect(dispatch).toHaveBeenCalledWith(
			setActiveNote({
				body: "",
				title: "",
				date: expect.any(Number),
				id: expect.any(String),
				imagesURL: [],
			})
		);

		//Delete from firebase
		const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

		const docs = await getDocs(collectionRef);

		const deletePromises = [] as Promise<void>[];

		docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

		await Promise.all(deletePromises);
	});
});
