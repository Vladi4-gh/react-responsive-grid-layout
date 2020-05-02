import React from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import SettingsBar from "../SettingsBar/component";
import ResponsiveGridLayout from "../../../ResponsiveGridLayout/component";

const DemoPage = ({ mockDataItems }) => (
    <Scrollbars
        className="scrollbars-container"
        autoHide
    >
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
    </Scrollbars>
);

const mapStateToProps = (state) => ({
    mockDataItems: state
        .mockData
        .mockDataSets
        .find((mockDataSet) => mockDataSet.id === state.mockData.currentMockDataSetId)
        .items
});

export default connect(mapStateToProps)(DemoPage);