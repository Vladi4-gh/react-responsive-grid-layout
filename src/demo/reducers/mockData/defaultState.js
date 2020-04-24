import localStorageManager from "../../utils/localStorageManager";

export default {
    currentMockDataSetId: localStorageManager.demoPage.currentMockDataSetId || 1,
    mockDataSets: [
        {
            id: 1,
            name: "Mock Data Set 1",
            items: [
                {
                    id: 1,
                    backgroundColor: "yellow"
                },
                {
                    id: 2,
                    backgroundColor: "yellow"
                },
                {
                    id: 3,
                    backgroundColor: "yellow"
                }
            ]
        },
        {
            id: 2,
            name: "Mock Data Set 2",
            items: [
                {
                    id: 4,
                    backgroundColor: "yellowgreen"
                },
                {
                    id: 5,
                    backgroundColor: "yellowgreen"
                },
                {
                    id: 6,
                    backgroundColor: "yellowgreen"
                }
            ]
        }
    ]
};