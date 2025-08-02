import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PreviewMode = ({ postData }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const textContent = content?.replace(/<[^>]*>/g, '');
    const wordCount = textContent?.split(/\s+/)?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      {/* Article Header */}
      <header className="mb-8">
        {postData?.featuredImage && (
          <div className="aspect-video mb-6 rounded-xl overflow-hidden">
            <Image
              src={postData?.featuredImage}
              alt={postData?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          {postData?.category && (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {postData?.category}
              </span>
              {postData?.tags?.length > 0 && (
                <div className="flex items-center space-x-1">
                  {postData?.tags?.slice(0, 3)?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {postData?.title || 'Your Blog Post Title'}
          </h1>

          {postData?.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {postData?.excerpt}
            </p>
          )}

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  JD
                </span>
              </div>
              <span>John Doe</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(new Date())}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{calculateReadTime(postData?.content || '')} min read</span>
            </div>
          </div>
        </div>
      </header>
      {/* Article Content */}
      <article className="prose prose-lg prose-invert max-w-none">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: postData?.content || '<p class="text-muted-foreground italic">Start writing your content...</p>' 
          }} 
        />
      </article>
      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <Icon name="Heart" size={20} />
              <span>Like</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <Icon name="MessageCircle" size={20} />
              <span>Comment</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <Icon name="Share2" size={20} />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span>0 views</span>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-xl font-medium">
                JD
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">John Doe</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Passionate writer and technology enthusiast. I love sharing insights about web development, 
                design, and the latest trends in the tech industry.
              </p>
              
              <div className="flex items-center space-x-4 mt-3">
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Follow
                </button>
                <span className="text-muted-foreground text-sm">
                  42 followers
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Preview Badge */}
      <div className="fixed top-20 right-4 z-10">
        <div className="flex items-center space-x-2 px-3 py-2 bg-warning text-warning-foreground rounded-lg shadow-lg">
          <Icon name="Eye" size={16} />
          <span className="text-sm font-medium">Preview Mode</span>
        </div>
      </div>
      {/* Custom Styles for Preview */}
      <style jsx>{`
        .prose h1 { font-size: 2.5rem; font-weight: 700; margin: 2rem 0 1rem 0; color: rgb(248 250 252); }
        .prose h2 { font-size: 2rem; font-weight: 600; margin: 1.75rem 0 1rem 0; color: rgb(248 250 252); }
        .prose h3 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: rgb(248 250 252); }
        .prose h4 { font-size: 1.25rem; font-weight: 600; margin: 1.25rem 0 0.5rem 0; color: rgb(248 250 252); }
        .prose p { margin: 1rem 0; line-height: 1.7; color: rgb(203 213 225); }
        .prose blockquote { 
          border-left: 4px solid rgb(99 102 241); 
          padding-left: 1.5rem; 
          margin: 1.5rem 0; 
          font-style: italic;
          color: rgb(156 163 175);
          background: rgb(30 41 59);
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }
        .prose pre { 
          background: rgb(15 23 42); 
          padding: 1.5rem; 
          border-radius: 0.75rem; 
          margin: 1.5rem 0;
          font-family: 'JetBrains Mono', monospace;
          overflow-x: auto;
          border: 1px solid rgb(51 65 85);
        }
        .prose code {
          background: rgb(30 41 59);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
        }
        .prose ul, .prose ol { margin: 1rem 0; padding-left: 2rem; }
        .prose li { margin: 0.5rem 0; color: rgb(203 213 225); }
        .prose a { color: rgb(99 102 241); text-decoration: none; }
        .prose a:hover { text-decoration: underline; }
        .prose img { 
          border-radius: 0.75rem; 
          margin: 1.5rem 0; 
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PreviewMode;