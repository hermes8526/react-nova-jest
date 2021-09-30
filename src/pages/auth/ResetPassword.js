import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";

import { resetPassword } from "state/actions/authActions";

import { Button, Paper, TextField as MuiTextField, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function ResetPassword() {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Wrapper>
			<Helmet title="Reset Password" />

			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Reset Password
			</Typography>
			<Typography component="h2" variant="body1" align="center">
				Enter your email to reset your password
			</Typography>

			<Formik
				initialValues={{
					email: "",
					submit: false,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						await dispatch(
							resetPassword(
								{
									email: values.email,
								},
								() => {
									setStatus({ success: true });
									history.push("/account/password-verification");
								}
							)
						);
					} catch (error) {
						const messageArr = Array.isArray(error.messages?.error)
							? error.messages.error[0].replaceAll("_", " ")
							: null;
						const message = error.message || messageArr || "Something went wrong";

						setStatus({ success: false });
						setErrors({ submit: message });
						setSubmitting(false);
					}
				}}>
				{({ status, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit}>
						{errors.submit && (
							<Alert mt={2} mb={1} severity="warning">
								{errors.submit}
							</Alert>
						)}
						{status?.success && (
							<Alert mt={2} mb={1} severity="success">
								Reset Token has been send into email, check email to continue
							</Alert>
						)}
						<TextField
							type="email"
							name="email"
							label="Email Address"
							value={values.email}
							error={Boolean(touched.email && errors.email)}
							fullWidth
							helperText={touched.email && errors.email}
							onBlur={handleBlur}
							onChange={handleChange}
							my={3}
							data-testid="email-field"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={isSubmitting}
							data-testid="submit-btn">
							Reset password
						</Button>
					</form>
				)}
			</Formik>
		</Wrapper>
	);
}

export default ResetPassword;
