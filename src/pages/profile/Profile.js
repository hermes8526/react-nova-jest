import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import {
	Avatar,
	Breadcrumbs as MuiBreadcrumbs,
	Button as MuiButton,
	Card as MuiCard,
	CardContent,
	Divider as MuiDivider,
	FormControl as MuiFormControl,
	Grid,
	Link,
	TextField as MuiTextField,
	Typography,
	Chip,
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	align-items: center;
	width: 120px;
	margin: 20px 0px;
`;

const BigAvatar = styled(Avatar)`
	width: 120px;
	height: 120px;
	margin: 0 auto ${(props) => props.theme.spacing(2)}px;
`;

const Space = styled.div`
	height: ${(props) => (props.horizontal ? "0px" : props.small ? "10px" : "25px")};
	width: ${(props) => (props.horizontal ? (props.small ? "1px" : "25px") : "0px")};
`;

const Chips = styled(Chip)`
	margin: 0px 5px;
`;

function Public() {
	return (
		<Card mb={6}>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					Profile
				</Typography>

				<Space small />

				<Divider />

				<Grid container spacing={6}>
					<Grid item md={6}>
						<Grid item md={4}>
							<CenteredContent>
								<BigAvatar alt="Remy Sharp" src="/static/img/avatars/avatar-1.jpg" />
								<input
									accept="image/*"
									style={{ display: "none" }}
									id="raised-button-file"
									multiple
									type="file"
								/>
								<label htmlFor="raised-button-file">
									<Button variant="contained" color="primary" component="span">
										<CloudUpload mr={2} /> Upload
									</Button>
								</label>
							</CenteredContent>
						</Grid>

						<Divider />

						<Space />

						<Typography variant="h6" color="textSecondary">
							Basic Information
						</Typography>

						<Space small />

						<TextField
							id="username"
							label="Name"
							defaultValue="lucylavender"
							variant="outlined"
							fullWidth
							my={2}
						/>

						<TextField
							id="email"
							label="Email"
							defaultValue="lucylavender"
							variant="outlined"
							fullWidth
							my={2}
						/>

						<Space small />

						<Divider />
						<Space small />
						<Typography variant="h6" color="textSecondary">
							Project Information
						</Typography>

						<Space small />

						<FormControl fullWidth my={2} variant="outlined">
							<Typography>Role</Typography>
							<Space small />
							<Grid item>
								<Chips label="Super Admin" color="primary" variant="outlined" />
							</Grid>

							<Space small />

							<Typography>Associated Projects</Typography>
							<Space small />
							<Grid item>
								<Chips label="Project Lunar" color="primary" />

								<Chips label="Project Sonar" color="primary" />

								<Chips label="Project Mars" color="primary" />
							</Grid>
						</FormControl>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

function Profile() {
	return (
		<React.Fragment>
			<Helmet title="Profile" />

			<Grid justify="space-between" container spacing={24}>
				<Grid item>
					<Typography variant="h3" gutterBottom display="inline">
						Settings
					</Typography>

					<Breadcrumbs aria-label="Breadcrumb" mt={2}>
						<Link component={NavLink} exact to="/">
							Dashboard
						</Link>
						<Link component={NavLink} exact to="/">
							Pages
						</Link>
						<Typography>Settings</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid item>
					<div>
						<Button variant="contained" color="primary">
							Save changes
						</Button>
					</div>
				</Grid>
			</Grid>

			<Divider my={6} />

			<Grid container spacing={6}>
				<Grid item xs={12}>
					<Public />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default Profile;
