import React from 'react';
import SudokuSection from 'components/sudokuSection';
import { connect } from 'react-redux'

class SudokuBoard extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            sudokuBoard: props.sudokuBoard
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("BOARD UPDATED");
    }

    render() {
        return (
        <div className="sudoku-board">
            {this.state.sudokuBoard.sections.map((section, i) => {
                return <SudokuSection key={i} section={section} />;
            })}
        </div>);
    }
}

const mapStateToProps = state => {
    return { sudokuBoard: state.sudokuBoard }
  }

export default connect(mapStateToProps)(SudokuBoard);