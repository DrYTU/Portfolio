import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';

const RichTextEditor = ({ content, setContent }) => {
  const [editorContent, setEditorContent] = useState('');

  // Delta formatındaki JSON string'i HTML'e çeviren bir fonksiyon
  const deltaToHtml = (delta) => {
    const quill = new Quill(document.createElement('div')); // Quill instance oluştur
    quill.setContents(delta); // Delta içeriğini Quill'e koy
    return quill.root.innerHTML; // HTML olarak döndür
  };

  useEffect(() => {
    if (content) {
      try {
        const isJson = content.trim().startsWith('{') || content.trim().startsWith('[');
        if (isJson) {
          const delta = JSON.parse(content); // JSON delta'yı parse et
          const html = deltaToHtml(delta);   // Delta'yı HTML'e çevir
          setEditorContent(html);
        } else {
          setEditorContent(content); // HTML içeriği direkt kullan
        }
      } catch (error) {
        console.error('Delta parsing error:', error);
        setEditorContent(content || ''); // Eğer JSON parse edilemezse gelen içeriği olduğu gibi koy
      }
    }
  }, [content]);

  return (
    <ReactQuill
      className='quill-editor'
      theme="snow"
      value={editorContent}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
        ],
      }}
      style={{width: '100%', marginBottom: "calc(100px - 3vw)" }}
      onChange={(content) => {
        setEditorContent(content);
        setContent(content);
      }}
    />
  );
};

export default RichTextEditor;
