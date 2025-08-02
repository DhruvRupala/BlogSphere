import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  const getDefaultBreadcrumbs = () => {
    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/homepage-feed' }];

    const routeMap = {
      'homepage-feed': { label: 'Home', path: '/homepage-feed' },
      'blog-creation-editor': { label: 'Create Blog', path: '/blog-creation-editor' },
      'blog-post-detail-view': { label: 'Blog Post', path: '/blog-post-detail-view' },
      'user-profile-dashboard': { label: 'Dashboard', path: '/user-profile-dashboard' },
      'author-profile-page': { label: 'Author Profile', path: '/author-profile-page' },
      'user-authentication-login-register': { label: 'Sign In', path: '/user-authentication-login-register' },
    };

    pathSegments?.forEach((segment, index) => {
      const route = routeMap?.[segment];
      if (route && route?.path !== '/homepage-feed') {
        breadcrumbs?.push(route);
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customBreadcrumbs || getDefaultBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb?.path} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="mx-2 text-muted-foreground/60" 
                />
              )}
              {isLast ? (
                <span 
                  className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="hover:text-foreground transition-colors duration-150 truncate max-w-[120px] sm:max-w-none"
                  title={crumb?.label}
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;