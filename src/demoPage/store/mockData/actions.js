import actionTypes from "./actionTypes";

export const setCurrentMockDataSetId = (id) => ({
    type: actionTypes.SET_CURRENT_MOCK_DATA_SET_ID,
    payload: { id }
});