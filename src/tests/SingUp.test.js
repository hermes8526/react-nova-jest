import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import SignUpComponent from "pages/auth/SignUp";

describe("SignUpComponent", () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();
	let store;
	const theme = createMuiTheme()
	const history = createMemoryHistory();

	it("should render component without clashing", async () => {
		store = mockStore(initialState);
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<SignUpComponent />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const title = getByText('Get started');

		expect(title).toBeTruthy();

		await waitFor(() => {
			expect(document.title).toEqual('Sign Up');
			expect(getByText(/Sign In/i)).toBeTruthy();
		});
	});
});
