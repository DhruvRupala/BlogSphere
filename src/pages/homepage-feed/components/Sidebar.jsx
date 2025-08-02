import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const Sidebar = () => {
  const trendingTopics = [
    { name: 'React 18', count: 1250, trend: 'up' },
    { name: 'Web3 Development', count: 890, trend: 'up' },
    { name: 'AI Integration', count: 756, trend: 'up' },
    { name: 'Design Systems', count: 634, trend: 'down' },
    { name: 'Performance Optimization', count: 523, trend: 'up' },
    { name: 'TypeScript', count: 445, trend: 'stable' },
    { name: 'Mobile Development', count: 398, trend: 'up' },
    { name: 'Cloud Computing', count: 367, trend: 'down' }
  ];

  const featuredAuthors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Senior Frontend Developer at Google",
      followers: 12500,
      posts: 45,
      verified: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Design System Lead at Figma",
      followers: 8900,
      posts: 32,
      verified: true
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Full Stack Engineer & Tech Writer",
      followers: 6700,
      posts: 28,
      verified: false
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "CTO at StartupXYZ",
      followers: 5400,
      posts: 19,
      verified: true
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'down': return <Icon name="TrendingDown" size={14} className="text-error" />;
      default: return <Icon name="Minus" size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <aside className="space-y-6">
      {/* Newsletter Signup */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Mail" size={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg text-foreground mb-2">Stay Updated</h3>
          <p className="text-muted-foreground text-sm">
            Get the latest blog posts and tech insights delivered to your inbox weekly.
          </p>
        </div>
        
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="text-center"
          />
          <Button variant="default" fullWidth>
            Subscribe
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          No spam, unsubscribe anytime. 25,000+ developers trust us.
        </p>
      </div>
      {/* Trending Topics */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="font-bold text-lg text-foreground">Trending Topics</h3>
        </div>
        
        <div className="space-y-3">
          {trendingTopics?.map((topic, index) => (
            <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 -mx-2 px-2 py-2 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground w-4">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {topic?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(topic?.count)} posts
                  </p>
                </div>
              </div>
              {getTrendIcon(topic?.trend)}
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" fullWidth className="mt-4">
          View All Topics
        </Button>
      </div>
      {/* Featured Authors */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-bold text-lg text-foreground">Featured Authors</h3>
        </div>
        
        <div className="space-y-4">
          {featuredAuthors?.map((author) => (
            <div key={author?.id} className="flex items-start space-x-3 group">
              <Link to="/author-profile-page" className="flex-shrink-0">
                <Image
                  src={author?.avatar}
                  alt={author?.name}
                  className="w-12 h-12 rounded-full border border-border group-hover:border-primary transition-colors duration-200"
                />
              </Link>
              
              <div className="flex-1 min-w-0">
                <Link to="/author-profile-page" className="block">
                  <div className="flex items-center space-x-1 mb-1">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {author?.name}
                    </h4>
                    {author?.verified && (
                      <Icon name="BadgeCheck" size={14} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {author?.bio}
                  </p>
                </Link>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatNumber(author?.followers)} followers</span>
                  <span>{author?.posts} posts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" fullWidth className="mt-4">
          Discover More Authors
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-bold text-lg text-foreground">Community Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">2.5K</p>
            <p className="text-xs text-muted-foreground">Active Writers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">15.2K</p>
            <p className="text-xs text-muted-foreground">Published Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">89K</p>
            <p className="text-xs text-muted-foreground">Monthly Readers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">156K</p>
            <p className="text-xs text-muted-foreground">Total Likes</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;