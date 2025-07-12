"use client";
import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";

import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("codemirror");
    ytext.insert(0, '{\n  "msg": "Hello Yjs + CodeMirror v6!"\n}');

    const state = EditorState.create({
      extensions: [basicSetup, json(), yCollab(ytext, null)],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    ytext.observe(() => {
      console.log("[Yjs] Updated:", ytext.toString());
    });

    return () => {
      view.destroy();
      ydoc.destroy();
    };
  }, []);

  return (
    <div ref={editorRef} style={{ height: 400, border: "1px solid #ccc" }} />
  );
};

export default Editor;
