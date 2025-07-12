import { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import { useS3File } from "../../hooks/useS3File";

import {
  EditorContainer,
  // TextArea
} from "./styles";

const Editor = ({ fileName, isEditing, text, onTextChange, reloadKey }) => {
  const { doc, yroot, loading, error } = useS3File(fileName);

  // 觀察 crdt 更新
  useEffect(() => {
    if (!doc || !yroot) return;

    const onUpdate = () => {
      const json = yroot.toJSON();
      console.log("[update]", json);
      onTextChange(JSON.stringify(json, null, 2));
    };

    doc?.on("update", onUpdate);
    return () => {
      doc?.off("update", onUpdate);
    };
  }, [doc, yroot, onTextChange]);

  // 監聽 textarea 變化
  const handleTextareaChange = (val) => {
    const newVal = val;
    onTextChange(newVal);
  };

  if (!fileName) {
    return (
      <EditorContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          📂 Please select a JSON file from the sidebar
        </div>
      </EditorContainer>
    );
  }

  if (loading) {
    return (
      <EditorContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          Loading file…
        </div>
      </EditorContainer>
    );
  }

  if (error) {
    return (
      <EditorContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "#d32f2f" }}>
          Error: {error}
        </div>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <CodeMirror
        key={fileName + "|" + reloadKey}
        value={text}
        editable={isEditing}
        extensions={[json()]}
        onChange={handleTextareaChange}
        theme="light"
      />
    </EditorContainer>
  );
};

export default Editor;
