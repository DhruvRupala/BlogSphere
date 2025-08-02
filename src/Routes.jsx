import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserProfileDashboard from './pages/user-profile-dashboard';
import BlogCreationEditor from './pages/blog-creation-editor';
import HomepageFeed from './pages/homepage-feed';
import AuthorProfilePage from './pages/author-profile-page';
import UserAuthenticationLoginRegister from './pages/user-authentication-login-register';
import BlogPostDetailView from './pages/blog-post-detail-view';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthorProfilePage />} />
        <Route path="/user-profile-dashboard" element={<UserProfileDashboard />} />
        <Route path="/blog-creation-editor" element={<BlogCreationEditor />} />
        <Route path="/homepage-feed" element={<HomepageFeed />} />
        <Route path="/author-profile-page" element={<AuthorProfilePage />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/blog-post-detail-view" element={<BlogPostDetailView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
