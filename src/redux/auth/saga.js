// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD
} from '../../constants/actionTypes';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed
} from './actions';
import {Api} from "./api.service";
import { get } from 'lodash';


/**
 * Fetch data from given url
 * @param {*} url 
 * @param {*} options 
 */
const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}


/**
 * Sets the session
 * @param {*} user 
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user){
        cookies.set("user", JSON.stringify(user), { path: "/" });
    } else {
        cookies.remove("user");
        cookies.remove("token");
    }
};

const setTokenToSession = (data) => {
    let cookies = new Cookies();
    if (data) {
        cookies.set("token", JSON.stringify(data), { path: "/", expires: new Date(new Date().getTime() + get(data, 'expires_in', 0) * 1000)});
    } else {
        cookies.remove("token");
        cookies.remove("user");
    }
};
/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password } }) {
    try {
        const response = yield call(Api.login, {username, password});
        setTokenToSession(get(response, 'data', {}));

        const res = yield call(Api.getMe);
        setSession(get(res, "data.data", {}));

        yield put(loginUserSuccess(get(res, "data.data", {})));
    } catch (error) {
        let message;

        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }

        yield put(loginUserFailed(message));
        setSession(null);
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        yield call(() => {
            history.push("/login");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { fullname, email, password } }) {
    const options = {
        body: JSON.stringify({ fullname, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, '/users/register', options);
        yield put(registerUserSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {
    const options = {
        body: JSON.stringify({ username }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = yield call(fetchJSON, '/users/password-reset', options);
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(forgetPasswordFailed(message));
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
    ]);
}

export default authSaga;
