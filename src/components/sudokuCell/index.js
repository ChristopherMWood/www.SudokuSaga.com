import React from 'react';

class SudokuCell extends React.Component {
    render() {
        return (
        <div className="sudoku-cell">
            <input readOnly={true} type="text" value=""/>
        </div>
        );
    }
}

export default SudokuCell;