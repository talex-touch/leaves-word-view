import React, { useState } from 'react';
import MonacoEditor, { type ChangeHandler, type EditorDidMount } from 'react-monaco-editor';
import './info-style.css'

interface InfoComponentProps {
  data: string; // 接受外界传入的data文本数据
}

const InfoComponent: React.FC<InfoComponentProps> = ({ data }) => {
  const [code, setCode] = useState(data);

  const editorDidMount: EditorDidMount = (editor) => {
    editor.focus();
  };

  const onChange: ChangeHandler = (newValue) => {
    setCode(newValue);
  };

  const options = {
    selectOnLineNumbers: true
  };

  return (
    <div className="WordInfoComponent">
      <MonacoEditor
        width="800"
        height="500"
        language="json"
        theme="vs-light"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div >
  );
};

export default InfoComponent;