import React from 'react';
import SudokuSection from 'components/sudokuSection';
import { connect } from 'react-redux'
import './styles.scss';

function SudokuBoard(props) {
    return (
    <div className="sudoku-board">
        {props.sudokuBoard.sections.map((section, i) => {
            return <SudokuSection key={i} section={section} />;
        })}
    </div>);
}

const mapStateToProps = state => {
    return { sudokuBoard: state.sudokuBoard }
}

export default connect(mapStateToProps)(SudokuBoard);