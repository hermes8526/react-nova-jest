import React from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@material-ui/core";

function FormDialog({title, open, setOpen}) {

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="role"
					label="Role"
					type="role"
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="access"
					label="Project Access"
					type="access"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => setOpen(false)} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default FormDialog;
