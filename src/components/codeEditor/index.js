import React from 'react';
import AceEditor from "react-ace";
import 'components/codeEditor/index.scss';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";


let defaultCode = 
`/*
    Read the docs, write your algorithm and see where
    you stack up against others
*/
let sudoku = (function () {
    let saga = {};
    
    saga.iteration = function () {
        //This code runs every step
    };
    
    return saga;
}());`;

class CodeEditor extends React.Component {
    constructor(props) {
        super(props)
        this.code = defaultCode;
        this.state = {
            code: defaultCode
        }
    }

    onChange(newValue) {
        // this.setState({
        //     code: newValue
        // });
    }
    
    loadAndRun() {
        // document.getElementById('customScript').html('<script>' + this.code + '<\/script>');
        //$('#customScript').html('<script>' + code + '<\/script>');
    }

    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-controls">
                    <button onClick={this.loadAndRun}>Run Code</button>
                </div>
                <div className="code-container">
                    <AceEditor
                        defaultValue={defaultCode}
                        mode="javascript"
                        onChange={this.onChange}
                        name="code_editor"
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
                <script>{defaultCode}</script>
            </div>
        );
    }
}

export default CodeEditor;