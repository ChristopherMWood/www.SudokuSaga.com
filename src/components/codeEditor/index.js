import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
    console.log("change", newValue);
}

class CodeEditor extends React.Component {
    render() {
        return (
            <AceEditor
            mode="javascript"
            theme="github"
            onChange={onChange}
            name="code_editor"
            editorProps={{ $blockScrolling: true }}
          />
        );
    }
}

export default CodeEditor;