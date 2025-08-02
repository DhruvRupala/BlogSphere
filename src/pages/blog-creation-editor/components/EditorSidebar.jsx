import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EditorSidebar = ({ 
  postData, 
  onPostDataChange, 
  onImageUpload, 
  isUploading = false 
}) => {
  const [dragActive, setDragActive] = useState(false);

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'finance', label: 'Finance' }
  ];

  const handleInputChange = (field, value) => {
    onPostDataChange({ ...postData, [field]: value });
  };

  const handleTagsChange = (value) => {
    const tags = value?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag);
    onPostDataChange({ ...postData, tags });
  };

  const generateSlug = (title) => {
    return title?.toLowerCase()?.replace(/[^a-z0-9\s-]/g, '')?.replace(/\s+/g, '-')?.replace(/-+/g, '-')?.trim();
  };

  const handleTitleChange = (value) => {
    const slug = generateSlug(value);
    onPostDataChange({ 
      ...postData, 
      title: value, 
      slug: slug 
    });
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      onImageUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      onImageUpload(e?.target?.files?.[0]);
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Post Metadata */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Settings" size={20} className="mr-2" />
            Post Settings
          </h3>

          <Input
            label="Post Title"
            type="text"
            placeholder="Enter your blog post title..."
            value={postData?.title}
            onChange={(e) => handleTitleChange(e?.target?.value)}
            required
          />

          <Select
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={postData?.category}
            onChange={(value) => handleInputChange('category', value)}
            required
          />

          <Input
            label="Tags"
            type="text"
            placeholder="technology, react, javascript"
            description="Separate tags with commas"
            value={postData?.tags?.join(', ')}
            onChange={(e) => handleTagsChange(e?.target?.value)}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">SEO Slug</label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">blogosphere.com/</span>
              <Input
                type="text"
                value={postData?.slug}
                onChange={(e) => handleInputChange('slug', e?.target?.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Excerpt</label>
            <textarea
              className="w-full h-20 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Brief description of your post..."
              value={postData?.excerpt}
              onChange={(e) => handleInputChange('excerpt', e?.target?.value)}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Image" size={20} className="mr-2" />
            Featured Image
          </h3>

          {postData?.featuredImage ? (
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={postData?.featuredImage}
                  alt="Featured image"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleInputChange('featuredImage', '')}
                className="absolute top-2 right-2"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop an image here, or click to select
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="featured-image-upload"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('featured-image-upload')?.click()}
                disabled={isUploading}
                loading={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </Button>
            </div>
          )}
        </div>

        {/* SEO Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Search" size={20} className="mr-2" />
            SEO Preview
          </h3>
          
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="text-sm text-primary truncate">
              blogosphere.com/{postData?.slug || 'your-post-slug'}
            </div>
            <div className="text-base font-medium text-foreground line-clamp-2">
              {postData?.title || 'Your Blog Post Title'}
            </div>
            <div className="text-sm text-muted-foreground line-clamp-3">
              {postData?.excerpt || 'Your post excerpt will appear here. Write a compelling description to attract readers.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;