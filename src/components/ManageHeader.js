import React from "react";
import styled, { withTheme } from "styled-components/macro";

import { Grid, Hidden, AppBar as MuiAppBar, IconButton as MuiIconButton, Toolbar, Button } from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

import NotificationsDropdown from "./NotificationsDropdown";
import MessagesDropdown from "./MessagesDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import UserDropdown from "./UserDropdown";
import { ChevronLeft } from "react-feather";

import { Link } from "react-router-dom";

const AppBar = styled(MuiAppBar)`
	background: ${(props) => props.theme.header.background};
	color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
	svg {
		width: 22px;
		height: 22px;
	}
`;

const StyledButton = styled(Button)`
	margin: 0px 22px;
`;

const AppBarComponent = ({ onDrawerToggle }) => (
	<React.Fragment>
		<AppBar position="sticky" elevation={0}>
			<Toolbar>
				<Grid container alignItems="center">
					<Hidden mdUp>
						<Grid item>
							<IconButton color="inherit" aria-label="Open drawer" onClick={onDrawerToggle}>
								<MenuIcon />
							</IconButton>
						</Grid>
					</Hidden>
					<Grid item>
						<Button component={Link} to="/private" startIcon={<ChevronLeft />} variant="outlined">
							Back
						</Button>

						<StyledButton component={Link} to="/profile">
							Profile
						</StyledButton>

						<StyledButton component={Link} to="/settings">
							Settings
						</StyledButton>

						<StyledButton component={Link} to="/users/manage">
							Manage User
						</StyledButton>
					</Grid>
					<Grid item xs />
					<Grid item>
						<MessagesDropdown />
						<NotificationsDropdown />
						<LanguagesDropdown />
						<UserDropdown />
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	</React.Fragment>
);

export default withTheme(AppBarComponent);
