import * as types from "../../constants";
import {
	signIn as authSignIn,
	signUp as authSignUp,
	resetPassword as authResetPassword,
	authConfirmPassword,
	authEmailVerify,
} from "../../services/authService";

export function signIn(credentials, callback) {
	return async (dispatch) => {
		dispatch({ type: types.AUTH_SIGN_IN_REQUEST });

		return authSignIn(credentials)
			.then((response) => {
				dispatch({
					type: types.AUTH_SIGN_IN_SUCCESS,
					id: response.id,
					email: response.email,
					name: response.name,
				});
				callback && callback();
			})
			.catch((error) => {
				dispatch({ type: types.AUTH_SIGN_IN_FAILURE });
				throw error;
			});
	};
}

export function signUp(credentials, callback) {
	return async (dispatch) => {
		dispatch({ type: types.AUTH_SIGN_UP_REQUEST });

		return authSignUp(credentials)
			.then((response) => {
				dispatch({
					type: types.AUTH_SIGN_UP_SUCCESS,
					id: response.id,
					email: response.email,
					name: response.name,
				});
				callback && callback();
			})
			.catch((error) => {
				dispatch({ type: types.AUTH_SIGN_UP_FAILURE });
				throw error;
			});
	};
}

export function signOut() {
	return async (dispatch) => {
		dispatch({
			type: types.AUTH_SIGN_OUT,
		});
	};
}

export function resetPassword(credentials, callback) {
	return async (dispatch) => {
		dispatch({ type: types.AUTH_RESET_PASSWORD_REQUEST });

		return authResetPassword(credentials)
			.then((response) => {
				dispatch({
					type: types.AUTH_RESET_PASSWORD_SUCCESS,
					email: response.email,
				});
				callback && callback();
			})
			.catch((error) => {
				dispatch({ type: types.AUTH_RESET_PASSWORD_FAILURE });
				throw error;
			});
	};
}

export function confirmPassword(credentials, callback) {
	return async (dispatch) => {
		dispatch({ type: types.AUTH_CONFIRM_PASSWORD_REQUEST });

		return authConfirmPassword(credentials)
			.then((response) => {
				dispatch({
					type: types.AUTH_CONFIRM_PASSWORD_SUCCESS,
					response,
				});
				callback && callback();
			})
			.catch((error) => {
				dispatch({ type: types.AUTH_CONFIRM_PASSWORD_FAILURE });
				throw error;
			});
	};
}

export function emailVerify(credentials, callback) {
	return async (dispatch) => {
		dispatch({ type: types.AUTH_EMAIL_VERIFY_REQUEST });

		return authEmailVerify(credentials)
			.then((response) => {
				dispatch({
					type: types.AUTH_EMAIL_VERIFY_SUCCESS,
					response,
				});
				callback && callback();
			})
			.catch((error) => {
				dispatch({ type: types.AUTH_EMAIL_VERIFY_FAILURE });
				throw error;
			});
	};
}
