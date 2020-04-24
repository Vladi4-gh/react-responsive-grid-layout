import {
    createStore,
    combineReducers
} from "redux";
import mockDataReducer from "../reducers/mockData/mockData";

export default () => (
    createStore(
        combineReducers({
            mockData: mockDataReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);