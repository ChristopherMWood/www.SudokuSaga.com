import React from 'react';
import SudokuCell from 'components/sudokuCell';
import './styles.scss';

class SudokuSection extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            section: props.section
        };
    }

    render() {
        return (
        <div className="sudoku-section">
            {this.state.section.cells.map((cell, i) => {
                return <SudokuCell key={i} cell={cell} />;
            })}
        </div>);
    }
}

export default SudokuSection;