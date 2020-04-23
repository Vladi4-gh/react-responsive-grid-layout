import React from "react";
import { connect } from "react-redux";
import ReactResponsiveGridLayout from "../../ReactResponsiveGridLayout/components/ReactResponsiveGridLayout";

const DemoPage = ({ mockData }) => (
    <div>
        <ReactResponsiveGridLayout data={mockData} />
    </div>
);

const mapStateToProps = (state) => ({
    mockData: state.mockData
});

export default connect(mapStateToProps)(DemoPage);