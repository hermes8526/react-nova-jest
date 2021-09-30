import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {
	dashboardLayoutRoutes,
	authLayoutRoutes,
	presentationLayoutRoutes,
	protectedRoutes,
	managementRoute,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import PresentationLayout from "../layouts/Presentation";
import ManagementLayout from "../layouts/Management";
import Page404 from "../pages/auth/Page404";

const childRoutes = (Layout, routes) =>
	routes.map(({ component: Component, guard, children, path }, index) => {
		const Guard = guard || React.Fragment;

		return children ? (
			children.map((element, index) => {
				const Guard = element.guard || React.Fragment;
				const ElementComponent = element.component || React.Fragment;

				return (
					<Route
						key={index}
						path={element.path}
						exact
						render={(props) => (
							<Layout>
								<Guard>
									<ElementComponent {...props} />
								</Guard>
							</Layout>
						)}
					/>
				);
			})
		) : Component ? (
			<Route
				key={index}
				path={path}
				exact
				render={(props) => (
					<Layout>
						<Guard>
							<Component {...props} />
						</Guard>
					</Layout>
				)}
			/>
		) : null;
	});

const Routes = () => (
	<Router>
		<Switch>
			<Redirect exact from="/" to="/account/sign-in" />
			{childRoutes(DashboardLayout, dashboardLayoutRoutes)}
			{childRoutes(DashboardLayout, protectedRoutes)}
			{childRoutes(AuthLayout, authLayoutRoutes)}
			{childRoutes(PresentationLayout, presentationLayoutRoutes)}
			{childRoutes(ManagementLayout, managementRoute)}
			<Route
				render={() => (
					<AuthLayout>
						<Page404 />
					</AuthLayout>
				)}
			/>
		</Switch>
	</Router>
);

export default Routes;
