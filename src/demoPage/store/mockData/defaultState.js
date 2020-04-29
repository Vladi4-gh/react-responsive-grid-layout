import localStorageManager from "../../utils/localStorageManager";

export default {
    currentMockDataSetId: localStorageManager.demoPage.currentMockDataSetId || 1,
    mockDataSets: [
        {
            id: 1,
            name: "50 Random Blocks",
            items: Array(50).fill({})
        },
        {
            id: 2,
            name: "1000 Random Blocks",
            items: Array(1000).fill({})
        }
    ]
};