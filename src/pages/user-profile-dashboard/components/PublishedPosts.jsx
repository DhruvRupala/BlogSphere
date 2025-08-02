import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublishedPosts = ({ posts, onDeletePost }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (postId) => {
    setDeleteConfirm(postId);
  };

  const handleConfirmDelete = (postId) => {
    onDeletePost(postId);
    setDeleteConfirm(null);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!posts || posts?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No published posts yet</h3>
        <p className="text-muted-foreground mb-6">Start writing your first blog post to see it here.</p>
        <Link to="/blog-creation-editor">
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Your First Post
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <div key={post?.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Post Image */}
            <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={post?.bannerImage || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop`}
                alt={post?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <Link
                    to={`/blog-post-detail-view?id=${post?.id}`}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {post?.title}
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {post?.excerpt || post?.content?.substring(0, 150) + '...'}
                  </p>
                </div>
              </div>

              {/* Post Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  <span>Published {formatDate(post?.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={16} />
                  <span>{post?.views || 0} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Heart" size={16} />
                  <span>{post?.likes || 0} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={16} />
                  <span>{post?.comments || 0} comments</span>
                </div>
              </div>

              {/* Tags */}
              {post?.tags && post?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post?.tags?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{post?.tags?.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link to={`/blog-creation-editor?id=${post?.id}`}>
                  <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                    Edit
                  </Button>
                </Link>
                
                {deleteConfirm === post?.id ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleConfirmDelete(post?.id)}
                    >
                      Confirm Delete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={() => handleDeleteClick(post?.id)}
                    className="text-error hover:text-error"
                  >
                    Delete
                  </Button>
                )}

                <Link to={`/blog-post-detail-view?id=${post?.id}`}>
                  <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublishedPosts;