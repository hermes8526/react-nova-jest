import React from "react";

import { Sliders, Trello } from "react-feather";

export const DashboardRoutes = [
	{
		id: "Dashboard",
		path: "/dashboard/default",
		header: false,
		icon: <Sliders />,
		containsHome: true,
		children: false,
		component: null,
	},
	{
		id: "Management",
		path: "/users/manage",
		header: false,
		icon: <Trello />,
		containsHome: true,
		children: false,
		component: null,
	},
];
