import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RichTextEditor = ({ 
  content, 
  onChange, 
  onImageInsert, 
  placeholder = "Start writing your blog post...",
  readOnly = false 
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const toolbarButtons = [
    { name: 'Bold', icon: 'Bold', command: 'bold' },
    { name: 'Italic', icon: 'Italic', command: 'italic' },
    { name: 'Underline', icon: 'Underline', command: 'underline' },
    { name: 'Strikethrough', icon: 'Strikethrough', command: 'strikethrough' },
    { type: 'separator' },
    { name: 'Heading 1', icon: 'Heading1', command: 'formatBlock', value: 'h1' },
    { name: 'Heading 2', icon: 'Heading2', command: 'formatBlock', value: 'h2' },
    { name: 'Heading 3', icon: 'Heading3', command: 'formatBlock', value: 'h3' },
    { name: 'Paragraph', icon: 'Type', command: 'formatBlock', value: 'p' },
    { type: 'separator' },
    { name: 'Bullet List', icon: 'List', command: 'insertUnorderedList' },
    { name: 'Numbered List', icon: 'ListOrdered', command: 'insertOrderedList' },
    { name: 'Quote', icon: 'Quote', command: 'formatBlock', value: 'blockquote' },
    { name: 'Code', icon: 'Code', command: 'formatBlock', value: 'pre' },
    { type: 'separator' },
    { name: 'Link', icon: 'Link', action: 'link' },
    { name: 'Image', icon: 'Image', action: 'image' },
    { type: 'separator' },
    { name: 'Undo', icon: 'Undo', command: 'undo' },
    { name: 'Redo', icon: 'Redo', command: 'redo' }
  ];

  useEffect(() => {
    if (editorRef?.current && content !== editorRef?.current?.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef?.current?.focus();
    handleContentChange();
  };

  const handleAction = (action) => {
    switch (action) {
      case 'link':
        handleLinkAction();
        break;
      case 'image':
        fileInputRef?.current?.click();
        break;
      default:
        break;
    }
  };

  const handleLinkAction = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount > 0) {
      setSelectedText(selection?.toString());
      setLinkText(selection?.toString());
      setShowLinkDialog(true);
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${linkText || linkUrl}</a>`;
      document.execCommand('insertHTML', false, linkHtml);
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
      handleContentChange();
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file && onImageInsert) {
      onImageInsert(file, (imageUrl) => {
        const imageHtml = `<img src="${imageUrl}" alt="Uploaded image" class="max-w-full h-auto rounded-lg my-4" />`;
        document.execCommand('insertHTML', false, imageHtml);
        handleContentChange();
      });
    }
  };

  const handleContentChange = () => {
    if (editorRef?.current && onChange) {
      onChange(editorRef?.current?.innerHTML);
    }
  };

  const handleKeyDown = (e) => {
    // Handle keyboard shortcuts
    if (e?.ctrlKey || e?.metaKey) {
      switch (e?.key) {
        case 'b':
          e?.preventDefault();
          handleCommand('bold');
          break;
        case 'i':
          e?.preventDefault();
          handleCommand('italic');
          break;
        case 'u':
          e?.preventDefault();
          handleCommand('underline');
          break;
        case 'k':
          e?.preventDefault();
          handleLinkAction();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Toolbar */}
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-border bg-muted/30">
          {toolbarButtons?.map((button, index) => {
            if (button?.type === 'separator') {
              return <div key={index} className="w-px h-6 bg-border mx-1" />;
            }

            return (
              <Button
                key={button?.name}
                variant="ghost"
                size="sm"
                onClick={() => 
                  button?.action 
                    ? handleAction(button?.action)
                    : handleCommand(button?.command, button?.value)
                }
                title={button?.name}
                className="h-8 w-8 p-0"
              >
                <Icon name={button?.icon} size={16} />
              </Button>
            );
          })}
        </div>
      )}
      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          className="min-h-full p-6 text-foreground focus:outline-none prose prose-invert max-w-none"
          style={{
            lineHeight: '1.7',
            fontSize: '16px'
          }}
          onInput={handleContentChange}
          onKeyDown={handleKeyDown}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />
      </div>
      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Insert Link</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Link Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e?.target?.value)}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                  placeholder="Link text"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e?.target?.value)}
                  className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl('');
                  setLinkText('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={insertLink}
                disabled={!linkUrl}
              >
                Insert Link
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Editor Styles */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgb(156 163 175);
          pointer-events: none;
        }
        
        .prose h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 1rem 0; }
        .prose h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.75rem 0; }
        .prose h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem 0; }
        .prose p { margin: 0.75rem 0; }
        .prose blockquote { 
          border-left: 4px solid rgb(99 102 241); 
          padding-left: 1rem; 
          margin: 1rem 0; 
          font-style: italic;
          color: rgb(156 163 175);
        }
        .prose pre { 
          background: rgb(30 41 59); 
          padding: 1rem; 
          border-radius: 0.5rem; 
          margin: 1rem 0;
          font-family: 'JetBrains Mono', monospace;
          overflow-x: auto;
        }
        .prose ul, .prose ol { margin: 0.75rem 0; padding-left: 1.5rem; }
        .prose li { margin: 0.25rem 0; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;