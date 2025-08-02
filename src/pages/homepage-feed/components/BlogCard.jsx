import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlogCard = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (isLiking) return;
    
    setIsLiking(true);
    const newLikedState = !isLiked;
    const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
    
    setIsLiked(newLikedState);
    setLikeCount(newLikeCount);
    
    try {
      await onLike(post?.id, newLikedState);
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
      setLikeCount(likeCount);
    } finally {
      setIsLiking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date?.toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to="/blog-post-detail-view" className="block h-full">
          <Image
            src={post?.image}
            alt={post?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
            {post?.category}
          </span>
        </div>
        
        {/* Like Button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            disabled={isLiking}
            className={`w-8 h-8 bg-black/50 hover:bg-black/70 border-0 ${
              isLiked ? 'text-red-500' : 'text-white'
            }`}
          >
            <Icon 
              name={isLiked ? "Heart" : "Heart"} 
              size={16}
              className={isLiked ? 'fill-current' : ''}
            />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link to="/blog-post-detail-view" className="block group/title">
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover/title:text-primary transition-colors duration-200">
            {post?.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post?.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{post?.readTime}</span>
            <span>•</span>
            <span>{formatDate(post?.publishedAt)}</span>
          </div>
          
          {post?.isNew && (
            <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-md">
              New
            </span>
          )}
        </div>

        {/* Author and Engagement */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <Link 
            to="/author-profile-page"
            className="flex items-center space-x-2 group/author"
          >
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.name}
              className="w-8 h-8 rounded-full border border-border"
            />
            <div>
              <p className="text-sm font-medium text-foreground group-hover/author:text-primary transition-colors duration-200">
                {post?.author?.name}
              </p>
              {post?.author?.verified && (
                <div className="flex items-center space-x-1">
                  <Icon name="BadgeCheck" size={12} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Verified</span>
                </div>
              )}
            </div>
          </Link>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span className="text-xs">{formatNumber(likeCount)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span className="text-xs">{formatNumber(post?.comments)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span className="text-xs">{formatNumber(post?.views)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post?.tags && post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
            {post?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-muted/80 cursor-pointer transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
            {post?.tags?.length > 3 && (
              <span className="px-2 py-1 text-muted-foreground text-xs">
                +{post?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;