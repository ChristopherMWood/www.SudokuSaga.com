import { createStore } from 'redux'
import easyBoard from 'domain/boards/easyBoard'
import mediumBoard from 'domain/boards/mediumBoard'
import hardBoard from 'domain/boards/hardBoard'

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

const reducer = (state = GetInitialState(easyBoard), action) => {
    if (action.type === 'SET_CELL') {
        return SetCell(state, action);
    }

    if (action.type === 'GET_SECTION') {
        return GetSection(state, action);
    }

    if (action.type === 'GET_ROW') {
        return GetRow(state, action);
    }

    if (action.type === 'GET_COLUMN') {
        return GetColumn(state, action);
    }

    if (action.type === 'CHANGE_BOARD') {
        let board = action.payload.board;
        let difficultyBoard;

        if (board === 'easy') {
            difficultyBoard = easyBoard;
        } else if (board === 'medium') {
            difficultyBoard = mediumBoard;
        } else if (board === 'hard') {
            difficultyBoard = hardBoard;
        }

        let newBoard = new Board(difficultyBoard)
        
        return Object.assign({}, state, {
            sudokuBoard: Object.assign({}, state.sudokuBoard, {
                sections: newBoard.sections
            })
        })

        // return Object.assign({}, state, GetInitialState(difficultyBoard))
    }

    if (action.type === 'PLAY_PAUSE') {
        if (state.playing) {
            return Object.assign({}, state, {
                playing: false
            })
        } else {
            let stepSpeed = action.payload.stepSpeed;

            return Object.assign({}, state, {
                playing: true
            })
        }
    }

    if (action.type === 'STEP_BACK') {
        
    }

    if (action.type === 'STEP_FORWARD') {

    }
    
    if (action.type === 'RESET_BOARD') {
        return Object.assign({}, state, GetInitialState(hardBoard))
    }

    return state
}

function GetInitialState(board) {
    return {
        gameWon: false,
        playing: false,
        currentStep: 0,
        sudokuBoard: new Board(board)
    }
}

function SetCell(state, action) {
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

function GetSection(state, action) {
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

function GetRow(state, action) {
    let rowOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    let sectionDivision = Math.floor(action.payload.row/3);
    let rowSections = rowOptions[sectionDivision];
    
    let cellDivision = Math.floor(action.payload.row % 3);
    let rowCells = rowOptions[cellDivision];

    return Object.assign({}, state, {
        sudokuBoard: {
            sections: state.sudokuBoard.sections.map((section, index) => {
                if (rowSections.includes(index)) {
                    section.cells = section.cells.map((cell, index) => {
                        if (rowCells.includes(index)) {
                            cell.state = "viewed"
                        } else {
                            cell.state = "none"
                        }
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

function GetColumn(state, action) {
    let columnOptions = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
    let sectionDivision = Math.floor(action.payload.column/3);
    let rowSections = columnOptions[sectionDivision];

    let cellDivision = Math.floor(action.payload.column % 3);
    let rowCells = columnOptions[cellDivision];

    return Object.assign({}, state, {
        sudokuBoard: {
            sections: state.sudokuBoard.sections.map((section, index) => {
                if (rowSections.includes(index)) {
                    section.cells = section.cells.map((cell, index) => {
                        if (rowCells.includes(index)) {
                            cell.state = "viewed"
                        } else {
                            cell.state = "none"
                        }
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

const store = createStore(reducer)

export default store