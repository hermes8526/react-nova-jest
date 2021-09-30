import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";

import { Button, Paper, TextField as MuiTextField, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

import { confirmPassword } from "state/actions/authActions";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function ResetPassword({ match }) {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Wrapper>
			<Helmet title="Reset Password" />

			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Create Password
			</Typography>
			<Typography component="h2" variant="body1" align="center">
				Enter your new password here
			</Typography>

			<Formik
				initialValues={{
					password: "",
					confirmPassword: "",
					submit: false,
				}}
				validationSchema={Yup.object().shape({
					password: Yup.string().min(8, "Must be at least 8 characters").max(255).required("Required"),
					confirmPassword: Yup.string().when("password", {
						is: (val) => (val && val.length > 0 ? true : false),
						then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
					}),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						if (values.password !== values.confirmPassword) {
							setStatus({ success: false });
							setErrors({ submit: "Password doesn't match" });
							setSubmitting(false);
						} else {
							await dispatch(
								confirmPassword(
									{
										confirmationCode: match.params.id,
										password: values.password,
									},
									() => {
										setStatus({ success: true });
										setTimeout(() => {
											history.push("/account/sign-in");
										}, 3000);
									}
								)
							);
						}
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
								Your password has been updated, sign in to continue
							</Alert>
						)}
						<TextField
							type="password"
							name="password"
							label="Password"
							value={values.password}
							error={Boolean(touched.password && errors.password)}
							fullWidth
							helperText={touched.password && errors.password}
							onBlur={handleBlur}
							onChange={handleChange}
							my={3}
						/>
						<TextField
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							value={values.confirmPassword}
							error={Boolean(touched.confirmPassword && errors.confirmPassword)}
							fullWidth
							helperText={touched.confirmPassword && errors.confirmPassword}
							onBlur={handleBlur}
							onChange={handleChange}
							my={3}
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
							Reset password
						</Button>
					</form>
				)}
			</Formik>
		</Wrapper>
	);
}

export default ResetPassword;
