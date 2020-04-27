import React from "react";
import { connect } from "react-redux";
import SettingsBar from "../SettingsBar/component";
import ResponsiveGridLayout from "../../../ResponsiveGridLayout/component";

const DemoPage = ({ mockDataItems }) => (
    <div className="demo-page">
        <SettingsBar />
        <ResponsiveGridLayout>
            {mockDataItems.map((mockDataItem) => (
                <div key={mockDataItem.id}>
                    {mockDataItem.id}
                </div>
            ))}
        </ResponsiveGridLayout>
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