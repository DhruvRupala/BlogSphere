import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedPostsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the cutting-edge technologies and frameworks that will shape web development in the coming year, from AI integration to advanced performance optimization.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      category: "Technology",
      readTime: "8 min read",
      publishedAt: "2025-01-30",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
      likes: 234,
      comments: 45,
      views: 1250
    },
    {
      id: 2,
      title: "Building Sustainable Design Systems at Scale",
      excerpt: "Learn how to create and maintain design systems that grow with your organization while ensuring consistency and developer experience.",
      author: {
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      category: "Design",
      readTime: "12 min read",
      publishedAt: "2025-01-29",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      likes: 189,
      comments: 32,
      views: 890
    },
    {
      id: 3,
      title: "Mastering React Performance: Advanced Optimization Techniques",
      excerpt: "Deep dive into React performance optimization strategies that can dramatically improve your application\'s speed and user experience.",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      category: "Development",
      readTime: "15 min read",
      publishedAt: "2025-01-28",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      likes: 312,
      comments: 67,
      views: 1580
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts?.length) % featuredPosts?.length);
  };

  return (
    <div className="relative mb-8">
      {/* Desktop Carousel */}
      <div className="hidden lg:block relative overflow-hidden rounded-xl bg-card border border-border">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredPosts?.map((post) => (
            <div key={post?.id} className="w-full flex-shrink-0 relative">
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="max-w-4xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                        {post?.category}
                      </span>
                      <span className="text-white/80 text-sm">{post?.readTime}</span>
                      <span className="text-white/80 text-sm">
                        {new Date(post.publishedAt)?.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Link 
                      to="/blog-post-detail-view"
                      className="block group"
                    >
                      <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                        {post?.title}
                      </h2>
                      <p className="text-white/90 text-lg mb-4 line-clamp-2">
                        {post?.excerpt}
                      </p>
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to="/author-profile-page"
                        className="flex items-center space-x-3 group"
                      >
                        <Image
                          src={post?.author?.avatar}
                          alt={post?.author?.name}
                          className="w-10 h-10 rounded-full border-2 border-white/20"
                        />
                        <span className="text-white font-medium group-hover:text-primary transition-colors duration-200">
                          {post?.author?.name}
                        </span>
                      </Link>
                      
                      <div className="flex items-center space-x-6 text-white/80">
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={16} />
                          <span className="text-sm">{post?.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="MessageCircle" size={16} />
                          <span className="text-sm">{post?.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={16} />
                          <span className="text-sm">{post?.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredPosts?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Mobile Featured Card */}
      <div className="lg:hidden">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={featuredPosts?.[0]?.image}
              alt={featuredPosts?.[0]?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                Featured
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                {featuredPosts?.[0]?.category}
              </span>
              <span className="text-muted-foreground text-xs">{featuredPosts?.[0]?.readTime}</span>
            </div>
            
            <Link to="/blog-post-detail-view" className="block group">
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {featuredPosts?.[0]?.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {featuredPosts?.[0]?.excerpt}
              </p>
            </Link>
            
            <div className="flex items-center justify-between">
              <Link 
                to="/author-profile-page"
                className="flex items-center space-x-2 group"
              >
                <Image
                  src={featuredPosts?.[0]?.author?.avatar}
                  alt={featuredPosts?.[0]?.author?.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  {featuredPosts?.[0]?.author?.name}
                </span>
              </Link>
              
              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={14} />
                  <span className="text-xs">{featuredPosts?.[0]?.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={14} />
                  <span className="text-xs">{featuredPosts?.[0]?.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostsCarousel;