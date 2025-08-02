import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'no-posts', searchQuery = '', category = '' }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-search-results':
        return {
          icon: 'Search',
          title: 'No posts found',
          description: `We couldn't find any posts matching "${searchQuery}". Try adjusting your search terms or browse all posts.`,
          actionText: 'Clear Search',
          actionIcon: 'X'
        };
      
      case 'no-category-posts':
        return {
          icon: 'FolderOpen',
          title: 'No posts in this category',
          description: `There are no posts in the "${category}" category yet. Check back later or explore other categories.`,
          actionText: 'View All Categories',
          actionIcon: 'Grid3X3'
        };
      
      case 'network-error':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          description: 'Unable to load posts. Please check your internet connection and try again.',
          actionText: 'Retry',
          actionIcon: 'RefreshCw'
        };
      
      default:
        return {
          icon: 'FileText',
          title: 'No posts available',
          description: 'There are no blog posts to display at the moment. Be the first to share your thoughts!',
          actionText: 'Create Post',
          actionIcon: 'Plus'
        };
    }
  };

  const { icon, title, description, actionText, actionIcon } = getEmptyStateContent();

  const handleAction = () => {
    switch (type) {
      case 'no-search-results':
        // Clear search - this would be handled by parent component
        break;
      case 'no-category-posts':
        // Show all categories - this would be handled by parent component
        break;
      case 'network-error':
        // Retry loading - this would be handled by parent component
        window.location?.reload();
        break;
      default:
        // Navigate to create post
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={icon} size={48} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {type === 'no-posts' ? (
          <Link to="/blog-creation-editor">
            <Button
              variant="default"
              iconName={actionIcon}
              iconPosition="left"
            >
              {actionText}
            </Button>
          </Link>
        ) : (
          <Button
            variant="default"
            onClick={handleAction}
            iconName={actionIcon}
            iconPosition="left"
          >
            {actionText}
          </Button>
        )}
        
        <Link to="/homepage-feed">
          <Button variant="outline">
            Browse All Posts
          </Button>
        </Link>
      </div>
      
      {/* Additional suggestions */}
      <div className="mt-12 p-6 bg-card border border-border rounded-xl max-w-md">
        <h4 className="font-semibold text-foreground mb-3">Suggestions</h4>
        <ul className="text-sm text-muted-foreground space-y-2 text-left">
          <li className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
            <span>Try different search keywords</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
            <span>Browse trending topics</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
            <span>Follow featured authors</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
            <span>Check back later for new content</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyState;