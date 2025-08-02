import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const AuthorSidebar = ({ author, relatedAuthors, recentActivity }) => {
  return (
    <div className="space-y-6">
      {/* Author Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="FileText" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Posts</span>
            </div>
            <span className="font-medium text-foreground">{author?.totalPosts}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Eye" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Views</span>
            </div>
            <span className="font-medium text-foreground">{author?.totalViews?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Heart" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Likes</span>
            </div>
            <span className="font-medium text-foreground">{author?.totalLikes?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
            <span className="font-medium text-foreground">{author?.followers?.toLocaleString()}</span>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      {recentActivity && recentActivity?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity?.slice(0, 5)?.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 p-1.5 bg-primary/10 rounded-full">
                  <Icon name={activity?.icon} size={12} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    {new Date(activity.timestamp)?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Related Authors */}
      {relatedAuthors && relatedAuthors?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Similar Authors</h3>
          <div className="space-y-4">
            {relatedAuthors?.slice(0, 4)?.map((relatedAuthor) => (
              <Link
                key={relatedAuthor?.id}
                to={`/author-profile-page?id=${relatedAuthor?.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150"
              >
                <Image
                  src={relatedAuthor?.avatar}
                  alt={relatedAuthor?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {relatedAuthor?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {relatedAuthor?.followers?.toLocaleString()} followers
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorSidebar;