import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import BlogHeader from './components/BlogHeader';
import AuthorCard from './components/AuthorCard';
import BlogContent from './components/BlogContent';
import EngagementBar from './components/EngagementBar';
import CommentsSection from './components/CommentsSection';
import RelatedPosts from './components/RelatedPosts';

const BlogPostDetailView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams?.get('id') || '1';
  
  const [user, setUser] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock current user
  useEffect(() => {
    const mockUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    };
    setUser(mockUser);
  }, []);

  // Mock blog post data
  const mockPost = {
    id: postId,
    title: 'The Future of Web Development: Trends and Technologies Shaping 2025',
    slug: 'future-web-development-trends-2025',
    excerpt: 'Explore the cutting-edge technologies and emerging trends that will define web development in 2025, from AI integration to advanced frameworks.',
    content: `<h2 id="introduction">Introduction</h2>
<p>The web development landscape is evolving at an unprecedented pace. As we move into 2025, developers are witnessing a paradigm shift that's reshaping how we build, deploy, and maintain web applications.</p>

<h2 id="ai-integration">AI Integration in Development</h2>
<p>Artificial Intelligence is no longer a futuristic concept—it's becoming an integral part of the development process. From code generation to automated testing, AI tools are revolutionizing how developers work.</p>

<blockquote>
<p>"AI is not replacing developers; it's empowering them to focus on higher-level problem-solving and creative solutions." - Tech Industry Leader</p>
</blockquote>

<h3 id="code-generation">Automated Code Generation</h3>
<p>Tools like GitHub Copilot and ChatGPT are transforming the coding experience, offering intelligent suggestions and generating boilerplate code that saves countless hours of development time.</p>

<h2 id="modern-frameworks">Modern Framework Evolution</h2>
<p>The framework ecosystem continues to mature, with React, Vue, and Angular leading the charge while new contenders like Svelte and Solid.js gain traction.</p>

<h3 id="performance-optimization">Performance-First Approach</h3>
<p>Modern frameworks are prioritizing performance optimization, with features like:</p>
<ul>
<li>Server-side rendering (SSR)</li>
<li>Static site generation (SSG)</li>
<li>Edge computing integration</li>
<li>Advanced bundling techniques</li>
</ul>

<h2 id="web3-integration">Web3 and Blockchain Integration</h2>
<p>The integration of blockchain technology and Web3 concepts is creating new opportunities for decentralized applications and enhanced user ownership of data.</p>

<h2 id="conclusion">Conclusion</h2>
<p>The future of web development is bright, filled with innovative technologies that promise to make development more efficient, applications more performant, and user experiences more engaging. Staying ahead of these trends will be crucial for developers looking to remain competitive in this rapidly evolving field.</p>`,
    bannerImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
    category: 'Technology',
    publishedAt: '2025-01-28T10:00:00Z',
    views: 15420,
    likes: 342,
    comments: 28,
    author: {
      id: 'author-1',
      name: 'Sarah Chen',
      title: 'Senior Full Stack Developer',
      bio: 'Passionate about modern web technologies and developer experience. 8+ years building scalable applications with React, Node.js, and cloud technologies.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      isVerified: true,
      followers: 12500,
      postsCount: 47,
      totalLikes: 8920,
      socialLinks: [
        { platform: 'Twitter', url: 'https://twitter.com/sarahchen' },
        { platform: 'Github', url: 'https://github.com/sarahchen' },
        { platform: 'Linkedin', url: 'https://linkedin.com/in/sarahchen' }
      ]
    },
    tags: ['Web Development', 'Technology', 'AI', 'Frameworks', 'Future Trends'],
    tableOfContents: [
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'ai-integration', title: 'AI Integration in Development', level: 1 },
      { id: 'code-generation', title: 'Automated Code Generation', level: 2 },
      { id: 'modern-frameworks', title: 'Modern Framework Evolution', level: 1 },
      { id: 'performance-optimization', title: 'Performance-First Approach', level: 2 },
      { id: 'web3-integration', title: 'Web3 and Blockchain Integration', level: 1 },
      { id: 'conclusion', title: 'Conclusion', level: 1 }
    ]
  };

  // Mock comments data
  const mockComments = [
    {
      id: 'comment-1',
      content: 'Excellent article! The insights about AI integration are particularly valuable. I\'ve been experimenting with GitHub Copilot and it\'s amazing how much it speeds up development.',
      author: {
        id: 'user-2',
        name: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        isVerified: false
      },
      createdAt: '2025-01-28T14:30:00Z',
      likes: 12,
      replies: [
        {
          id: 'reply-1',
          content: 'I agree! Copilot has been a game-changer for my workflow too. The key is learning how to write good prompts.',
          author: {
            id: 'user-3',
            name: 'Emily Watson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            isVerified: true
          },
          createdAt: '2025-01-28T15:45:00Z',
          likes: 5
        }
      ]
    },
    {
      id: 'comment-2',
      content: 'Great overview of the current trends. I\'m particularly interested in the Web3 integration part. Do you have any recommendations for getting started with blockchain development?',
      author: {
        id: 'user-4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        isVerified: false
      },
      createdAt: '2025-01-28T16:20:00Z',
      likes: 8,
      replies: []
    },
    {
      id: 'comment-3',
      content: 'The performance optimization section is spot on. SSR and SSG have become essential for modern web apps. Thanks for sharing these insights!',
      author: {
        id: 'user-5',
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        isVerified: true
      },
      createdAt: '2025-01-28T17:10:00Z',
      likes: 15,
      replies: []
    }
  ];

  // Mock related posts
  const mockRelatedPosts = [
    {
      id: '2',
      title: 'Building Scalable React Applications: Best Practices for 2025',
      excerpt: 'Learn the essential patterns and practices for building maintainable React applications that scale.',
      bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      category: 'React',
      publishedAt: '2025-01-25T09:00:00Z',
      views: 8920,
      likes: 156,
      content: 'Sample content for read time calculation...',
      author: {
        id: 'author-2',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      }
    },
    {
      id: '3',
      title: 'The Rise of Edge Computing in Web Development',
      excerpt: 'Discover how edge computing is revolutionizing web performance and user experience.',
      bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      category: 'Performance',
      publishedAt: '2025-01-22T11:30:00Z',
      views: 6540,
      likes: 89,
      content: 'Sample content for read time calculation...',
      author: {
        id: 'author-3',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      }
    },
    {
      id: '4',
      title: 'CSS Grid vs Flexbox: When to Use Each in Modern Layouts',
      excerpt: 'A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.',
      bannerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      category: 'CSS',
      publishedAt: '2025-01-20T14:15:00Z',
      views: 4320,
      likes: 67,
      content: 'Sample content for read time calculation...',
      author: {
        id: 'author-4',
        name: 'Tom Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      }
    }
  ];

  // Custom breadcrumbs
  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage-feed' },
    { label: mockPost?.category, path: `/homepage-feed?category=${mockPost?.category?.toLowerCase()}` },
    { label: mockPost?.title, path: `/blog-post-detail-view?id=${postId}` }
  ];

  // Event handlers
  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
      console.log('Link copied to clipboard');
    }
  };

  const handleBookmark = (postId, bookmarked) => {
    setIsBookmarked(bookmarked);
    console.log(`Post ${postId} ${bookmarked ? 'bookmarked' : 'unbookmarked'}`);
  };

  const handleLike = (postId, liked) => {
    setIsLiked(liked);
    console.log(`Post ${postId} ${liked ? 'liked' : 'unliked'}`);
  };

  const handleFollow = (authorId, following) => {
    setIsFollowing(following);
    console.log(`Author ${authorId} ${following ? 'followed' : 'unfollowed'}`);
  };

  const handleAddComment = (content) => {
    console.log('Adding comment:', content);
    // In a real app, this would make an API call
  };

  const handleReply = (commentId, content) => {
    console.log('Adding reply to comment', commentId, ':', content);
    // In a real app, this would make an API call
  };

  const handleLikeComment = (commentId) => {
    console.log('Liking comment:', commentId);
    // In a real app, this would make an API call
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/user-authentication-login-register');
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
          
          <BlogHeader
            post={mockPost}
            onShare={handleShare}
            onBookmark={handleBookmark}
            isBookmarked={isBookmarked}
          />
          
          <AuthorCard
            author={mockPost?.author}
            isFollowing={isFollowing}
            onFollow={handleFollow}
          />
          
          <BlogContent
            content={mockPost?.content}
            tableOfContents={mockPost?.tableOfContents}
          />
          
          <EngagementBar
            post={mockPost}
            onLike={handleLike}
            onShare={handleShare}
            onBookmark={handleBookmark}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
          />
          
          <CommentsSection
            comments={mockComments}
            user={user}
            onAddComment={handleAddComment}
            onReply={handleReply}
            onLikeComment={handleLikeComment}
          />
          
          <RelatedPosts posts={mockRelatedPosts} />
        </div>
      </main>
    </div>
  );
};

export default BlogPostDetailView;