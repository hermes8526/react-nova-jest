import React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Tooltip, Menu, MenuItem, IconButton as MuiIconButton } from "@material-ui/core";

import { signOut } from "../state/actions/authActions";

import Cookies from "universal-cookie";

const IconButton = styled(MuiIconButton)`
	svg {
		width: 22px;
		height: 22px;
	}
`;

function UserDropdown() {
	const [anchorMenu, setAnchorMenu] = React.useState(null);
	const history = useHistory();
	const dispatch = useDispatch();

	const toggleMenu = (event) => {
		setAnchorMenu(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorMenu(null);
	};

	const handleSignOut = async () => {
		let cookies = new Cookies();
		await dispatch(signOut());
		cookies.remove("login_session", { path: "/" });
		history.push("/account/sign-in");
	};

	return (
		<React.Fragment>
			<Tooltip title="Account">
				<IconButton
					aria-owns={anchorMenu ? "menu-appbar" : undefined}
					aria-haspopup="true"
					onClick={toggleMenu}
					color="inherit">
					<Power />
				</IconButton>
			</Tooltip>
			<Menu id="menu-appbar" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={closeMenu}>
				<MenuItem onClick={closeMenu}>Profile</MenuItem>
				<MenuItem onClick={handleSignOut}>Sign out</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

export default UserDropdown;
