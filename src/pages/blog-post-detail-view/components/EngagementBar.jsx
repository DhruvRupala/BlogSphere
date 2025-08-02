import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EngagementBar = ({ post, onLike, onShare, onBookmark, isLiked, isBookmarked }) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(post?.likes);

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(post?.id, newLikedState);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark(post?.id, !bookmarked);
  };

  return (
    <>
      {/* Desktop Engagement Bar */}
      <div className="hidden md:flex items-center justify-between py-6 border-t border-b border-border my-8">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`${liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Icon name={liked ? "Heart" : "Heart"} size={20} className="mr-2" />
            {likeCount?.toLocaleString()}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post)}
            className="text-muted-foreground hover:text-primary"
          >
            <Icon name="Share2" size={20} className="mr-2" />
            Share
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`${bookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
          >
            <Icon name={bookmarked ? "Bookmark" : "BookmarkPlus"} size={20} className="mr-2" />
            {bookmarked ? 'Saved' : 'Save'}
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={16} />
            <span>{post?.comments?.toLocaleString()} comments</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} />
            <span>{post?.views?.toLocaleString()} views</span>
          </div>
        </div>
      </div>
      {/* Mobile Floating Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-full px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`${liked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
            >
              <Icon name={liked ? "Heart" : "Heart"} size={20} className="mr-1" />
              <span className="text-xs">{likeCount > 999 ? `${(likeCount / 1000)?.toFixed(1)}k` : likeCount}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`${bookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
            >
              <Icon name={bookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(post)}
              className="text-muted-foreground hover:text-primary"
            >
              <Icon name="Share2" size={20} />
            </Button>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="MessageCircle" size={16} />
              <span>{post?.comments > 999 ? `${(post?.comments / 1000)?.toFixed(1)}k` : post?.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EngagementBar;