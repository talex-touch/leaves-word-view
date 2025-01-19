import React, { useState } from 'react';
import MonacoEditor, { type ChangeHandler, type EditorDidMount } from 'react-monaco-editor';
import './info-style.css'

interface InfoComponentProps {
  data: string;
  onChange?: (newValue: string) => void;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ data, onChange }) => {
  const [code, setCode] = useState(data);

  const editorDidMount: EditorDidMount = (editor) => {
    editor.focus();
  };

  const onInnerChange: ChangeHandler = (newValue) => {
    setCode(newValue);
    onChange?.(newValue);
  };

  const options = {
    formatOnPaste: true,
    formatOnType: true,
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
        onChange={onInnerChange}
        editorDidMount={editorDidMount}
      />
    </div >
  );
};

export default InfoComponent;