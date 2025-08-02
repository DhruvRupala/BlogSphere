import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthorHeader = ({ author, currentUser, onFollow, onUnfollow }) => {
  const [isFollowing, setIsFollowing] = useState(author?.isFollowing || false);
  const [followerCount, setFollowerCount] = useState(author?.followers || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    if (!currentUser) {
      // Redirect to login
      window.location.href = '/user-authentication-login-register';
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        await onUnfollow(author?.id);
        setIsFollowing(false);
        setFollowerCount(prev => prev - 1);
      } else {
        await onFollow(author?.id);
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Follow action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="relative">
            <Image
              src={author?.avatar}
              alt={`${author?.name}'s profile picture`}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            />
            {author?.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                <Icon name="Check" size={16} color="white" />
              </div>
            )}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">{author?.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{author?.bio}</p>
            
            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{followerCount?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{author?.totalPosts?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{author?.totalViews?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </div>
            </div>

            {/* Social Links */}
            {author?.socialLinks && author?.socialLinks?.length > 0 && (
              <div className="flex justify-center lg:justify-start gap-3 mb-4">
                {author?.socialLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150"
                    title={link?.platform}
                  >
                    <Icon name={link?.icon} size={20} className="text-muted-foreground hover:text-foreground" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Follow Button */}
          {currentUser && currentUser?.id !== author?.id && (
            <div className="flex justify-center lg:justify-start">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={handleFollowToggle}
                loading={isLoading}
                iconName={isFollowing ? "UserMinus" : "UserPlus"}
                iconPosition="left"
                className="min-w-[120px]"
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Join Date */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Joined {new Date(author.joinedDate)?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorHeader;