import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import PageReducer from "./pages/reducers";

export default combineReducers({
    Auth,
    PageReducer,
});
