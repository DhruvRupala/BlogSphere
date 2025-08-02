import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import EditorSidebar from './components/EditorSidebar';
import PublishingSidebar from './components/PublishingSidebar';
import RichTextEditor from './components/RichTextEditor';
import MobileEditorSheet from './components/MobileEditorSheet';
import PreviewMode from './components/PreviewMode';

const BlogCreationEditor = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Editor state
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    slug: '',
    featuredImage: '',
    visibility: 'public',
    status: 'draft'
  });

  const [editorState, setEditorState] = useState({
    isPreviewMode: false,
    isSaving: false,
    isPublishing: false,
    isUploading: false,
    lastSaved: null,
    wordCount: 0,
    readTime: 0,
    showMobileSheet: false,
    mobileSheetTab: 'settings',
    sidebarCollapsed: false
  });

  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (postData?.title || postData?.content) {
      setEditorState(prev => ({ ...prev, isSaving: true }));
      
      // Simulate auto-save
      setTimeout(() => {
        setEditorState(prev => ({ 
          ...prev, 
          isSaving: false, 
          lastSaved: new Date() 
        }));
      }, 1000);
    }
  }, [postData?.title, postData?.content]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  // Calculate word count and read time
  useEffect(() => {
    const textContent = postData?.content?.replace(/<[^>]*>/g, '');
    const words = textContent?.split(/\s+/)?.filter(word => word?.length > 0);
    const wordCount = words?.length;
    const readTime = Math.ceil(wordCount / 200); // 200 words per minute

    setEditorState(prev => ({ ...prev, wordCount, readTime }));
  }, [postData?.content]);

  const handlePostDataChange = (newData) => {
    setPostData(newData);
  };

  const handleContentChange = (content) => {
    setPostData(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async (file, callback) => {
    setEditorState(prev => ({ ...prev, isUploading: true }));
    
    // Simulate image upload to Cloudinary
    setTimeout(() => {
      const mockImageUrl = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop`;
      
      if (callback) {
        callback(mockImageUrl);
      } else {
        setPostData(prev => ({ ...prev, featuredImage: mockImageUrl }));
      }
      
      setEditorState(prev => ({ ...prev, isUploading: false }));
    }, 2000);
  };

  const handleSaveDraft = () => {
    setEditorState(prev => ({ ...prev, isSaving: true }));
    
    setTimeout(() => {
      setPostData(prev => ({ ...prev, status: 'draft' }));
      setEditorState(prev => ({ 
        ...prev, 
        isSaving: false, 
        lastSaved: new Date() 
      }));
    }, 1000);
  };

  const handlePublish = (publishData) => {
    setEditorState(prev => ({ ...prev, isPublishing: true }));
    
    setTimeout(() => {
      setPostData(prev => ({ 
        ...prev, 
        status: publishData?.publishOption === 'schedule' ? 'scheduled' : 'published',
        publishedAt: publishData?.publishOption === 'now' ? new Date() : null,
        scheduledFor: publishData?.publishOption === 'schedule' 
          ? new Date(`${publishData.scheduledDate}T${publishData.scheduledTime}`) 
          : null
      }));
      
      setEditorState(prev => ({ 
        ...prev, 
        isPublishing: false,
        showMobileSheet: false
      }));

      // Navigate to published post or dashboard
      if (publishData?.publishOption === 'now') {
        navigate('/blog-post-detail-view');
      }
    }, 2000);
  };

  const handlePreview = () => {
    setEditorState(prev => ({ 
      ...prev, 
      isPreviewMode: !prev?.isPreviewMode,
      showMobileSheet: false
    }));
  };

  const handleLogout = () => {
    navigate('/user-authentication-login-register');
  };

  const toggleSidebar = () => {
    setEditorState(prev => ({ ...prev, sidebarCollapsed: !prev?.sidebarCollapsed }));
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage-feed' },
    { label: 'Create Blog', path: '/blog-creation-editor' }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 's':
            e?.preventDefault();
            handleSaveDraft();
            break;
          case 'p':
            e?.preventDefault();
            handlePreview();
            break;
          case 'Enter':
            if (e?.shiftKey) {
              e?.preventDefault();
              handlePublish({ publishOption: 'now' });
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={mockUser} onLogout={handleLogout} />
      <div className="pt-16">
        {editorState?.isPreviewMode ? (
          <PreviewMode postData={postData} />
        ) : (
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Left Sidebar - Editor Settings */}
            <div className={`hidden lg:block transition-all duration-300 ${
              editorState?.sidebarCollapsed ? 'w-0' : 'w-80'
            }`}>
              {!editorState?.sidebarCollapsed && (
                <EditorSidebar
                  postData={postData}
                  onPostDataChange={handlePostDataChange}
                  onImageUpload={handleImageUpload}
                  isUploading={editorState?.isUploading}
                />
              )}
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-card/50">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="hidden lg:flex"
                  >
                    <Icon name={editorState?.sidebarCollapsed ? "PanelLeft" : "PanelLeftClose"} size={20} />
                  </Button>

                  <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
                </div>

                <div className="flex items-center space-x-2">
                  {editorState?.lastSaved && (
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      Saved {editorState?.lastSaved?.toLocaleTimeString()}
                    </span>
                  )}

                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <span>{editorState?.wordCount} words</span>
                    <span>•</span>
                    <span>{editorState?.readTime} min read</span>
                  </div>

                  {/* Mobile Controls */}
                  <div className="flex items-center space-x-2 lg:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditorState(prev => ({ 
                        ...prev, 
                        showMobileSheet: true, 
                        mobileSheetTab: 'settings' 
                      }))}
                      iconName="Settings"
                    >
                      Settings
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setEditorState(prev => ({ 
                        ...prev, 
                        showMobileSheet: true, 
                        mobileSheetTab: 'publish' 
                      }))}
                      iconName="Send"
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="flex-1">
                <RichTextEditor
                  content={postData?.content}
                  onChange={handleContentChange}
                  onImageInsert={handleImageUpload}
                  placeholder="Start writing your blog post..."
                />
              </div>
            </div>

            {/* Right Sidebar - Publishing Controls */}
            <div className="hidden lg:block w-80">
              <PublishingSidebar
                postData={postData}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
                onPreview={handlePreview}
                isPreviewMode={editorState?.isPreviewMode}
                isSaving={editorState?.isSaving}
                isPublishing={editorState?.isPublishing}
                lastSaved={editorState?.lastSaved}
                wordCount={editorState?.wordCount}
                readTime={editorState?.readTime}
              />
            </div>
          </div>
        )}

        {/* Mobile Bottom Sheet */}
        <MobileEditorSheet
          isOpen={editorState?.showMobileSheet}
          onClose={() => setEditorState(prev => ({ ...prev, showMobileSheet: false }))}
          activeTab={editorState?.mobileSheetTab}
          postData={postData}
          onPostDataChange={handlePostDataChange}
          onImageUpload={handleImageUpload}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          onPreview={handlePreview}
          isPreviewMode={editorState?.isPreviewMode}
          isSaving={editorState?.isSaving}
          isPublishing={editorState?.isPublishing}
          lastSaved={editorState?.lastSaved}
          wordCount={editorState?.wordCount}
          readTime={editorState?.readTime}
          isUploading={editorState?.isUploading}
        />

        {/* Floating Action Button for Mobile */}
        {!editorState?.showMobileSheet && (
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              variant="default"
              size="lg"
              onClick={() => setEditorState(prev => ({ 
                ...prev, 
                showMobileSheet: true, 
                mobileSheetTab: 'publish' 
              }))}
              className="rounded-full shadow-lg"
              iconName="Send"
            >
              Publish
            </Button>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 left-4 hidden lg:block">
          <div className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
            <div className="space-y-1">
              <div>Ctrl+S: Save Draft</div>
              <div>Ctrl+P: Preview</div>
              <div>Ctrl+Shift+Enter: Publish</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreationEditor;