import React from 'react';
import SudokuCell from 'components/sudokuCell';

class SudokuSection extends React.Component {
    render() {
        let cells = [];

        for (let i = 0; i < 9; i++) {
            cells.push(<SudokuCell key={i} />);
        }

        return <div className="sudoku-section">{cells}</div>;
    }
}

export default SudokuSection;