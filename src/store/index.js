import { createStore } from 'redux'

var easy1 = ["", 6, "", 5, 3, 7, "", 4, ""];
var easy2 = [3, "", "", "", 9, "", "", "", 6];
var easy3 = [8, "", 4, "", "", "", 3, "", 7];
var easy4 = ["", 9, "", "", "", "", 7, 1, 3];
var easy5 = ["", 5, 1, "", "", "", 6, 2, ""];
var easy6 = [2, 3, 8, "", "", "", "", 4, ""];
var easy7 = [3, "", 6, "", "", "", 1, "", 2];
var easy8 = [4, "", "", "", 6, "", "", "", 9];
var easy9 = ["", 1, "", 5, 2, 3, "", 8, ""];
var easyBoard = [easy1, easy2, easy3, easy4, easy5, easy6, easy7, easy8, easy9];

class Cell {
    constructor(value) {
        this.value = value;
        this.state = "none"
    }
}

class Section {
    constructor(startingCells) {
        this.cells = [];
        this.state = "none"

        startingCells.forEach((cell) => {
            this.cells.push(new Cell(cell));
        });
    }
}

class Board {
    constructor(startingBoard) {
        this.sections = [];

        startingBoard.forEach((section) => {
            this.sections.push(new Section(section));
        });
    }
}

const initialState = {
    sudokuBoard: new Board(easyBoard)
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_CELL') {
        return Object.assign({}, state, {
            sudokuBoard: {
                sections: state.sudokuBoard.sections.map((section, index) => {
                    if (index === action.payload.sectionNum) {
                        section.cells = section.cells.map((cell, index) => {
                            if (index === action.payload.cellNum) {
                                cell.value = action.payload.value;
                                cell.state = "set"
                            }
                            return cell;
                        })
                    }
                    return section;
                })
            }
        })
    }

    if (action.type === 'GET_SECTION') {
        return Object.assign({}, state, {
            sudokuBoard: {
                sections: state.sudokuBoard.sections.map((section, index) => {
                    if (index === action.payload.sectionNum) {
                        section.cells = section.cells.map((cell) => {
                            cell.state = "viewed"
                            return cell;
                        })
                    } else {                        
                        section.cells = section.cells.map((cell) => {
                            cell.state = "none"
                            return cell;
                        })
                    }
                    return section;
                })
            }
        })
    }

    if (action.type === 'GET_ROW') {
        let rowSections = [];
        let division = Math.floor(action.payload.row/3);

        if (division === 0) {
            rowSections = [0, 1, 2];
        } else if (division === 1) {
            rowSections = [3, 4, 5];
        } else if (division === 2) {
            rowSections = [6, 7, 8];
        }

        return Object.assign({}, state, {
            sudokuBoard: {
                sections: state.sudokuBoard.sections.map((section, index) => {
                    if (rowSections.includes(index)) {
                        section.cells = section.cells.map((cell) => {
                            cell.state = "viewed"
                            return cell;
                        })
                    } else {                        
                        section.cells = section.cells.map((cell) => {
                            cell.state = "none"
                            return cell;
                        })
                    }
                    return section;
                })
            }
        })
    }

    if (action.type === 'GET_COLUMN') {
        return Object.assign({}, state, {
            sudokuBoard: {
                sections: state.sudokuBoard.sections.map((section, index) => {
                    if (index === action.payload.column) {
                        section.cells = section.cells.map((cell) => {
                            cell.state = "viewed"
                            return cell;
                        })
                    } else {                        
                        section.cells = section.cells.map((cell) => {
                            cell.state = "none"
                            return cell;
                        })
                    }
                    return section;
                })
            }
        })
    }

    return state
}

const store = createStore(reducer)

export default store