import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BlogCard = ({ blog, showAuthor = false }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Featured Image */}
      {blog?.featuredImage && (
        <Link to={`/blog-post-detail-view?id=${blog?.id}`} className="block">
          <div className="aspect-video overflow-hidden">
            <Image
              src={blog?.featuredImage}
              alt={blog?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {blog?.category}
          </span>
          <time className="text-sm text-muted-foreground" dateTime={blog?.publishedAt}>
            {formatDate(blog?.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <Link to={`/blog-post-detail-view?id=${blog?.id}`} className="block mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-2">
            {blog?.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {blog?.excerpt}
        </p>

        {/* Author Info (if showAuthor is true) */}
        {showAuthor && blog?.author && (
          <div className="flex items-center mb-4">
            <Image
              src={blog?.author?.avatar}
              alt={blog?.author?.name}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
            <Link
              to={`/author-profile-page?id=${blog?.author?.id}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
            >
              {blog?.author?.name}
            </Link>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={16} />
              <span>{blog?.views?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Heart" size={16} />
              <span>{blog?.likes?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageCircle" size={16} />
              <span>{blog?.comments?.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-xs">{formatReadTime(blog?.content)}</span>
        </div>

        {/* Tags */}
        {blog?.tags && blog?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            {blog?.tags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{blog?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;