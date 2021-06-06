import React from 'react';
import './styles.scss';

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
            displayClasses += "cell-incorrect"
        }

        //track successful vs unsucessful set

        return (
            <div className="sudoku-cell">
                <input className={displayClasses} readOnly={true} type="text" value={this.state.cell.value}/>
            </div>
        );
    }
}

export default SudokuCell;