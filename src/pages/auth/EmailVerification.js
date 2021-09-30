import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Link } from "react-router-dom";

import { Paper, Typography, Button } from "@material-ui/core";

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function EmailVerification() {
	return (
		<Wrapper>
			<Helmet title="Email Verification" />

			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Email Verification
			</Typography>
			<Typography component="h2" variant="body1" align="center">
				Email verification link was sent to your email address
			</Typography>
			<Button component={Link} to="/account/sign-in" fullWidth color="primary">
				Sign in
			</Button>
		</Wrapper>
	);
}

export default EmailVerification;
