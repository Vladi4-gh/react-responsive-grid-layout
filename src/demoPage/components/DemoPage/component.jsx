import React from "react";
import { connect } from "react-redux";
import SettingsBar from "../SettingsBar/component";
import ResponsiveGridLayout from "../../../ResponsiveGridLayout/component";

const DemoPage = ({ mockDataItems }) => (
    <div className="demo-page">
        <SettingsBar />
        <ResponsiveGridLayout data={mockDataItems}>
            {mockDataItems.map((mockDataItem, index) => (
                <div
                    key={index}
                    className="content-item"
                >
                    {index + 1}
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