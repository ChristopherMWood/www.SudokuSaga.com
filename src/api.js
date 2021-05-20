class API {
    constructor(store) {
        this.store = store;
    }

    SetCell(section, cell, value) {
        if (!value) {
            value = ""
        }

        this.store.dispatch({
            type: "SET_CELL",
            payload: {
                sectionNum: section,
                cellNum: cell,
                value: value
            }
        });
    }

    GetSection(section) {
        let sectionData = [];

        const state = this.store.getState();
        
        state.sudokuBoard.sections.forEach((sec, index) => {
            if (section === index) {
                sec.cells.forEach((cell) => {
                    sectionData.push(cell.value);
                });
            }
        });

        return sectionData;
    }

    GetRow(row) {
        let rowData = [];

        let rowOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        let sectionDivision = Math.floor(row/3);
        let rowSections = rowOptions[sectionDivision];
        
        let cellDivision = Math.floor(row % 3);
        let rowCells = rowOptions[cellDivision];

        const state = this.store.getState();
        
        state.sudokuBoard.sections.forEach((section, index) => {
            if (rowSections.includes(index)) {
                section.cells.forEach((cell, index) => {
                    if (rowCells.includes(index)) {
                        rowData.push(cell.value);
                    }
                });
            }
        });

        this.store.dispatch({
            type: "GET_ROW",
            payload: { 
                row: row
            }
        });

        return rowData;
    }

    GetColumn(column) {
        let columnData = [];

        let columnOptions = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
        let sectionDivision = Math.floor(column/3);
        let columnSections = columnOptions[sectionDivision];
        
        let cellDivision = Math.floor(column % 3);
        let columnCells = columnOptions[cellDivision];

        const state = this.store.getState();
        
        state.sudokuBoard.sections.forEach((section, index) => {
            if (columnSections.includes(index)) {
                section.cells.forEach((cell, index) => {
                    if (columnCells.includes(index)) {
                        columnData.push(cell.value);
                    }
                });
            }
        });

        this.store.dispatch({
            type: "GET_COLUMN",
            payload: { 
                column: column
            }
        });

        return columnData;
    }
 }

export default API

// var visualizationTime = 200;
// var gridService;

// function getCell(row, column) {
//     ValidateInput(row);
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();
    
//     var cell = $("#cell-" + row + '-' + column);

//     if (settings.algorithmVisualizationEnabled())
//         $(cell).css("background-color", actionColor);

//     addToScore(1);
//     return gridService.getCell(row, column);
// }

// function getGrid(row, column) {
//     ValidateInput(row);
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();

//     var gridCount = (row / 3) + ((column + 3) % 3);
//     if (settings.algorithmVisualizationEnabled())
//         $(".grid" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);

//     addToScore(1);
//     return gridService.getGrid(row, column);
// }

// function getRow(row) {
//     ValidateInput(row);
//     clearAllHighlightsToDefaults();

//     if (settings.algorithmVisualizationEnabled())
//         $(".row" + row).css("background-color", actionColor).delay(visualizationTime);

//     addToScore(1);
//     return gridService.getRow(row);
// }

// function getColumn(column) {
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();

//     if (settings.algorithmVisualizationEnabled())
//         $(".column" + column).css("background-color", actionColor).delay(visualizationTime);

//     addToScore(1);
//     return gridService.getColumn(column);;
// }

// function clearCell(row, column) {
//     ValidateInput(row);
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();
    
//     var cell = $("#cell-" + row + '-' + column);

//     if (settings.algorithmVisualizationEnabled())
//         $(cell).css("background-color", errorColor).delay(visualizationTime);

//     if (gridService.getCell(row, column) != null)
//         addToScore(5);
//     else
//         addToScore(10);

//     gridService.clearCell(row, column);
// }

// function setCell(row, column, value) {
//     ValidateInput(row);
//     ValidateInput(column);
//     ValidateValueInput(value);
//     clearAllHighlightsToDefaults();

//     var cell = $("#cell-" + row + '-' + column);
//     var cellAlreadySet = gridService.getCell(row, column) != null;

//     if (settings.algorithmVisualizationEnabled())
//     {
//         if (cellAlreadySet)
//             $(cell).css("background-color", errorColor).delay(visualizationTime);
//         else
//             $(cell).css("background-color", placementColor).delay(visualizationTime);
//     }

//     if (cellAlreadySet) {
//         addToScore(10);
//     }
//     else {
//         addToScore(-5);
//         filledInCells++;
//     }

//     gridService.setCell(row, column, value);
//     $(cell).text(value);
// }

// function isValueInRow(row, value) {
//     ValidateValueInput(value);
//     ValidateInput(row);
//     clearAllHighlightsToDefaults();

//     var found = gridService.isValueInRow(row, value);;

//     if (settings.algorithmVisualizationEnabled())
//     {
//         if (found)
//             $(".row" + row).css("background-color", placementColor).delay(visualizationTime);
//         else
//             $(".row" + row).css("background-color", actionColor).delay(visualizationTime);
//     }

//     addToScore(1);
//     return found;
// }

// function isValueInColumn(column, value) {
//     ValidateValueInput(value);
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();

//     var found = gridService.isValueInColumn(column, value);

//     if (settings.algorithmVisualizationEnabled())
//     {
//         if (found)
//             $(".column" + column).css("background-color", placementColor).delay(visualizationTime);
//         else
//             $(".column" + column).css("background-color", actionColor).delay(visualizationTime);
//     }

//     addToScore(1);
//     return found;
// }

// function isValueInGrid(row, column, value) {
//     ValidateValueInput(value);
//     ValidateInput(row);
//     ValidateInput(column);
//     clearAllHighlightsToDefaults();

//     var isInGrid = gridService.isValueInGrid(row, column, value);

//     if (settings.algorithmVisualizationEnabled())
//     {
//         if (isInGrid)
//             $("#grid-" + row + '-' + column).css("background-color", placementColor).delay(visualizationTime);
//         else
//             $("#grid-" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);
//     }

//     addToScore(1);
//     return isInGrid;
// }