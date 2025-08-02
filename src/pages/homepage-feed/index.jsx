import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FeaturedPostsCarousel from './components/FeaturedPostsCarousel';
import FilterBar from './components/FilterBar';
import BlogCard from './components/BlogCard';
import Sidebar from './components/Sidebar';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const HomepageFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all');
  const [selectedSort, setSelectedSort] = useState(searchParams?.get('sort') || 'newest');
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    setUser(mockUser);
  }, []);

  // Mock blog posts data
  const mockPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Architecture",
      excerpt: "Learn how to structure large-scale React applications using advanced patterns, state management solutions, and performance optimization techniques that will make your codebase maintainable and efficient.",
      content: `Building scalable React applications requires careful planning and architectural decisions...`,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      category: "Development",
      tags: ["React", "Architecture", "Performance", "JavaScript"],
      readTime: "12 min read",
      publishedAt: "2025-02-01",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      likes: 245,
      comments: 32,
      views: 1850,
      isNew: true
    },
    {
      id: 2,
      title: "The Art of Minimalist Web Design: Less is More",
      excerpt: "Discover the principles of minimalist design and how to create clean, user-friendly interfaces that focus on content and functionality while maintaining visual appeal.",
      content: `Minimalist web design is not just about removing elements...`,
      author: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      category: "Design",
      tags: ["Design", "UI/UX", "Minimalism", "Web Design"],
      readTime: "8 min read",
      publishedAt: "2025-01-31",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      likes: 189,
      comments: 24,
      views: 1240,
      isNew: false
    },
    {
      id: 3,
      title: "Mastering TypeScript: Advanced Types and Patterns",
      excerpt: "Deep dive into TypeScript's advanced type system, exploring utility types, conditional types, and complex patterns that will elevate your development skills.",
      content: `TypeScript's type system is incredibly powerful...`,
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        verified: false
      },
      category: "Technology",
      tags: ["TypeScript", "JavaScript", "Programming", "Types"],
      readTime: "15 min read",
      publishedAt: "2025-01-30",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      likes: 312,
      comments: 45,
      views: 2100,
      isNew: false
    },
    {
      id: 4,
      title: "Sustainable Web Development: Building for the Future",
      excerpt: "Explore eco-friendly development practices, performance optimization techniques, and sustainable coding patterns that reduce environmental impact.",
      content: `Sustainable web development is becoming increasingly important...`,
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      category: "Technology",
      tags: ["Sustainability", "Performance", "Green Tech", "Environment"],
      readTime: "10 min read",
      publishedAt: "2025-01-29",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      likes: 156,
      comments: 18,
      views: 980,
      isNew: false
    },
    {
      id: 5,
      title: "The Psychology of User Experience Design",
      excerpt: "Understanding human psychology and cognitive principles to create intuitive, engaging user experiences that drive conversion and satisfaction.",
      content: `User experience design is deeply rooted in psychology...`,
      author: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        verified: true
      },
      category: "Design",
      tags: ["UX", "Psychology", "Design", "User Research"],
      readTime: "11 min read",
      publishedAt: "2025-01-28",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
      likes: 203,
      comments: 28,
      views: 1350,
      isNew: false
    },
    {
      id: 6,
      title: "Microservices Architecture: Best Practices and Pitfalls",
      excerpt: "Navigate the complexities of microservices architecture with proven strategies, common mistakes to avoid, and implementation best practices.",
      content: `Microservices architecture offers many benefits...`,
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        verified: false
      },
      category: "Technology",
      tags: ["Microservices", "Architecture", "Backend", "DevOps"],
      readTime: "14 min read",
      publishedAt: "2025-01-27",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop",
      likes: 178,
      comments: 35,
      views: 1120,
      isNew: false
    }
  ];

  // Filter and sort posts
  const getFilteredPosts = useCallback(() => {
    let filtered = [...mockPosts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(post => 
        post?.category?.toLowerCase() === selectedCategory?.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(post =>
        post?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        post?.excerpt?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        post?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Sort posts
    switch (selectedSort) {
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.views - a?.views);
        break;
      case 'trending':
        filtered?.sort((a, b) => (b?.likes + b?.comments) - (a?.likes + a?.comments));
        break;
      case 'most-liked':
        filtered?.sort((a, b) => b?.likes - a?.likes);
        break;
      case 'most-commented':
        filtered?.sort((a, b) => b?.comments - a?.comments);
        break;
      default: // newest
        filtered?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    return filtered;
  }, [selectedCategory, selectedSort, searchQuery]);

  // Load posts
  const loadPosts = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
      setPage(1);
    } else {
      setLoading(true);
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredPosts = getFilteredPosts();
      const postsPerPage = 6;
      const startIndex = isRefresh ? 0 : (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = filteredPosts?.slice(startIndex, endIndex);

      if (isRefresh) {
        setPosts(paginatedPosts);
        setPage(2);
      } else {
        setPosts(prev => page === 1 ? paginatedPosts : [...prev, ...paginatedPosts]);
      }

      setHasMore(endIndex < filteredPosts?.length);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, getFilteredPosts]);

  // Load more posts
  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    setPage(prev => prev + 1);
  };

  // Handle like
  const handleLike = async (postId, isLiked) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setPosts(prev => prev?.map(post => 
        post?.id === postId 
          ? { ...post, likes: isLiked ? post?.likes + 1 : post?.likes - 1 }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  };

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (category === 'all') {
        newParams?.delete('category');
      } else {
        newParams?.set('category', category);
      }
      return newParams;
    });
    setPage(1);
    setPosts([]);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (sort === 'newest') {
        newParams?.delete('sort');
      } else {
        newParams?.set('sort', sort);
      }
      return newParams;
    });
    setPage(1);
    setPosts([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (query) {
        newParams?.set('search', query);
      } else {
        newParams?.delete('search');
      }
      return newParams;
    });
    setPage(1);
    setPosts([]);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    // Additional logout logic would go here
  };

  // Load posts when filters change
  useEffect(() => {
    loadPosts();
  }, [selectedCategory, selectedSort, searchQuery]);

  // Load more posts when page changes
  useEffect(() => {
    if (page > 1) {
      loadPosts();
    }
  }, [page]);

  // Pull to refresh handler
  const handleRefresh = () => {
    loadPosts(true);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get empty state type
  const getEmptyStateType = () => {
    if (searchQuery) return 'no-search-results';
    if (selectedCategory !== 'all') return 'no-category-posts';
    return 'no-posts';
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <BreadcrumbNavigation />
          
          {/* Featured Posts Carousel */}
          <FeaturedPostsCarousel />
          
          {/* Filter Bar */}
          <FilterBar
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />
          
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Pull to Refresh Button (Mobile) */}
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                  fullWidth
                >
                  {refreshing ? 'Refreshing...' : 'Refresh Feed'}
                </Button>
              </div>

              {/* Posts Grid */}
              {loading && posts?.length === 0 ? (
                <LoadingSkeleton count={6} />
              ) : posts?.length === 0 ? (
                <EmptyState
                  type={getEmptyStateType()}
                  searchQuery={searchQuery}
                  category={selectedCategory}
                />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {posts?.map((post) => (
                      <BlogCard
                        key={post?.id}
                        post={post}
                        onLike={handleLike}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={loadMorePosts}
                        disabled={loadingMore}
                        loading={loadingMore}
                        iconName="ChevronDown"
                        iconPosition="right"
                      >
                        {loadingMore ? 'Loading...' : 'Load More Posts'}
                      </Button>
                    </div>
                  )}

                  {/* Loading More Skeleton */}
                  {loadingMore && (
                    <div className="mt-8">
                      <LoadingSkeleton count={3} />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </button>
      </main>
    </div>
  );
};

export default HomepageFeed;