import React from "react";
import { connect } from "react-redux";
import { setCurrentMockDataSetId } from "../actions/mockData";

class ReactResponsiveGridLayoutSettingsBar extends React.Component {
    state = {
        isSettingsBarOpened: false
    }

    renderOpenSettingsBarButton = () => {
        const onClick = () => {
            this.setState(() => ({
                isSettingsBarOpened: true
            }));
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
            this.props.setCurrentMockDataSetId(+e.target.value);
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