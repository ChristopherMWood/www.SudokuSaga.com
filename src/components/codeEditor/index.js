import React from 'react';
import AceEditor from "react-ace";
import Cookies from 'universal-cookie';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark"
import './styles.scss';

const cookies = new Cookies();

let defaultCode = 
`/*
Read the docs and create your solution
*/
sudokuSolution = (function () {
    let solution = {};

    solution.step = function () {
        //This code is called every step when run
    };

    return solution;
}());`;

class CodeEditor extends React.Component {
    constructor() {
        super();

        let cookieCode = cookies.get('userCode')

        console.log(cookieCode);

        if (!cookieCode) {
            cookieCode = defaultCode;
        }

        this.state = {
            theme: "solarized_dark",
            fontSize: "12px",
            code: cookieCode
        }

        this.fontSizedChanged = this.fontSizedChanged.bind(this);
        this.themeChanged = this.themeChanged.bind(this);
        this.runCode = this.runCode.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    runCode(event) {
        let gameWon = false;

        if (!gameWon) {
            try {
                let userLoadedScript = document.getElementById("user-code");
                
                if (userLoadedScript) {
                    userLoadedScript.remove();
                }

                const template = document.createElement('script');
                template.id = "user-code";
                template.innerHTML = this.state.code;
                document.body.append(template);

                window.sudokuSolution.step();
            }
            catch (error) {
                console.log(error.message);
            }
        }
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

        cookies.set('userCode', newValue, { path: '/' });
    }

    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-controls">
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
                        defaultValue={this.state.code}
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