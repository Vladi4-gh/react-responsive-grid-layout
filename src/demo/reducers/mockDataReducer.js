const mockDataDefaultState = "Mock Data";

export default (state = mockDataDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};