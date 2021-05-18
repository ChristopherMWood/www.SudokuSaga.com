import React from 'react';
import AceEditor from "react-ace";
import 'components/codeEditor/index.scss';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
    console.log("change", newValue);
}

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
    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-controls">
                    This is the code controls
                </div>
                <div className="code-container">
                    <AceEditor
                        defaultValue={defaultCode}
                        mode="javascript"
                        theme="github"
                        // height="inherit"
                        onChange={onChange}
                        name="code_editor"
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
            </div>
        );
    }
}

export default CodeEditor;