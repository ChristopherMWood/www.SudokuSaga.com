import React from 'react';

class SudokuCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: props.cell
        };
    }

    render() {
        let displayClasses = "sudoku-cell "
        
        if (this.state.cell.state === "viewed") {
            displayClasses += "cell-viewed"
        } else if (this.state.cell.state === "set") {
            displayClasses += "cell-set"
        }

        return (
            <div className="sudoku-cell">
                <input className={displayClasses} readOnly={true} type="text" value={this.state.cell.value}/>
            </div>
        );
    }
}

export default SudokuCell;