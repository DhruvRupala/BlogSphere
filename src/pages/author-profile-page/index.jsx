import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AuthorHeader from './components/AuthorHeader';
import TabNavigation from './components/TabNavigation';
import FilterControls from './components/FilterControls';
import BlogCard from './components/BlogCard';
import AboutSection from './components/AboutSection';
import AuthorSidebar from './components/AuthorSidebar';

import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AuthorProfilePage = () => {
  const [searchParams] = useSearchParams();
  const authorId = searchParams?.get('id') || '1';
  
  const [activeTab, setActiveTab] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock current user (in real app, this would come from auth context)
  useEffect(() => {
    const mockUser = {
      id: '2',
      name: 'Current User',
      email: 'user@example.com'
    };
    setCurrentUser(mockUser);
  }, []);

  // Mock author data
  const author = {
    id: authorId,
    name: 'Sarah Johnson',
    bio: 'Tech enthusiast and full-stack developer passionate about creating innovative solutions and sharing knowledge with the community.',
    extendedBio: `Sarah Johnson is a seasoned full-stack developer with over 8 years of experience in building scalable web applications. She specializes in React, Node.js, and cloud technologies.\n\nSarah is passionate about sharing her knowledge through technical writing and has helped thousands of developers improve their skills. When she's not coding, you can find her hiking, reading sci-fi novels, or experimenting with new recipes.`,avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    isVerified: true,
    followers: 12500,
    totalPosts: 87,
    totalViews: 245000,
    totalLikes: 18500,
    joinedDate: '2021-03-15',
    isFollowing: false,
    socialLinks: [
      { platform: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/sarahjohnson' },
      { platform: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/in/sarahjohnson' },
      { platform: 'GitHub', icon: 'Github', url: 'https://github.com/sarahjohnson' },
      { platform: 'Website', icon: 'Globe', url: 'https://sarahjohnson.dev' }
    ],
    achievements: [
      {
        title: 'Top Writer',description: 'Recognized as a top writer in Technology category',icon: 'Award',date: '2024-01-15'
      },
      {
        title: '100K+ Views',description: 'Reached over 100,000 total article views',icon: 'Eye',date: '2023-11-20'
      },
      {
        title: 'Community Leader',description: 'Active contributor to open source projects',icon: 'Users',date: '2023-08-10'
      },
      {
        title: 'Featured Author',description: 'Featured on the homepage for exceptional content',icon: 'Star',date: '2023-06-05'
      }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'MongoDB', 'PostgreSQL'],
    contactInfo: {
      email: 'sarah@sarahjohnson.dev',website: 'https://sarahjohnson.dev',location: 'San Francisco, CA'
    }
  };

  // Mock blog posts
  const mockPosts = [
    {
      id: '1',
      title: 'Building Scalable React Applications with TypeScript',
      excerpt: 'Learn how to structure large React applications using TypeScript for better maintainability and developer experience.',
      content: 'This is a comprehensive guide to building scalable React applications...',
      featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      category: 'React',
      tags: ['React', 'TypeScript', 'Architecture'],
      publishedAt: '2024-07-28T10:00:00Z',
      views: 15420,
      likes: 892,
      comments: 67,
      author: author
    },
    {
      id: '2',
      title: 'Mastering Async/Await in JavaScript',
      excerpt: 'Deep dive into asynchronous JavaScript programming with practical examples and best practices.',
      content: 'Asynchronous programming is a fundamental concept in JavaScript...',
      featuredImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
      category: 'JavaScript',
      tags: ['JavaScript', 'Async', 'Promises'],
      publishedAt: '2024-07-25T14:30:00Z',
      views: 12350,
      likes: 743,
      comments: 45,
      author: author
    },
    {
      id: '3',
      title: 'Docker for Frontend Developers',
      excerpt: 'A practical guide to using Docker in frontend development workflows for consistent environments.',
      content: 'Docker has revolutionized how we deploy and manage applications...',
      featuredImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop',
      category: 'DevOps',
      tags: ['Docker', 'DevOps', 'Frontend'],
      publishedAt: '2024-07-22T09:15:00Z',
      views: 9870,
      likes: 567,
      comments: 32,
      author: author
    },
    {
      id: '4',
      title: 'GraphQL vs REST: When to Use What',
      excerpt: 'Compare GraphQL and REST APIs to make informed decisions for your next project.',
      content: 'The debate between GraphQL and REST continues in the developer community...',
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      category: 'API',
      tags: ['GraphQL', 'REST', 'API Design'],
      publishedAt: '2024-07-20T16:45:00Z',
      views: 18750,
      likes: 1205,
      comments: 89,
      author: author
    },
    {
      id: '5',
      title: 'State Management in React: Redux vs Context',
      excerpt: 'Explore different state management solutions in React and learn when to use each approach.',
      content: 'State management is one of the most important aspects of React development...',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      category: 'React',
      tags: ['React', 'Redux', 'Context API'],
      publishedAt: '2024-07-18T11:20:00Z',
      views: 14200,
      likes: 856,
      comments: 54,
      author: author
    },
    {
      id: '6',
      title: 'CSS Grid vs Flexbox: A Complete Guide',
      excerpt: 'Master CSS layout with this comprehensive comparison of Grid and Flexbox properties.',
      content: 'CSS Grid and Flexbox are powerful layout systems that complement each other...',
      featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox'],
      publishedAt: '2024-07-15T13:10:00Z',
      views: 11500,
      likes: 692,
      comments: 38,
      author: author
    }
  ];

  // Mock categories
  const categories = [
    { name: 'React', slug: 'react' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'DevOps', slug: 'devops' },
    { name: 'API', slug: 'api' },
    { name: 'CSS', slug: 'css' }
  ];

  // Mock related authors
  const relatedAuthors = [
    {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      followers: 8500
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      followers: 12000
    },
    {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      followers: 6800
    }
  ];

  // Mock recent activity
  const recentActivity = [
    {
      description: 'Published "Building Scalable React Applications"',
      icon: 'FileText',
      timestamp: '2024-07-28T10:00:00Z'
    },
    {
      description: 'Received 100+ likes on latest post',
      icon: 'Heart',
      timestamp: '2024-07-27T15:30:00Z'
    },
    {
      description: 'Replied to 5 comments',
      icon: 'MessageCircle',
      timestamp: '2024-07-26T09:45:00Z'
    },
    {
      description: 'Gained 50 new followers',
      icon: 'Users',
      timestamp: '2024-07-25T14:20:00Z'
    }
  ];

  // Filter and sort posts based on active tab and filters
  const getFilteredPosts = () => {
    let filteredPosts = [...mockPosts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredPosts = filteredPosts?.filter(post => 
        post?.category?.toLowerCase() === selectedCategory
      );
    }

    // Sort posts
    switch (selectedSort) {
      case 'oldest':
        filteredPosts?.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      case 'most-liked':
        filteredPosts?.sort((a, b) => b?.likes - a?.likes);
        break;
      case 'most-viewed':
        filteredPosts?.sort((a, b) => b?.views - a?.views);
        break;
      case 'newest':
      default:
        filteredPosts?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
    }

    // Filter by tab
    if (activeTab === 'popular') {
      filteredPosts = filteredPosts?.sort((a, b) => (b?.likes + b?.views) - (a?.likes + a?.views));
    }

    return filteredPosts;
  };

  let filteredPosts = getFilteredPosts();
  const postCounts = {
    recent: mockPosts?.length,
    popular: mockPosts?.length
  };

  const handleFollow = async (authorId) => {
    // Mock follow action
    console.log('Following author:', authorId);
  };

  const handleUnfollow = async (authorId) => {
    // Mock unfollow action
    console.log('Unfollowing author:', authorId);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Mock loading more posts
    setTimeout(() => {
      setIsLoading(false);
      setHasMore(false); // For demo purposes
    }, 1000);
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage-feed' },
    { label: 'Authors', path: '/homepage-feed' },
    { label: author?.name, path: `/author-profile-page?id=${authorId}` }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={currentUser} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
          
          {/* Author Header */}
          <AuthorHeader
            author={author}
            currentUser={currentUser}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                postCounts={postCounts}
              />

              {/* Tab Content */}
              {activeTab === 'about' ? (
                <AboutSection author={author} />
              ) : (
                <>
                  {/* Filter Controls */}
                  <FilterControls
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                    categories={categories}
                  />

                  {/* Posts Grid */}
                  {filteredPosts?.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                        {filteredPosts?.map((post) => (
                          <BlogCard key={post?.id} blog={post} />
                        ))}
                      </div>

                      {/* Load More Button */}
                      {hasMore && (
                        <div className="text-center">
                          <Button
                            variant="outline"
                            onClick={handleLoadMore}
                            loading={isLoading}
                            iconName="ChevronDown"
                            iconPosition="right"
                          >
                            Load More Posts
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to see more content.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <AuthorSidebar
                  author={author}
                  relatedAuthors={relatedAuthors}
                  recentActivity={recentActivity}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorProfilePage;