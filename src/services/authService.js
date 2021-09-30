import axios from "../utils/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function signIn(credentials) {
	return new Promise((resolve, reject) => {
		axios
			.post("/auth/login", credentials)
			.then((response) => {
				if (response.status === 200) {
					cookies.set("login_session", { loggedIn: true }, { path: "/" });
					resolve(response.data);
				}
				reject(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function signUp(credentials) {
	return new Promise((resolve, reject) => {
		axios
			.post("/auth/register", credentials)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				}
				reject(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function resetPassword(credentials) {
	return new Promise((resolve, reject) => {
		axios
			.post("/auth/requestReset", credentials)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				}
				reject(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function authConfirmPassword(credentials) {
	return new Promise((resolve, reject) => {
		axios
			.post("/auth/reset", credentials)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				}
				reject(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export function authEmailVerify(credentials) {
	return new Promise((resolve, reject) => {
		axios
			.post(`/auth/verify/${credentials.confirmationCode}`, credentials)
			.then((response) => {
				if (response.status === 200) {
					resolve(response.data);
				}
				reject(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
