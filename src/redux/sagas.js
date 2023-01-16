import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import pageSaga from "./pages/saga";


export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        pageSaga()
    ]);
}
