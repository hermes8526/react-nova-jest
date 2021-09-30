import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
// For routes that can only be accessed by authenticated users
function PrivateGuard({ children }) {
	const auth = () => {
		let cookies = new Cookies();

		let loginSession = cookies.get("login_session");
		if (loginSession?.loggedIn) {
			return true;
		}
		return false;
	};

	if (auth()) {
		return <Redirect to="/private" />;
	}

	return children;
}

export default PrivateGuard;
