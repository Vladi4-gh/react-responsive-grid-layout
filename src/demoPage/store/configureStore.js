import {
    createStore,
    combineReducers
} from "redux";
import mockDataReducer from "./mockData/reducer";

export default () => (
    createStore(
        combineReducers({
            mockData: mockDataReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);