import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentsSection = ({ comments, user, onAddComment, onReply, onLikeComment }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState({});

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (newComment?.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (e, commentId) => {
    e?.preventDefault();
    if (replyText?.trim()) {
      onReply(commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev?.[commentId]
    }));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInHours = Math.floor((now - commentDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return commentDate?.toLocaleDateString();
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-12' : ''} mb-6`}>
      <div className="flex space-x-3">
        <Link to={`/author-profile-page?id=${comment?.author?.id}`} className="flex-shrink-0">
          <Image
            src={comment?.author?.avatar}
            alt={comment?.author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Link 
                  to={`/author-profile-page?id=${comment?.author?.id}`}
                  className="font-medium text-foreground hover:text-primary transition-colors duration-150"
                >
                  {comment?.author?.name}
                </Link>
                {comment?.author?.isVerified && (
                  <Icon name="BadgeCheck" size={16} className="text-primary" />
                )}
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(comment?.createdAt)}
                </span>
              </div>
            </div>
            
            <p className="text-foreground text-sm leading-relaxed mb-3">
              {comment?.content}
            </p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLikeComment(comment?.id)}
                className="text-muted-foreground hover:text-red-500 p-0 h-auto"
              >
                <Icon name="Heart" size={14} className="mr-1" />
                <span className="text-xs">{comment?.likes}</span>
              </Button>
              
              {!isReply && user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                  className="text-muted-foreground hover:text-primary p-0 h-auto"
                >
                  <Icon name="MessageCircle" size={14} className="mr-1" />
                  <span className="text-xs">Reply</span>
                </Button>
              )}
            </div>
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment?.id && user && (
            <form onSubmit={(e) => handleSubmitReply(e, comment?.id)} className="mt-3 ml-3">
              <div className="flex space-x-3">
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Reply to ${comment?.author?.name}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e?.target?.value)}
                    className="mb-2"
                  />
                  <div className="flex items-center space-x-2">
                    <Button type="submit" size="sm" disabled={!replyText?.trim()}>
                      Reply
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {/* Replies */}
          {comment?.replies && comment?.replies?.length > 0 && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleReplies(comment?.id)}
                className="text-primary hover:text-primary/80 p-0 h-auto mb-3"
              >
                <Icon 
                  name={showReplies?.[comment?.id] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="mr-1" 
                />
                <span className="text-xs">
                  {showReplies?.[comment?.id] ? 'Hide' : 'Show'} {comment?.replies?.length} replies
                </span>
              </Button>
              
              {showReplies?.[comment?.id] && (
                <div className="space-y-4">
                  {comment?.replies?.map((reply) => (
                    <CommentItem key={reply?.id} comment={reply} isReply={true} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 mb-20 md:mb-8">
      <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
        <Icon name="MessageCircle" size={24} className="mr-3" />
        Comments ({comments?.length})
      </h3>
      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-4">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="mb-3"
              />
              <Button 
                type="submit" 
                disabled={!newComment?.trim()}
                iconName="Send"
                iconPosition="right"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 mb-8 text-center">
          <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-lg font-medium text-foreground mb-2">Join the conversation</h4>
          <p className="text-muted-foreground mb-4">Sign in to share your thoughts and engage with the community.</p>
          <Link to="/user-authentication-login-register">
            <Button>Sign In to Comment</Button>
          </Link>
        </div>
      )}
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <CommentItem key={comment?.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-lg font-medium text-foreground mb-2">No comments yet</h4>
            <p className="text-muted-foreground">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;