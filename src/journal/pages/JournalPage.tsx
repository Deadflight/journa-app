import React from "react";
import { IconButton } from "@mui/material";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { startNewNote } from "../../store";

export const JournalPage = () => {
	const dispatch = useAppDispatch();
	const { isSaving, activeNote } = useAppSelector((state) => state.journal);

	const onClickNewNote = () => {
		dispatch(startNewNote());
	};

	return (
		<>
			{!!activeNote?.id?.length ? <NoteView /> : <NothingSelectedView />}
			<IconButton
				size="large"
				sx={{
					color: "white",
					backgroundColor: "error.main",
					":hover": { backgroundColor: "error.main", opacity: 0.9 },
					position: "fixed",
					right: 50,
					bottom: 50,
				}}
				onClick={onClickNewNote}
				disabled={isSaving}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</>
	);
};
