import React from "react";
import { connect } from "react-redux";
import { setCurrentMockDataSetId } from "../actions/mockData";

class ReactResponsiveGridLayoutSettingsBar extends React.Component {
    constructor() {
        super();

        this.state = {
            isOpened: false
        };
    }

    renderMockDataSetsDropdownList = () => {
        const onChange = (e) => {
            this.props.setCurrentMockDataSetId(+e.target.value);
        };

        return (
            <select
                value={this.props.currentMockDataSetId}
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
            <div className="react-responsive-grid-layout-settings-bar">
                {this.renderMockDataSetsDropdownList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentMockDataSetId: state
        .mockData
        .currentMockDataSetId,
    mockDataSetsInfo: state
        .mockData
        .mockDataSets
        .map((mockDataSet) => ({
            id: mockDataSet.id,
            name: mockDataSet.name
        }))
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentMockDataSetId: (id) => dispatch(setCurrentMockDataSetId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactResponsiveGridLayoutSettingsBar);