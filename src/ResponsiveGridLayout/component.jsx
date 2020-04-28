import React from "react";
import random from "random";

const ResponsiveGridLayout = (props) => {
    const gridItemAreaPrefix = "i";

    const renderGridLayoutStyleTag = () => {
        const columnAmount = 5;

        const calculateGridTemplateAreas = () => {
            const movePositionForInsertion = () => {
                let isPositionFound = false;

                do {
                    if (!gridTemplateAreas[positionForInsertion.row]) {
                        gridTemplateAreas[positionForInsertion.row] = Array(columnAmount).fill(null);
                    }

                    for (let i = positionForInsertion.column; i < columnAmount; i++) {
                        if (gridTemplateAreas[positionForInsertion.row][i] === null) {
                            isPositionFound = true;
                            positionForInsertion.column = i;

                            break;
                        }
                    }

                    if (!isPositionFound) {
                        positionForInsertion.column = 0;
                        positionForInsertion.row++;
                    }
                } while (!isPositionFound);
            };

            let gridTemplateAreas = [];
            let positionForInsertion = {
                column: 0,
                row: 0
            };

            props.data.forEach((item, index) => {
                movePositionForInsertion();

                const maxBlockColumnsNumber = random.int(1, 1) || 1;
                const maxBlockRowsNumber = random.int(1, 1) || 1;

                gridTemplateAreas[positionForInsertion.row][positionForInsertion.column] = `${gridItemAreaPrefix}${index}`;
            });

            return gridTemplateAreas
                .map(gridTemplateArea => gridTemplateArea
                    .map(gridTemplateAreaItem => gridTemplateAreaItem === null ? "." : gridTemplateAreaItem)
                    .join(" ")
                )
                .reduce((accumulator, currentValue) => accumulator + `"${currentValue}" `, "")
                .trimRight();
        };

        return {
            display: "grid",
            gridAutoRows: "minmax(200px, auto)",
            gridTemplateColumns: `repeat(${columnAmount}, 1fr)`,
            gridTemplateAreas: calculateGridTemplateAreas()
        }
    };

    return (
        <div
            className="responsive-grid-layout"
            style={renderGridLayoutStyleTag()}
        >
            {React.Children.map(props.children, (child, index) => (
                <div
                    className="responsive-grid-layout--item"
                    style={{ gridArea: `${gridItemAreaPrefix}${index}` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default ResponsiveGridLayout;