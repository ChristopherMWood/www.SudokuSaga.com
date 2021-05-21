import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import 'components/codeEditor/index.scss';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark"

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
    constructor() {
        super();
        this.state = {
            theme: "solarized_dark",
            fontSize: "12px",
            code: defaultCode
        }

        this.fontSizedChanged = this.fontSizedChanged.bind(this);
        this.themeChanged = this.themeChanged.bind(this);
        this.runCode = this.runCode.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    runCode(event) {
        let userLoadedScript = document.getElementById("user-code");
        
        if (userLoadedScript) {
            userLoadedScript.remove();
        }

        const template = document.createElement('script');
        template.id = "user-code";
        template.innerHTML = this.state.code;
        document.body.append(template);
    }

    fontSizedChanged(event) {
        this.setState({
            fontSize: event.target.value
        });
    }

    themeChanged(event) {
        this.setState({
            theme: event.target.value
        });
    }

    onChange(newValue) {
        this.setState({
            code: newValue
        });
    }

    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-controls">
                    <button onClick={this.runCode}>Run</button>
                    <select onChange={this.fontSizedChanged} name="font-size" id="font-size">
                        <option value="12px">12px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="24px">24px</option>
                    </select>

                    <select onChange={this.themeChanged} name="theme" id="theme">
                        <option value="solarized_dark">Solarized Dark</option>
                        <option value="github">Github</option>
                    </select>
                </div>
                <div className="code-container">
                    <AceEditor
                        defaultValue={defaultCode}
                        mode="javascript"
                        theme={this.state.theme}
                        fontSize={this.state.fontSize}
                        // height="inherit"
                        onChange={this.onChange}
                        name="code_editor"
                        editorProps={{ $blockScrolling: true }}
                    />
                </div>
            </div>
        );
    }
}

export default CodeEditor;