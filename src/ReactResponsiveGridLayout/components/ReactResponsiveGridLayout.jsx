import React from "react";

const ReactResponsiveGridLayout = ({ data }) => (
    <div>
        {data.map((gridItem) => (
            <div
                key={gridItem.id}
                style={{
                    backgroundColor: gridItem.backgroundColor
                }}
            >
                {gridItem.id}
            </div>
        ))}
    </div>
);

export default ReactResponsiveGridLayout;