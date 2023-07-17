import Actions from "./actions";
import {get} from "lodash";

export default function PageReducer(state = {}, action) {


    switch (action.type) {

        case Actions.GET_ALL.REQUEST:
            return ((action, state) => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            ...get(state, `data.${storeName}`, {}),
                            isFetched: false,
                        },
                    },
                };
            })(action, state);


        case Actions.GET_ALL.SUCCESS:
            return ((action, state) => {
                const { result, storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: { result, isFetched: true },
                    },
                };
            })(action, state);




            case Actions.GET_ONE.REQUEST:
                return ((action, state) => {
                    const { storeName } = action.payload;
                    return {
                        ...state,
                        data: {
                            ...get(state, 'data', {}),
                            [storeName]: {
                                ...get(state, `data.${storeName}`, {}),
                                isFetched: false,
                            },
                        },
                    };
                })(action, state);
    
                
            case Actions.GET_ONE.SUCCESS:
                return ((action, state) => {
                    const { result, storeName } = action.payload;
                    return {
                        ...state,
                        data: {
                            ...get(state, 'data', {}),
                            [storeName]: { result, isFetched: true },
                        },
                    };
                })(action, state);


        case Actions.GET_DATA.FAILURE:
            return (() => {
                const { storeName, errors } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            isFetched: true,
                            hasErrors: true,
                            errors,
                        },
                    },
                };
            })();
        case Actions.GET_DATA.TRIGGER:
            return (() => {
                const { storeName } = action.payload;
                return {
                    ...state,
                    data: {
                        ...get(state, 'data', {}),
                        [storeName]: {
                            isFetched: false,
                        },
                    },
                };
            })();
        default:
            return state;
    }
}
