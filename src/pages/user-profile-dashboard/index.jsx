import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProfileHeader from './components/ProfileHeader';
import StatsCards from './components/StatsCards';
import TabNavigation from './components/TabNavigation';
import PublishedPosts from './components/PublishedPosts';
import DraftsPosts from './components/DraftsPosts';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsTab from './components/SettingsTab';
import QuickActions from './components/QuickActions';

const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('published');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    bio: `Passionate full-stack developer and technical writer with 5+ years of experience in React, Node.js, and cloud technologies. I love sharing knowledge through detailed tutorials and insights about modern web development.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open source projects, or hiking in the mountains.`,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    website: "https://alexjohnson.dev",
    twitter: "alexjohnson_dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    followersCount: 1247,
    followingCount: 89,
    joinedDate: "2022-03-15"
  };

  const mockStats = {
    totalPosts: 24,
    totalViews: 45678,
    totalLikes: 1234,
    engagementRate: 8.5
  };

  const mockPublishedPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks: A Comprehensive Guide",
      excerpt: "Learn how to use React Hooks effectively in your applications with practical examples and best practices.",
      content: "React Hooks have revolutionized the way we write React components...",
      bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      publishedAt: "2025-01-28T10:00:00Z",
      views: 1250,
      likes: 89,
      comments: 23,
      tags: ["React", "JavaScript", "Hooks", "Frontend"]
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns Every Developer Should Know",
      excerpt: "Explore advanced JavaScript patterns that will make your code more maintainable and efficient.",
      content: "JavaScript is a versatile language with many powerful patterns...",
      bannerImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
      publishedAt: "2025-01-25T14:30:00Z",
      views: 980,
      likes: 67,
      comments: 18,
      tags: ["JavaScript", "Patterns", "Advanced", "Programming"]
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use Which",
      excerpt: "A detailed comparison of CSS Grid and Flexbox with practical examples and use cases.",
      content: "Both CSS Grid and Flexbox are powerful layout systems...",
      bannerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      publishedAt: "2025-01-22T09:15:00Z",
      views: 875,
      likes: 54,
      comments: 12,
      tags: ["CSS", "Grid", "Flexbox", "Layout"]
    }
  ];

  const mockDrafts = [
    {
      id: 4,
      title: "TypeScript Advanced Topics: Generics and Utility Types",
      excerpt: "Deep dive into TypeScript\'s advanced features that will level up your development skills.",
      content: "TypeScript provides powerful type system features...",
      bannerImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
      lastSaved: "2025-02-01T16:45:00Z",
      wordCount: 1250,
      autoSaved: true,
      tags: ["TypeScript", "Advanced", "Generics"]
    },
    {
      id: 5,
      title: "Building Scalable Node.js Applications",
      excerpt: "Learn how to architect and build Node.js applications that can scale with your business.",
      content: "Scalability is a crucial consideration when building Node.js applications...",
      lastSaved: "2025-01-30T11:20:00Z",
      wordCount: 890,
      autoSaved: false,
      tags: ["Node.js", "Scalability", "Backend"]
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', updatedData);
  };

  const handleDeletePost = (postId) => {
    // Here you would typically make an API call to delete the post
    console.log('Delete post:', postId);
  };

  const handleDeleteDraft = (draftId) => {
    // Here you would typically make an API call to delete the draft
    console.log('Delete draft:', draftId);
  };

  const handleUpdateSettings = (section, data) => {
    // Here you would typically make an API call to update settings
    console.log('Update settings:', section, data);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage-feed' },
    { label: 'Dashboard', path: '/user-profile-dashboard' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation user={user} onLogout={handleLogout} />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'published':
        return <PublishedPosts posts={mockPublishedPosts} onDeletePost={handleDeletePost} />;
      case 'drafts':
        return <DraftsPosts drafts={mockDrafts} onDeleteDraft={handleDeleteDraft} />;
      case 'analytics':
        return <AnalyticsTab analyticsData={{}} />;
      case 'settings':
        return <SettingsTab user={user} onUpdateSettings={handleUpdateSettings} />;
      default:
        return <PublishedPosts posts={mockPublishedPosts} onDeletePost={handleDeletePost} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
          
          <div className="space-y-6">
            {/* Profile Header */}
            <ProfileHeader user={user} onUpdateProfile={handleUpdateProfile} />
            
            {/* Stats Cards */}
            <StatsCards stats={mockStats} />
            
            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Tab Content */}
            <div className="min-h-[400px]">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions FAB */}
      <QuickActions />
    </div>
  );
};

export default UserProfileDashboard;