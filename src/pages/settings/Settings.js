import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import {
	Breadcrumbs as MuiBreadcrumbs,
	Button as MuiButton,
	Card as MuiCard,
	CardContent,
	Divider as MuiDivider,
	Grid,
	Link,
	Typography,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Button = styled(MuiButton)(spacing);

const Space = styled.div`
	height: 5px;
`;

function Public() {
	return (
		<Card mb={6}>
			<CardContent>
				<Typography variant="h5" gutterBottom>
					Settings
				</Typography>

				<Space />

				<Typography variant="h6" gutterBottom color="textSecondary">
					Project Notification
				</Typography>

				<Grid container spacing={6}>
					<Grid item md={8} flex>
						<Typography variant="body1" gutterBottom color="textSecondary">
							Email me :
						</Typography>
						<Grid item md={8} flex>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Views are share with from other user"
							/>
						</Grid>
						<Grid item md={8} flex>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="When users edit project settings"
							/>
						</Grid>
						<Grid item md={8} flex>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="When an assets enters 'Alerts' or 'Alarm' State"
							/>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

function Settings() {
	return (
		<React.Fragment>
			<Helmet title="Settings" />

			<Typography variant="h3" gutterBottom display="inline">
				Settings
			</Typography>

			<Grid justify="space-between" container spacing={24}>
				<Breadcrumbs aria-label="Breadcrumb" mt={2}>
					<Link component={NavLink} exact to="/">
						Dashboard
					</Link>
					<Link component={NavLink} exact to="/">
						Pages
					</Link>
					<Typography>Settings</Typography>
				</Breadcrumbs>

				<Button variant="contained" color="primary">
					Save changes
				</Button>
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

export default Settings;
