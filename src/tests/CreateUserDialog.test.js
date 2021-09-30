import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fireEvent, render, waitFor } from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import CreateUserDialog from "pages/users/CreateUserDialog";

describe("CreateUserDialog", () => {
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
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		await waitFor(async () => {
			expect(getByText(/Add new user/i)).toBeTruthy();
			expect(getByText(/Save/i)).toBeTruthy();
			expect(getByText(/Cancel/i)).toBeTruthy();
		});
	});

	it("should submit form with all the data filled", async () => {
		store = mockStore(initialState);
		const { getByLabelText } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const usernameInput = getByLabelText(/User Name/i)
		const emailInput = getByLabelText(/email/i)

		await waitFor(() => {
			fireEvent.change(usernameInput, { target: { value: "darkhorse" } });
		});

		await waitFor(() => {
			fireEvent.change(emailInput, { target: { value: "darkhorse03111@gmail.com" } });
		});

		expect(usernameInput.value).toBe("darkhorse");
		expect(emailInput.value).toBe("darkhorse03111@gmail.com");
	})

	it("should check validation", async () => {
		store = mockStore(initialState);
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		expect(getByText(/Add new user/i)).toBeTruthy();
		expect(getByText(/This field is required./i)).toBeTruthy();
		expect(getByText(/Email is not valid./i)).toBeTruthy();
	})

	it("should change state from 1 to 2", async () => {
		store = mockStore(initialState);
		const { getByText, getByLabelText, getByDisplayValue } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const usernameInput = getByLabelText(/User Name/i)
		const emailInput = getByLabelText(/email/i)

		await waitFor(() => {
			fireEvent.change(usernameInput, { target: { value: "darkhorse" } });
		});

		await waitFor(() => {
			fireEvent.change(emailInput, { target: { value: "darkhorse03111@gmail.com" } });
		});

		const saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		expect(getByText(/Select User Type/i)).toBeTruthy();
		expect(getByText(/Full Project wide access/i)).toBeTruthy();
		expect(getByText(/Super Admin/i)).toBeTruthy();
		expect(getByText(/Manager/i)).toBeTruthy();
		expect(getByText(/Occupier/i)).toBeTruthy();
		const radio1 = getByDisplayValue('Super Admin')
		const radio2 = getByDisplayValue('Admin')
		const radio3 = getByDisplayValue('Manager')
		const radio4 = getByDisplayValue('Occupier')
		expect(radio1).toBeTruthy();
		expect(radio2).toBeTruthy();
		expect(radio3).toBeTruthy();
		expect(radio4).toBeTruthy();
	})

	it("should change user type value and change state from 2 to 3", async () => {
		store = mockStore(initialState);
		const { container, getByText, getAllByText, getByLabelText, getByDisplayValue } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const usernameInput = getByLabelText(/User Name/i)
		const emailInput = getByLabelText(/email/i)

		await waitFor(() => {
			fireEvent.change(usernameInput, { target: { value: "darkhorse" } });
		});

		await waitFor(() => {
			fireEvent.change(emailInput, { target: { value: "darkhorse03111@gmail.com" } });
		});

		let saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		const radio1 = getByDisplayValue('Super Admin')
		const radio2 = getByDisplayValue('Admin')
		const radio3 = getByDisplayValue('Manager')
		const radio4 = getByDisplayValue('Occupier')

		await waitFor(() => {
			fireEvent.change(radio1, { target: { value: "Super Admin" } });
			fireEvent.click(radio1);
		});

		saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		await waitFor(async () => {
			expect(getAllByText(/Select project access permissions/i)).toBeTruthy();
			expect(getAllByText(/darkhorse/i)).toBeTruthy();
			expect(getAllByText(/darkhorse03111@gmail.com/i)).toBeTruthy();
			expect(getAllByText(/Super Admin/i)).toBeTruthy();
		});
	})

	it("should change search value", async () => {
		store = mockStore(initialState);
		const { container, getByText, getAllByText, getByLabelText, getByDisplayValue } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<CreateUserDialog open />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const usernameInput = getByLabelText(/User Name/i)
		const emailInput = getByLabelText(/email/i)

		await waitFor(() => {
			fireEvent.change(usernameInput, { target: { value: "darkhorse" } });
		});

		await waitFor(() => {
			fireEvent.change(emailInput, { target: { value: "darkhorse03111@gmail.com" } });
		});

		let saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		const radio1 = getByDisplayValue('Super Admin')
		const radio2 = getByDisplayValue('Admin')
		const radio3 = getByDisplayValue('Manager')
		const radio4 = getByDisplayValue('Occupier')

		await waitFor(() => {
			fireEvent.change(radio1, { target: { value: "Super Admin" } });
			fireEvent.click(radio1);
		});

		saveBtn = getByText(/Save/i);

		await waitFor(() => {
			fireEvent.click(saveBtn);
		});

		const searchInput = getByLabelText(/Search fields/i)

		await waitFor(() => {
			fireEvent.change(searchInput, { target: { value: "permission" } });
		});

		expect(searchInput.value).toBe("permission");
	})
});
