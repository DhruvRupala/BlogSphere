import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlogHeader = ({ post, onShare, onBookmark, isBookmarked }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="relative">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl mb-8">
        <Image
          src={post?.bannerImage}
          alt={post?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Mobile Action Bar */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(post?.id)}
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(post)}
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
          >
            <Icon name="Share2" size={20} />
          </Button>
        </div>
      </div>
      {/* Post Header */}
      <div className="mb-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {post?.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {post?.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>{formatDate(post?.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>{calculateReadTime(post?.content)} min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} />
            <span>{post?.views?.toLocaleString()} views</span>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBookmark(post?.id)}
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            iconPosition="left"
          >
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(post)}
            iconName="Share2"
            iconPosition="left"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;