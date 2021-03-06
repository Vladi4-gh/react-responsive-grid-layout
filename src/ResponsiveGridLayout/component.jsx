import React, {
    useEffect,
    useRef,
    useState
} from "react";
import { withResizeDetector } from "react-resize-detector";
import random from "random";

// TODO:
// 0. Correct width calculation
// 1. Make item sizes random
// 2. Refactoring
// 3. Amend mock data
// 4. Rewrite all using TypeScript

const ResponsiveGridLayout = (props) => {
    const gridItemAreaPrefix = "i";

    const responsiveGridLayoutRef = useRef(null);

    const columnMaxWidth = 100;

    const renderGridLayoutStyleTag = () => {
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

            const width = props.width ? props.width : responsiveGridLayoutRef.current?.clientWidth ?? 1;

            columnAmount = Math.ceil(width / columnMaxWidth);
            rowHeight = width / columnAmount;

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

        let rowHeight = columnMaxWidth;
        let columnAmount = 1;
        let gridTemplateAreas = calculateGridTemplateAreas();

        return {
            display: `${props.width ? "grid" : "none"}`,
            gridAutoRows: `${rowHeight}px`,
            gridTemplateColumns: `repeat(${columnAmount}, 1fr)`,
            gridTemplateAreas: gridTemplateAreas
        };
    };

    return (
        <div className="responsive-grid-layout-container">
            <div
                ref={responsiveGridLayoutRef}
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
        </div>
    );
};

export default withResizeDetector(ResponsiveGridLayout, {
    handleWidth: true,
    refreshMode: "throttle",
    refreshRate: 100
});