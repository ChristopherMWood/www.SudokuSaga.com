class API {
    constructor() {
        this.blockTime = 1000;
    }

    SetCell(section, cell, value) {

        if (!value) {
            value = ""
        }

        window.store.dispatch({
            type: "SET_CELL",
            payload: {
                sectionNum: section,
                cellNum: cell,
                value: value
            }
        });
    }

    GetSection(section) {
        if (section < 0 || section > 8) {
            return null;
        }

        let sectionData = [];

        const state = window.store.getState();
        
        state.sudokuBoard.sections.forEach((sec, index) => {
            if (section === index) {
                sec.cells.forEach((cell) => {
                    sectionData.push(cell.value);
                });
            }
        });

        window.store.dispatch({
            type: "GET_SECTION",
            payload: { 
                section: section
            }
        });

        return sectionData;
    }

    GetRow(row) {
        if (row < 0 || row > 8) {
            return null;
        }

        let rowData = [];

        let rowOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        let sectionDivision = Math.floor(row/3);
        let rowSections = rowOptions[sectionDivision];
        
        let cellDivision = Math.floor(row % 3);
        let rowCells = rowOptions[cellDivision];

        const state = window.store.getState();
        
        state.sudokuBoard.sections.forEach((section, index) => {
            if (rowSections.includes(index)) {
                section.cells.forEach((cell, index) => {
                    if (rowCells.includes(index)) {
                        rowData.push(cell.value);
                    }
                });
            }
        });

        window.store.dispatch({
            type: "GET_ROW",
            payload: { 
                row: row
            }
        });

        return rowData;
    }

    async GetColumn(column) {
        if (column < 0 || column > 8) {
            return null;
        }

        let columnData = [];

        let columnOptions = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
        let sectionDivision = Math.floor(column/3);
        let columnSections = columnOptions[sectionDivision];
        
        let cellDivision = Math.floor(column % 3);
        let columnCells = columnOptions[cellDivision];

        const state = window.store.getState();
        
        state.sudokuBoard.sections.forEach((section, index) => {
            if (columnSections.includes(index)) {
                section.cells.forEach((cell, index) => {
                    if (columnCells.includes(index)) {
                        columnData.push(cell.value);
                    }
                });
            }
        });

        window.store.dispatch({
            type: "GET_COLUMN",
            payload: { 
                column: column
            }
        });

        return columnData;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
 }

export default API
