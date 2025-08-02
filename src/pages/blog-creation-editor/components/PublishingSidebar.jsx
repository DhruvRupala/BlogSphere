import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PublishingSidebar = ({ 
  postData, 
  onSaveDraft, 
  onPublish, 
  onPreview, 
  isPreviewMode, 
  isSaving = false,
  isPublishing = false,
  lastSaved = null,
  wordCount = 0,
  readTime = 0
}) => {
  const [publishOption, setPublishOption] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'private', label: 'Private', description: 'Only visible to you' },
    { value: 'unlisted', label: 'Unlisted', description: 'Only accessible via direct link' }
  ];

  const publishOptions = [
    { value: 'now', label: 'Publish Now' },
    { value: 'schedule', label: 'Schedule for Later' }
  ];

  const handlePublish = () => {
    const publishData = {
      ...postData,
      publishOption,
      scheduledDate: publishOption === 'schedule' ? scheduledDate : null,
      scheduledTime: publishOption === 'schedule' ? scheduledTime : null
    };
    onPublish(publishData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success';
      case 'draft': return 'text-warning';
      case 'scheduled': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return 'CheckCircle';
      case 'draft': return 'Edit';
      case 'scheduled': return 'Clock';
      default: return 'FileText';
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Post Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Send" size={20} className="mr-2" />
            Publishing
          </h3>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(postData?.status)} 
                size={16} 
                className={getStatusColor(postData?.status)} 
              />
              <span className="text-sm font-medium text-foreground capitalize">
                {postData?.status || 'Draft'}
              </span>
            </div>
            {lastSaved && (
              <span className="text-xs text-muted-foreground">
                Saved {new Date(lastSaved)?.toLocaleTimeString()}
              </span>
            )}
          </div>

          <Select
            label="Visibility"
            options={visibilityOptions}
            value={postData?.visibility || 'public'}
            onChange={(value) => postData?.onVisibilityChange?.(value)}
          />
        </div>

        {/* Publishing Options */}
        <div className="space-y-4">
          <Select
            label="Publish Option"
            options={publishOptions}
            value={publishOption}
            onChange={setPublishOption}
          />

          {publishOption === 'schedule' && (
            <div className="space-y-3">
              <Input
                label="Schedule Date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                required
              />
              <Input
                label="Schedule Time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e?.target?.value)}
                required
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={onSaveDraft}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={onPreview}
            iconName={isPreviewMode ? "Edit" : "Eye"}
            iconPosition="left"
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>

          <Button
            variant="default"
            fullWidth
            onClick={handlePublish}
            loading={isPublishing}
            iconName="Send"
            iconPosition="left"
            disabled={!postData?.title || !postData?.content}
          >
            {isPublishing ? 'Publishing...' : 
             publishOption === 'schedule' ? 'Schedule Post' : 'Publish Now'}
          </Button>
        </div>

        {/* Post Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="BarChart3" size={20} className="mr-2" />
            Statistics
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-lg font-semibold text-foreground">{wordCount}</div>
              <div className="text-xs text-muted-foreground">Words</div>
            </div>
            <div className="p-3 bg-muted rounded-lg text-center">
              <div className="text-lg font-semibold text-foreground">{readTime}</div>
              <div className="text-xs text-muted-foreground">Min Read</div>
            </div>
          </div>
        </div>

        {/* Content Validation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            Content Check
          </h3>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={postData?.title ? "CheckCircle" : "Circle"} 
                size={16} 
                className={postData?.title ? "text-success" : "text-muted-foreground"} 
              />
              <span className="text-sm text-foreground">Title added</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={postData?.content && postData?.content?.length > 100 ? "CheckCircle" : "Circle"} 
                size={16} 
                className={postData?.content && postData?.content?.length > 100 ? "text-success" : "text-muted-foreground"} 
              />
              <span className="text-sm text-foreground">Content (100+ words)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={postData?.category ? "CheckCircle" : "Circle"} 
                size={16} 
                className={postData?.category ? "text-success" : "text-muted-foreground"} 
              />
              <span className="text-sm text-foreground">Category selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={postData?.featuredImage ? "CheckCircle" : "Circle"} 
                size={16} 
                className={postData?.featuredImage ? "text-success" : "text-muted-foreground"} 
              />
              <span className="text-sm text-foreground">Featured image</span>
            </div>
          </div>
        </div>

        {/* Auto-save Status */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Save" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Auto-save enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingSidebar;