import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import { Button, Paper, TextField as MuiTextField, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

import { signUp } from "state/actions/authActions";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
	padding: ${(props) => props.theme.spacing(6)}px;

	${(props) => props.theme.breakpoints.up("md")} {
		padding: ${(props) => props.theme.spacing(10)}px;
	}
`;

function SignUp() {
	const dispatch = useDispatch();
	const history = useHistory();

	return (
		<Wrapper>
			<Helmet title="Sign Up" />

			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Get started
			</Typography>
			<Typography component="h2" variant="body1" align="center">
				Start creating the best possible user experience for you customers
			</Typography>

			<Formik
				initialValues={{
					firstname: "",
					lastname: "",
					email: "",
					password: "",
					confirmPassword: "",
					submit: false,
				}}
				validationSchema={Yup.object().shape({
					firstname: Yup.string().max(255).required("First Name is required"),
					lastname: Yup.string().max(255).required("Last Name is required"),
					email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
					password: Yup.string().min(8, "Must be at least 8 characters").max(255).required("Required"),
					confirmPassword: Yup.string().when("password", {
						is: (val) => (val && val.length > 0 ? true : false),
						then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
					}),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						await dispatch(
							signUp(
								{
									givenName: values.firstname,
									familyName: values.lastname,
									email: values.email,
									password: values.password,
									confirmPassword: values.confirmPassword,
								},
								() => {
									setStatus({ success: true });
									history.push("/account/email-verification");
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
								Successfully signed up, Login to continue
							</Alert>
						)}
						<TextField
							type="text"
							name="firstname"
							label="First Name"
							value={values.firstname}
							error={Boolean(touched.firstname && errors.firstname)}
							fullWidth
							helperText={touched.firstname && errors.firstname}
							onBlur={handleBlur}
							onChange={handleChange}
							my={3}
						/>
						<TextField
							type="text"
							name="lastname"
							label="Last Name"
							value={values.lastname}
							error={Boolean(touched.lastname && errors.lastname)}
							fullWidth
							helperText={touched.lastname && errors.lastname}
							onBlur={handleBlur}
							onChange={handleChange}
							my={3}
						/>
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
							Sign up
						</Button>
						<Button component={Link} to="/account/sign-in" fullWidth color="primary">
							Sign In
						</Button>
					</form>
				)}
			</Formik>
		</Wrapper>
	);
}

export default SignUp;
