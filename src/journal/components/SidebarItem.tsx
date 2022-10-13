import React, { FC, useMemo } from "react";
import { TurnedInNot } from "@mui/icons-material";
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { INote } from "../../interfaces";
import { useAppDispatch } from "../../hooks";
import { setActiveNote } from "../../store";

interface Props {
	note: INote;
}

export const SidebarItem: FC<Props> = ({ note }) => {
	const dispatch = useAppDispatch();
	const { title, body } = note;

	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	}, [title]);

	const onSelectNote = () => {
		dispatch(setActiveNote(note));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={onSelectNote}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
