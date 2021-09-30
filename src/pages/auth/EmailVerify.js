import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

import { emailVerify } from "state/actions/authActions";

const Alert = styled(MuiAlert)(spacing);

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function EmailVerify({ match }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [errors, setErrors] = useState(false);
	const [status, setStatus] = useState(false);

	const handleVerification = async () => {
		try {
			await dispatch(
				emailVerify(
					{
						confirmationCode: match.params.id,
					},
					() => {
						setStatus({ success: true });
						setTimeout(() => {
							history.push("/account/sign-in");
						}, 3000);
					}
				)
			);
		} catch (error) {
			const messageArr = Array.isArray(error.messages?.error)
				? error.messages.error[0].replaceAll("_", " ")
				: null;
			const message = error.message || messageArr || "Something went wrong";
			setErrors({ submit: message });
		}
	};

	useEffect(() => {
		let verificationId = match?.params?.id;
		if (verificationId) {
			handleVerification();
		}
	}, []);

	return (
		<Wrapper>
			<Helmet title="Email Verify" />

			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Email Verification
			</Typography>
			<Typography component="h2" variant="body1" align="center">
				Email verification process is running, please wait.
			</Typography>
			{errors.submit && (
				<Alert mt={2} mb={1} severity="warning">
					{errors.submit}
				</Alert>
			)}
			{status?.success && (
				<Alert mt={2} mb={1} severity="success">
					Your Email verifies successfully, Sign in to continue
				</Alert>
			)}
		</Wrapper>
	);
}

export default EmailVerify;
