import React from "react";
import { connect } from "react-redux";
import ReactResponsiveGridLayoutSettingsBar from "./ReactResponsiveGridLayoutSettingsBar";
import ReactResponsiveGridLayout from "../../ReactResponsiveGridLayout/components/ReactResponsiveGridLayout";

const DemoPage = ({ mockDataItems }) => (
    <div className="demo-page">
        <ReactResponsiveGridLayoutSettingsBar />
        <ReactResponsiveGridLayout data={mockDataItems} />
    </div>
);

const mapStateToProps = (state) => ({
    mockDataItems: state
        .mockData
        .mockDataSets
        .find((mockDataSet) => mockDataSet.id === state.mockData.currentMockDataSetId)
        .items
});

export default connect(mapStateToProps)(DemoPage);