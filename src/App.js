import './App.css';
import React, { useState } from 'react';
import { marked } from 'marked';
import useLocalstorage from './useLocalstorage';

const App = () => {
  const [code, setCode] = useLocalstorage('markdownContent', '## Hello');
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [hide, hidePreview] = useState(true);
  const [showDocs, setShowDocs] = useState(false);

  const openMD = () => {
    hidePreview(true);
    setShowDocs(false);
  };

  const openPreview = () => {
    hidePreview(false);
    setShowDocs(false);
  };

  const openDocs = () => {
    hidePreview(false);
    setShowDocs(true);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">MarkDown</button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>Docs</button>
        </div>
        {
          showDocs ? (
            <div>
              <h2>Documentation</h2>
              <p>هنا يمكنك إضافة معلومات أو مستندات إضافية.</p>
            </div>
          ) : hide ? (
            <div>
              <textarea onChange={handleChange} value={code} />
            </div>
          ) : (
            <div>
              <div dangerouslySetInnerHTML={{ __html: compiled }} />
            </div>
          )
        }
      </div>
    </>
  );
};

export default App;