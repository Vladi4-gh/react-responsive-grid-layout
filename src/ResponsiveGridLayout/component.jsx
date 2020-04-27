import React from "react";

const ResponsiveGridLayout = (props) => {
    return (
        <div
            className="responsive-grid-layout"
            style={{
                gridTemplateRows: "repeat(9, 200px)",
                gridTemplateColumns: "repeat(5, 1fr)"
            }}
        >
            {React.Children.map(props.children, child => (
                <div className="responsive-grid-layout--item">
                    {child}
                </div>
            ))}
        </div>
    );
};

export default ResponsiveGridLayout;