import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Footer from "../components/Footer";
import Settings from "../components/Settings";

import { spacing } from "@material-ui/system";
import { CssBaseline, Paper as MuiPaper, withWidth } from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";
import ManageHeader from "../components/ManageHeader";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
	display: flex;
	min-height: 100vh;
`;

const AppContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
	flex: 1;
	background: ${(props) => props.theme.palette.background.default};

	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		flex: none;
	}

	.MuiPaper-root .MuiPaper-root {
		box-shadow: none;
	}
`;

const Dashboard = ({ children, width }) => {
	return (
		<Root>
			<CssBaseline />
			<GlobalStyle />
			<AppContent>
				<ManageHeader />
				<MainContent p={isWidthUp("lg", width) ? 12 : 5}>{children}</MainContent>
				<Footer />
			</AppContent>
			<Settings />
		</Root>
	);
};

export default withWidth()(Dashboard);
