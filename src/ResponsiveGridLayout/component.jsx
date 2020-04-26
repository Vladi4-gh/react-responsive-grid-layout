import React from "react";

const ResponsiveGridLayout = (props) => (
    <div className="responsive-grid-layout">
        {React.Children.map(props.children, child => (
            <div className="responsive-grid-layout--item">
                {child}
            </div>
        ))}
    </div>
);

export default ResponsiveGridLayout;