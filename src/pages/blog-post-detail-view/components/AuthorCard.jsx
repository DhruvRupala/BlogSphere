import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthorCard = ({ author, isFollowing, onFollow }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = () => {
    setFollowing(!following);
    onFollow(author?.id, !following);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-start space-x-4">
        {/* Author Avatar */}
        <Link to={`/author-profile-page?id=${author?.id}`} className="flex-shrink-0">
          <div className="relative">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {author?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </div>
        </Link>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link 
                to={`/author-profile-page?id=${author?.id}`}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors duration-150"
              >
                {author?.name}
              </Link>
              {author?.title && (
                <p className="text-sm text-muted-foreground">{author?.title}</p>
              )}
            </div>
            
            <Button
              variant={following ? "outline" : "default"}
              size="sm"
              onClick={handleFollow}
              iconName={following ? "UserCheck" : "UserPlus"}
              iconPosition="left"
              className="ml-4"
            >
              {following ? 'Following' : 'Follow'}
            </Button>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {author?.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{author?.followers?.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>{author?.postsCount} posts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{author?.totalLikes?.toLocaleString()} likes</span>
            </div>
          </div>
        </div>
      </div>
      {/* Social Links */}
      {author?.socialLinks && author?.socialLinks?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-muted-foreground">Connect:</span>
            {author?.socialLinks?.map((link, index) => (
              <a
                key={index}
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                <Icon name={link?.platform} size={16} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorCard;