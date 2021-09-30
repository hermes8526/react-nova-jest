import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { HelmetProvider } from "react-helmet-async";

import ResetPasswordComponent from "pages/auth/ResetPassword";

describe("ResetPasswordComponent", () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();
	let store = mockStore(initialState);
	const theme = createMuiTheme();

	it("should render component without clashing", async () => {
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<ResetPasswordComponent />
					</Provider>
				</ThemeProvider>
			</HelmetProvider>
		);

		const title = getByText('Reset Password');

		expect(title).toBeTruthy();

		await waitFor(() => {
			expect(document.title).toEqual('Reset Password');
		});
	});

	it("should show validation error on click on submit", async () => {
		const { getByText, getByTestId } = render(
			<HelmetProvider context={{}}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<ResetPasswordComponent />
					</Provider>
				</ThemeProvider>
			</HelmetProvider>
		);

		const input = getByTestId('submit-btn');

		fireEvent.click(input);

		await waitFor(() => {
			const error = getByText(/Email is required/i);

			expect(error).toBeTruthy();
		});
	});
});
