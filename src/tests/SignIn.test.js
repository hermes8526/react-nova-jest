import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from "react-helmet-async";

import SignInComponent from "pages/auth/SignIn";

describe("SignInComponent", () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();

	const theme = createMuiTheme()
	let store = mockStore(initialState);
	const history = createMemoryHistory();

	it("should render component without clashing", async () => {
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<SignInComponent />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		await waitFor(() => {
			expect(document.title).toEqual('Sign In');
			expect(getByText(/Forgot password/i)).toBeTruthy();
			expect(getByText(/Sign Up/i)).toBeTruthy();
		});
	});

	it("should submit form with all the data filled", async () => {
		const { container } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<SignInComponent />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const emailInput = container.querySelector('input[name="email"]');
		const passwordInput = container.querySelector('input[name="password"]');

		await waitFor(() => {
			fireEvent.change(emailInput, { target: { value: "johndee@gmail.com" } });
		});

		await waitFor(() => {
			fireEvent.change(passwordInput, { target: { value: "123" } });
		});

		expect(passwordInput.value).toBe("123");
		expect(emailInput.value).toBe("johndee@gmail.com");
	});
});
