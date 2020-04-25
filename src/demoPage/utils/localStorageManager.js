const getDemoPageData = () => {
    const itemName = "demoPage";
    const getData = () => {
        const demoPageRawData = localStorage.getItem(itemName);

        return demoPageRawData && JSON.parse(demoPageRawData);
    };
    const setData = (value) => {
        const demoPageRawData = localStorage.getItem(itemName);
        const demoPageData = demoPageRawData ? JSON.parse(demoPageRawData) : {};

        localStorage.setItem(itemName, JSON.stringify({
            ...demoPageData,
            ...value
        }));
    };

    return {
        get currentMockDataSetId() {
            return getData()?.currentMockDataSetId;
        },
        set currentMockDataSetId(currentMockDataSetId) {
            setData({
                currentMockDataSetId
            });
        },
        get isSettingsBarOpened() {
            return getData()?.isSettingsBarOpened;
        },
        set isSettingsBarOpened(isSettingsBarOpened) {
            setData({
                isSettingsBarOpened
            });
        }
    }
};

export default {
    demoPage: getDemoPageData()
};