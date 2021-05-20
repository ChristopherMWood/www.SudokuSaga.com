import { createStore } from 'redux'

var easy1 = [null, 6, null, 5, 3, 7, null, 4, null];
var easy2 = [3, null, null, null, 9, null, null, null, 6];
var easy3 = [8, null, 4, null, null, null, 3, null, 7];
var easy4 = [null, 9, null, null, null, null, 7, 1, 3];
var easy5 = [null, 5, 1, null, null, null, 6, 2, null];
var easy6 = [2, 3, 8, null, null, null, null, 4, null];
var easy7 = [3, null, 6, null, null, null, 1, null, 2];
var easy8 = [4, null, null, null, 6, null, null, null, 9];
var easy9 = [null, 1, null, 5, 2, 3, null, 8, null];
var easyBoard = [easy1, easy2, easy3, easy4, easy5, easy6, easy7, easy8, easy9];

class Cell {
    constructor(value) {
        this.value = value;
    }
}

class Section {
    constructor(startingCells) {
        this.cells = [];

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
            //DO ACTION HERE
            posts: state.posts.concat(action.payload)
        })
    }

    return state
}

const store = createStore(reducer)

export default store