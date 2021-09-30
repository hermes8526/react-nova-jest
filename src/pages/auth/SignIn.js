import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";

import { Checkbox, FormControlLabel, Button, Paper, TextField as MuiTextField } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

import { signIn } from "state/actions/authActions";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function SignIn() {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Wrapper>
			<Helmet title="Sign In" />

			<Formik
				initialValues={{
					email: "",
					password: "",
					_csrf: "",
					submit: false,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
					password: Yup.string().max(255).required("Password is required"),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						await dispatch(
							signIn(
								{
									email: values.email,
									password: values.password,
									_csrf: values._csrf,
								},
								() => {
									history.push("/private");
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
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit}>
						{errors.submit && (
							<Alert mt={2} mb={1} severity="warning">
								{errors.submit}
							</Alert>
						)}
						<input type="hidden" name="_csrf" value="{{csrfToken}}" />
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
							my={2}
						/>
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
							my={2}
						/>
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						<Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
							Sign in
						</Button>
						<Button
							component={Link}
							to="/account/reset-password"
							fullWidth
							color="primary"
							data-testid="forgot-password">
							Forgot password
						</Button>
						<Button component={Link} to="/account/sign-up" fullWidth color="primary">
							Sign Up
						</Button>
					</form>
				)}
			</Formik>
		</Wrapper>
	);
}

export default SignIn;
