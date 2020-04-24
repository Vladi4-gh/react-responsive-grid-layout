import React from "react";
import { connect } from "react-redux";
import { setCurrentMockDataSetId } from "../actions/mockData";
import localStorageManager from "../utils/localStorageManager";

class ReactResponsiveGridLayoutSettingsBar extends React.Component {
    state = {
        isSettingsBarOpened: localStorageManager.demoPage.isSettingsBarOpened || false
    }

    renderOpenSettingsBarButton = () => {
        const onClick = () => {
            this.setState(() => ({
                isSettingsBarOpened: true
            }));
            localStorageManager.demoPage.isSettingsBarOpened = true;
        };

        return this.state.isSettingsBarOpened ? null : (
            <button onClick={onClick}>
                Current mock data is "{this.props.currentMockDataSet.name}". Click here to change.
            </button>
        );
    }

    renderCloseSettingsBarButton = () => {
        const onClick = () => {
            this.setState(() => ({
                isSettingsBarOpened: false
            }));
            localStorageManager.demoPage.isSettingsBarOpened = false;
        };

        return (
            <button onClick={onClick}>
                Close
            </button>
        );
    }

    renderSettingsBar = () => {
        return !this.state.isSettingsBarOpened ? null : (
            <div className="react-responsive-grid-layout-settings-bar">
                {this.renderMockDataSetsDropdownList()}
                {this.renderCloseSettingsBarButton()}
            </div>
        );
    }

    renderMockDataSetsDropdownList = () => {
        const onChange = (e) => {
            const currentMockDataSetId = +e.target.value;

            this.props.setCurrentMockDataSetId(currentMockDataSetId);
            localStorageManager.demoPage.currentMockDataSetId = currentMockDataSetId;
        };

        return (
            <select
                value={this.props.currentMockDataSet.id}
                onChange={onChange}
            >
                {this.props.mockDataSetsInfo.map((mockDataSetInfo) => (
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

    render() {
        return (
            <div className="react-responsive-grid-layout-settings-bar-container">
                {this.renderOpenSettingsBarButton()}
                {this.renderSettingsBar()}
            </div>
        );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactResponsiveGridLayoutSettingsBar);