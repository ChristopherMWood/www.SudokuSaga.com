import React from 'react';
import './styles.scss';
// import {CopyToClipboard} from 'react-copy-to-clipboard';

class Docs extends React.Component {
    constructor() {
        super();

        this.state = {
            value: "",
            copied: false
        }
    }

    render() {
        return (
            <div className="tab-content">
                <h2>How to</h2>
                <p>
                    The step call in the example code is called over and over based on your run settings.
                    Create as many helper function, variables and local states as you want and add your 
                    logic in the step function.
                </p>
                <p>
                    Note: If the step function is called 
                </p>
                <div className="api-endpoint">
                    <h3>Get Row</h3>
                    <p>
                        Get all of the cells for the specified row from left to right.
                    </p>
                    <pre><code><span id='code1'>{"board.GetRow(1);"}</span></code></pre>
                </div>
                <div className="api-endpoint">
                    <h3>Get Column</h3>
                    <p>
                        Get all of the cells for the specified column from top to bottom.
                    </p>
                    <pre><code><span id='code1'>{"board.GetColumn(3);"}</span></code></pre>
                </div>
                <div className="api-endpoint">
                    <h3>Get Section</h3>
                    <p>
                        Get all of the cells for the specified section from left to right and top to bottom.
                    </p>
                    <pre><code><span id='code1'>{"board.GetSection(4);"}</span></code></pre>
                </div>
                <div className="api-endpoint">
                    <h3>Set Cell</h3>
                    <p>
                        Set the value of the specified cell by specifying section, row and column.
                    </p>
                    <pre><code><span id='code1'>{"board.SetCell(1, 2, 4);"}</span></code></pre>
                </div>
            </div>
        );
    }
}

export default Docs;