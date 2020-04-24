import defaultState from "./defaultState";

export default (state = defaultState, action) => {
    switch (action.type) {
        case "SET_CURRENT_MOCK_DATA_SET_ID":
            return {
                ...state,
                currentMockDataSetId: action.payload.id
            };
        default:
            return state;
    }
};