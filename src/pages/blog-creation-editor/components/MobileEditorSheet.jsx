import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import EditorSidebar from './EditorSidebar';
import PublishingSidebar from './PublishingSidebar';

const MobileEditorSheet = ({ 
  isOpen, 
  onClose, 
  activeTab = 'settings',
  postData,
  onPostDataChange,
  onImageUpload,
  onSaveDraft,
  onPublish,
  onPreview,
  isPreviewMode,
  isSaving,
  isPublishing,
  lastSaved,
  wordCount,
  readTime,
  isUploading
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const tabs = [
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'publish', label: 'Publish', icon: 'Send' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-xl md:hidden animate-slide-up">
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center space-x-1">
            {tabs?.map((tab) => (
              <Button
                key={tab?.id}
                variant={currentTab === tab?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentTab(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
              >
                {tab?.label}
              </Button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {currentTab === 'settings' && (
            <div className="p-4">
              <EditorSidebar
                postData={postData}
                onPostDataChange={onPostDataChange}
                onImageUpload={onImageUpload}
                isUploading={isUploading}
              />
            </div>
          )}

          {currentTab === 'publish' && (
            <div className="p-4">
              <PublishingSidebar
                postData={postData}
                onSaveDraft={onSaveDraft}
                onPublish={onPublish}
                onPreview={onPreview}
                isPreviewMode={isPreviewMode}
                isSaving={isSaving}
                isPublishing={isPublishing}
                lastSaved={lastSaved}
                wordCount={wordCount}
                readTime={readTime}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileEditorSheet;