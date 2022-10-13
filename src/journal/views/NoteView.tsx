import React, { useMemo, ChangeEvent, useRef, useEffect } from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
	DeleteOutline,
	SaveOutlined,
	UploadOutlined,
} from "@mui/icons-material";
import { ImageGallery } from "../components";
import { useAppSelector, useForm, useAppDispatch } from "../../hooks";
import {
	setActiveNote,
	startSavingNote,
	startUploadingFiles,
	startDeletingNote,
} from "../../store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
	title: [(value: string) => value.length >= 1, "Title is required"],
	body: [
		(value: string) => value.length >= 6,
		"Body must contain 6 characters",
	],
	date: [(value: number) => !!value, "Date is required"],
};

export const NoteView = () => {
	const { activeNote, messageSaved, isSaving } = useAppSelector(
		(state) => state.journal
	);

	const { imagesURL } = activeNote;
	const dispatch = useAppDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		body = "",
		title = "",
		date = new Date().getDate(),
		id = "",
		onInputChange,
		formState,
	} = useForm(activeNote, formValidations);

	const dateFormat = useMemo(() => {
		const newDate = new Date(date!);

		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(
			setActiveNote({
				id,
				body,
				title,
				date,
				imagesURL,
			})
		);
	}, [id, body, title, date, imagesURL]);

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire("Updated note", messageSaved, "success");
		}
	}, [messageSaved]);

	const onSaveNote = () => {
		dispatch(startSavingNote());
	};

	const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (!target.files) return;

		dispatch(startUploadingFiles(target.files));
	};

	const onDelete = () => {
		dispatch(startDeletingNote());
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent={"space-between"}
			sx={{ mb: 1 }}
			className="animate__animated animate__fadeIn animate__faster"
		>
			<Grid item>
				<Typography fontSize={39} fontWeight="light">
					{dateFormat}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type="file"
					multiple
					onChange={onFileInputChange}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
				<IconButton
					color={"primary"}
					disabled={isSaving}
					onClick={() => fileInputRef?.current?.click()}
				>
					<UploadOutlined />
				</IconButton>
				<Button
					color="primary"
					sx={{
						padding: 2,
					}}
					onClick={onSaveNote}
					disabled={isSaving}
				>
					<SaveOutlined sx={{ fonstSize: 30, mr: 1 }} />
					Save
				</Button>
			</Grid>
			<Grid container>
				<TextField
					type={"text"}
					variant="filled"
					fullWidth
					placeholder="Title"
					label="Title"
					sx={{ border: "none", mb: 1 }}
					name={"title"}
					value={title}
					onChange={onInputChange}
				/>
				<TextField
					type={"text"}
					variant="filled"
					fullWidth
					multiline
					placeholder="What happened today?"
					minRows={5}
					name={"body"}
					value={body}
					onChange={onInputChange}
				/>
			</Grid>
			<Grid container justifyContent={"end"}>
				<Button onClick={onDelete} sx={{ mt: 2 }} color="error">
					<DeleteOutline />
					Delete
				</Button>
			</Grid>

			<ImageGallery images={imagesURL!} />
		</Grid>
	);
};
