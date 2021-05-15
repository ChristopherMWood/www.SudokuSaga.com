import React from 'react';
import 'components/sudokuBoard/index.scss';
import SudokuSection from 'components/sudokuSection';

class SudokuBoard extends React.Component {
    render() {
        let sections = [];

        for (let i = 0; i < 9; i++) {
            sections.push(<SudokuSection key={i} />);
        }

        return <div className="sudoku-board">{sections}</div>;
    }
}

export default SudokuBoard;