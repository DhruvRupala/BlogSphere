import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="h-48 bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Category and Date */}
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-full"></div>
              <div className="h-5 bg-muted rounded w-3/4"></div>
            </div>
            
            {/* Excerpt */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            
            {/* Meta */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="h-4 bg-muted rounded w-20"></div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="h-3 bg-muted rounded w-8"></div>
                <div className="h-3 bg-muted rounded w-8"></div>
                <div className="h-3 bg-muted rounded w-8"></div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex space-x-2 pt-3 border-t border-border">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;