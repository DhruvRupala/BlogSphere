import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DraftsPosts = ({ drafts, onDeleteDraft }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDeleteClick = (draftId) => {
    setDeleteConfirm(draftId);
  };

  const handleConfirmDelete = (draftId) => {
    onDeleteDraft(draftId);
    setDeleteConfirm(null);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(date);
  };

  if (!drafts || drafts?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Edit" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No drafts saved</h3>
        <p className="text-muted-foreground mb-6">Your draft posts will appear here as you work on them.</p>
        <Link to="/blog-creation-editor">
          <Button variant="default" iconName="Plus" iconPosition="left">
            Start Writing
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drafts?.map((draft) => (
        <div key={draft?.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Draft Image */}
            <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {draft?.bannerImage ? (
                <Image
                  src={draft?.bannerImage}
                  alt={draft?.title || 'Draft'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Image" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Draft Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {draft?.title || 'Untitled Draft'}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {draft?.excerpt || draft?.content?.substring(0, 150) + '...' || 'No content yet...'}
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full ml-4">
                  <Icon name="Clock" size={12} />
                  <span>Draft</span>
                </div>
              </div>

              {/* Draft Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="Save" size={16} />
                  <span>Last saved {getTimeAgo(draft?.lastSaved)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="FileText" size={16} />
                  <span>{draft?.wordCount || 0} words</span>
                </div>
                {draft?.autoSaved && (
                  <div className="flex items-center gap-1 text-success">
                    <Icon name="Check" size={16} />
                    <span>Auto-saved</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {draft?.tags && draft?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {draft?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {draft?.tags?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{draft?.tags?.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link to={`/blog-creation-editor?draft=${draft?.id}`}>
                  <Button variant="default" size="sm" iconName="Edit" iconPosition="left">
                    Continue Writing
                  </Button>
                </Link>
                
                {deleteConfirm === draft?.id ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleConfirmDelete(draft?.id)}
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
                    onClick={() => handleDeleteClick(draft?.id)}
                    className="text-error hover:text-error"
                  >
                    Delete
                  </Button>
                )}

                <Button variant="outline" size="sm" iconName="Copy" iconPosition="left">
                  Duplicate
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftsPosts;