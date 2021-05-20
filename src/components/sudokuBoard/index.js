import React from 'react';
import SudokuSection from 'components/sudokuSection';
import { connect } from 'react-redux'

class SudokuBoard extends React.Component {
    render() {
        return (
        <div className="sudoku-board">
            {this.props.sudokuBoard.sections.map((section, i) => {
                return <SudokuSection key={i} section={section} />;
            })}
        </div>);
    }
}

const mapStateToProps = state => {
    return { sudokuBoard: state.sudokuBoard }
  }

export default connect(mapStateToProps)(SudokuBoard);