import React from "react";

const ResponsiveGridLayout = (props) => (
    <div
        className="responsive-grid-layout"
        style={{
            "grid-template-rows": "repeat(9, 200px)",
            "grid-template-columns": "repeat(5, 1fr)"
        }}
    >
        {React.Children.map(props.children, child => (
            <div className="responsive-grid-layout--item">
                {child}
            </div>
        ))}
    </div>
);

export default ResponsiveGridLayout;