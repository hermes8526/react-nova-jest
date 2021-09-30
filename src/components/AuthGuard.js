import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
	const auth = () => {
		let cookies = new Cookies();

		let loginSession = cookies.get("login_session");
		if (loginSession?.loggedIn) {
			return true;
		}
		return false;
	};

	if (!auth()) {
		return <Redirect to="/account/sign-in" />;
	}

	return children;
}

export default AuthGuard;
