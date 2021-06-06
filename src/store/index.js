import { createStore } from 'redux'
import easyBoard from 'domain/boards/easyBoard'
import mediumBoard from 'domain/boards/mediumBoard'
import hardBoard from 'domain/boards/hardBoard'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
    selectedLevel: 'easy',
    gameWon: false,
    playing: false,
    runInterval: null,
    runMetadata: {
        currentStep: 0,
        calls: {
            setCell: 0,
            getSection: 0,
            getRow: 0,
            getColumn: 0
        }
    },
    sudokuBoard: new Board(easyBoard)
}

const reducer = (state = initialState, action) => {
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
        return ResetBoardToLevel(state, action.payload.board);
    }

    if (action.type === 'PLAY_PAUSE') {
        if (state.playing) {
            clearInterval(state.runInterval);

            return Object.assign({}, state, {
                playing: false,
                runInterval: null
            })
        } else {
            let stepSpeed = action.payload.stepSpeed;

            try {
                let userLoadedScript = document.getElementById("user-code");
                
                if (userLoadedScript) {
                    userLoadedScript.remove();
                }
    
                const template = document.createElement('script');
                template.id = "user-code";
                let cookieCode = cookies.get('userCode')
                template.innerHTML = cookieCode;
                document.body.append(template);
            }
            catch (error) {
                console.log(error.message);
                return;
            }
    
            const runInterval = setInterval(function() {
                window.sudokuSolution.step();
                window.store.dispatch({type: "STEP_TAKEN"});
            }, stepSpeed);

            return Object.assign({}, state, {
                playing: true,
                runInterval: runInterval
            })
        }
    }

    if (action.type === 'STEP_BACK') {
        
    }

    if (action.type === 'STEP_FORWARD') {
        window.sudokuSolution.step();
        // window.store.dispatch({type: "STEP_TAKEN"});
    }

    if (action.type === 'STEP_TAKEN') {
        return Object.assign({}, state, {
            ...state,
            runMetadata: {
                ...state.runMetadata,
                currentStep: state.runMetadata.currentStep + 1
            }
        });
    }
    
    if (action.type === 'RESET_BOARD') {
        return ResetBoardToLevel(state, state.selectedLevel);
    }

    return state
}

function ResetBoardToLevel(state, level) {
    let newBoard;

    if (level === 'easy') {
        newBoard = new Board(easyBoard);
    } else if (level === 'medium') {
        newBoard = new Board(mediumBoard);
    } else if (level === 'hard') {
        newBoard = new Board(hardBoard);
    }

    return Object.assign({}, state, {
        selectedLevel: level,
        gameWon: false,
        playing: false,
        runMetadata: {
            currentStep: 0,
            calls: {
                setCell: 0,
                getSection: 0,
                getRow: 0,
                getColumn: 0
            }
        },
        sudokuBoard: {
            sections: state.sudokuBoard.sections.map((section, sectionIndex) => {
                section.cells = section.cells.map((cell, cellIndex) => {
                    cell.value = newBoard.sections[sectionIndex].cells[cellIndex].value;
                    cell.state = "none";
                    return cell;
                })
                return section;
            })
        }
    });
}

function SetCell(state, action) {
    return Object.assign({}, state, {
        runMetadata: {
            ...state.runMetadata,
            calls: {
                ...state.runMetadata.calls,
                setCell: state.runMetadata.calls.setCell + 1
            }
        },
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
        runMetadata: {
            ...state.runMetadata,
            calls: {
                ...state.runMetadata.calls,
                getSection: state.runMetadata.calls.getSection + 1
            }
        },
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
        runMetadata: {
            ...state.runMetadata,
            calls: {
                ...state.runMetadata.calls,
                getRow: state.runMetadata.calls.getRow + 1
            }
        },
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
        runMetadata: {
            ...state.runMetadata,
            calls: {
                ...state.runMetadata.calls,
                getColumn: state.runMetadata.calls.getColumn + 1
            }
        },
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