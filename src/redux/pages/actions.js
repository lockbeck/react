import {createRoutine} from "redux-saga-routines";

const GET_ALL = createRoutine("GET_ALL");
const GET_ONE = createRoutine("GET_ONE");
const POST_ALL = createRoutine("POST_ALL");
const GET_DATA = createRoutine("GET_DATA");

export default {
    GET_ALL,
    GET_ONE,
    GET_DATA,
    POST_ALL
}
