import React from 'react';

class SudokuCell extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            cell: props.cell
        };
    }

    render() {
        return (
            <div className="sudoku-cell">
                <input readOnly={true} type="text" value={this.state.cell.value}/>
            </div>
        );
    }
}

export default SudokuCell;