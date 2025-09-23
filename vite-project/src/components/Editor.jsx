import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);

  // 1. Initialize CodeMirror + handle local edits
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code)

        if (typeof onCodeChange === 'function') {
          onCodeChange(code);
        }

        // Only emit when user types (not when setValue runs)
        if (origin !== 'setValue' && socketRef.current) {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
  }, [onCodeChange, roomId, socketRef]);

  // 2. Listen for remote CODE_CHANGE events
  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
      console.log('Received CODE_CHANGE from server:', code);
      if (code != null && editorRef.current) {
        const currentCode = editorRef.current.getValue();
        if (code !== currentCode) {
          // Preserve cursor to avoid jump
          const cursor = editorRef.current.getCursor();
          editorRef.current.setValue(code);
          editorRef.current.setCursor(cursor);
        }
      }
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  }, [socketRef.current]); // 👈 reattach when socketRef.current changes

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
