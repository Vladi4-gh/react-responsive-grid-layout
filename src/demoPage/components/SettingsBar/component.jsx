import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classNames";
import { setCurrentMockDataSetId } from "../../store/mockData/actions";
import localStorageManager from "../../utils/localStorageManager";

const SettingsBar = (props) => {
    const [isSettingsBarOpened, setIsSettingsBarOpened] = useState(localStorageManager.demoPage.isSettingsBarOpened || false);

    const renderMockDataSetsDropdownList = () => {
        const onChange = (e) => {
            const currentMockDataSetId = +e.target.value;

            props.setCurrentMockDataSetId(currentMockDataSetId);
            localStorageManager.demoPage.currentMockDataSetId = currentMockDataSetId;
        };

        return (
            <select
                className="mock-data-sets-dropdown-list"
                value={props.currentMockDataSet.id}
                onChange={onChange}
            >
                {props.mockDataSetsInfo.map((mockDataSetInfo) => (
                    <option
                        key={mockDataSetInfo.id}
                        value={mockDataSetInfo.id}
                    >
                        {mockDataSetInfo.name}
                    </option>
                ))}
            </select>
        );
    };

    const renderSettingsBar = () => (
        !isSettingsBarOpened ? null : (
            <div className="settings-bar">
                {renderMockDataSetsDropdownList()}
            </div>
        )
    );

    const renderToggleSettingsBarButton = () => {
        const onClick = () => {
            setIsSettingsBarOpened(!isSettingsBarOpened);
            localStorageManager.demoPage.isSettingsBarOpened = !isSettingsBarOpened;
        };

        return (
            <button
                className={classNames("toggle-settings-bar-button", `toggle-settings-bar-button__${!isSettingsBarOpened ? "open" : "close"}`)}
                onClick={onClick}
            >
                {
                    !isSettingsBarOpened
                    ? (<span>Current mock data is <span className="current-mock-data-set-name">{props.currentMockDataSet.name}</span>. Click here to change.</span>)
                    : (<span>Close</span>)
                }
            </button>
        );
    };

    return (
        <div className="settings-bar-container">
            {renderSettingsBar()}
            {renderToggleSettingsBarButton()}
        </div>
    );
}

const mapStateToProps = (state) => {
    const mockDataSetsInfo = state
        .mockData
        .mockDataSets
        .map((mockDataSet) => ({
            id: mockDataSet.id,
            name: mockDataSet.name
        }));
    const currentMockDataSet = mockDataSetsInfo
        .find((mockDataSetInfo) => mockDataSetInfo.id === state.mockData.currentMockDataSetId);

    return {
        currentMockDataSet,
        mockDataSetsInfo
    };
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentMockDataSetId: (id) => dispatch(setCurrentMockDataSetId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBar);