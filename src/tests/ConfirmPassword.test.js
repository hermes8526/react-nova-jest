import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { HelmetProvider } from "react-helmet-async";

import ConfirmPasswordComponent from "pages/auth/ConfirmPassword";

describe("ConfirmPasswordComponent", () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();
	let store = mockStore(initialState);
	const theme = createMuiTheme();

	it("should render component without clashing", async () => {
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<ThemeProvider theme={theme}>
					<Provider store={store}>
						<ConfirmPasswordComponent />
					</Provider>
				</ThemeProvider>
			</HelmetProvider>
		);

		const title = getByText('Create Password');

		expect(title).toBeTruthy();

		await waitFor(() => {
			expect(document.title).toEqual('Reset Password');
		});
	});
});
