import React, {
    useEffect,
    useRef,
    useState
} from "react";
import random from "random";

// TODO:
// 1. Change column amount on resize
// 2. Make item sizes random
// 3. Refactoring (+ delete old-gallery.js)
// 4. Amend mock data
// 5. Rewrite all using TypeScript

const ResponsiveGridLayout = (props) => {
    const gridItemAreaPrefix = "i";
    const responsiveGridLayoutRef = useRef(null);
    const columnMaxWidth = 100;
    const [columnAmount, setColumnAmount] = useState(1);
    const [columnHeight, setColumnHeight] = useState(columnMaxWidth);

    useEffect(() => {
        setColumnAmount(Math.ceil(responsiveGridLayoutRef.current.clientWidth / columnMaxWidth));
        setColumnHeight(responsiveGridLayoutRef.current.clientWidth / columnAmount);
    });

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
            gridAutoRows: `minmax(${columnHeight}px, ${columnHeight}px)`,
            gridTemplateColumns: `repeat(${columnAmount}, 1fr)`,
            gridTemplateAreas: calculateGridTemplateAreas()
        }
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

export default ResponsiveGridLayout;