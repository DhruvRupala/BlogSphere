import React from 'react';
import Icon from '../../../components/AppIcon';

const BlogContent = ({ content, tableOfContents }) => {
  const renderContent = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="lg:flex lg:space-x-8">
      {/* Main Content */}
      <div className="lg:flex-1">
        <article className="prose prose-invert prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={renderContent(content)}
            className="blog-content"
          />
        </article>
      </div>
      {/* Desktop Sidebar - Table of Contents */}
      {tableOfContents && tableOfContents?.length > 0 && (
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="List" size={20} className="mr-2" />
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents?.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item?.id}`}
                    className={`block text-sm transition-colors duration-150 hover:text-primary ${
                      item?.level === 1 
                        ? 'text-foreground font-medium' 
                        : item?.level === 2
                        ? 'text-muted-foreground pl-4'
                        : 'text-muted-foreground pl-8'
                    }`}
                  >
                    {item?.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogContent;