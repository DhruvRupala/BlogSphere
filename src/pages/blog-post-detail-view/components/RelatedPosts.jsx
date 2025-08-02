import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedPosts = ({ posts }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (!posts || posts?.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 mb-8">
      <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
        <Icon name="BookOpen" size={24} className="mr-3" />
        Related Posts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link
            key={post?.id}
            to={`/blog-post-detail-view?id=${post?.id}`}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/20"
          >
            {/* Post Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post?.bannerImage}
                alt={post?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                  {post?.category}
                </span>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-150">
                {post?.title}
              </h4>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {post?.excerpt}
              </p>
              
              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={post?.author?.avatar}
                  alt={post?.author?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {post?.author?.name}
                  </p>
                </div>
              </div>
              
              {/* Post Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(post?.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{calculateReadTime(post?.content)} min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} />
                    <span>{post?.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{post?.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;