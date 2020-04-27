import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurrentMockDataSetId } from "../../store/mockData/actions";
import localStorageManager from "../../utils/localStorageManager";

const SettingsBar = (props) => {
    const [isSettingsBarOpened, setIsSettingsBarOpened] = useState(localStorageManager.demoPage.isSettingsBarOpened || false);

    const renderOpenSettingsBarButton = () => {
        const onClick = () => {
            setIsSettingsBarOpened(true);
            localStorageManager.demoPage.isSettingsBarOpened = true;
        };

        return isSettingsBarOpened ? null : (
            <button
                className="open-settings-bar-button"
                onClick={onClick}
            >
                Current mock data is <span className="current-mock-data-set-name">{props.currentMockDataSet.name}</span>. Click here to change.
            </button>
        );
    }

    const renderCloseSettingsBarButton = () => {
        const onClick = () => {
            setIsSettingsBarOpened(false);
            localStorageManager.demoPage.isSettingsBarOpened = false;
        };

        return (
            <button
                className="close-settings-bar-button"
                onClick={onClick}
            >
                Close
            </button>
        );
    }

    const renderSettingsBar = () => (
        !isSettingsBarOpened ? null : (
            <div className="settings-bar">
                {renderMockDataSetsDropdownList()}
                {renderCloseSettingsBarButton()}
            </div>
        )
    )

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
    }

    return (
        <div className="settings-bar-container">
            {renderSettingsBar()}
            {renderOpenSettingsBarButton()}
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