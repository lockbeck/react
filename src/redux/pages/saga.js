import {all, call, put, takeEvery} from "redux-saga/effects";
import Actions from "./actions";
import Api from "./api.service";

function* getAll(action) {
    const {payload: {url, config, storeName}} = action;
    try {
        const {data} = yield call(Api.getAll, url, config);
        yield put({type: Actions.GET_ALL.SUCCESS, payload: {result: data, storeName}});
    } catch (e) {
        yield put({type: Actions.GET_ALL.FAILURE, payload: {storeName, errors: e.response.data}});
    }
}


function* getAllTrigger(action) {
    const {payload: {storeName}} = action;
    yield put({type: Actions.GET_ALL.TRIGGER, payload: {storeName}});
}

function* getOne(action) {
     const {payload: {url, config,  storeName}} = action;
    try {
        const {data} = yield call(Api.getOne, url, config);

        yield put({type: Actions.GET_ONE.SUCCESS, payload: {result: data, storeName}});
    } catch (e) {
        yield put({type: Actions.GET_ONE.FAILURE, payload: {storeName,errors: e.response.data}});
    }
}

function* getData(action) {
    // const { url, storeName, config = {}, callback = () => {} } = action.payload;
    // try {
    //     const { data } = yield call(Api.getData, url, config);
    //     yield put({
    //         type: Actions.GET_DATA.SUCCESS,
    //         payload: { result: data, storeName }
    //     });
    //     try {
    //         yield call(callback, data);
    //     } catch (e) {}
    // } catch (e) {
    //     yield put({
    //         type: Actions.GET_DATA.FAILURE,
    //         payload: { storeName, errors: e.response.data }
    //     });
    // }
}

function* getDataTrigger(action) {
    // const {
    //     payload: { storeName }
    // } = action;
    // yield put({ type: Actions.GET_DATA.TRIGGER, payload: { storeName } });
}

function* postAll(action) {
    // const {payload: {url, config, scheme, storeName, entityName, callback}} = action;
    //
    // try {
    //     const {data} = yield call(Api.postAll, url, config);
    //     const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    //     yield put({
    //         type: NormalizerAction.NORMALIZE.REQUEST,
    //         payload: {...normalizedData, storeName, entityName}
    //     });
    //     try {
    //         yield call(callback, data);
    //     } catch (e) {
    //
    //     }
    //     yield put({type: Actions.POST_ALL.SUCCESS, payload: normalizedData});
    //
    // } catch (e) {
    //     yield put({type: Actions.POST_ALL.FAILURE, payload: {storeName,errors: e.response.data}});
    //     yield put({type: NormalizerAction.NORMALIZE.FAILURE, payload: {storeName,errors: e.response.data}});
    // }
}

function* pageSaga() {
    yield all([
        takeEvery(Actions.GET_ALL.REQUEST, getAll),
        takeEvery(Actions.GET_ONE.REQUEST, getOne),
        takeEvery(Actions.GET_ALL.TRIGGER, getAllTrigger),
        takeEvery(Actions.GET_ONE.TRIGGER, getAllTrigger),
        takeEvery(Actions.GET_DATA.REQUEST, getData),
        takeEvery(Actions.GET_DATA.TRIGGER, getDataTrigger),
        takeEvery(Actions.POST_ALL.REQUEST, postAll),
    ]);
}

export default pageSaga;
