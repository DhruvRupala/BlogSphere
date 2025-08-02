import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const HeaderNavigation = ({ user = null, onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Home', path: '/homepage-feed', icon: 'Home' },
    { label: 'Create', path: '/blog-creation-editor', icon: 'PenTool', authRequired: true },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Navigate to search results or handle search
      console.log('Search query:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/homepage-feed" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-150">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl">BlogSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            if (item?.authRequired && !user) return null;
            
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Search and User Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            {!isSearchOpen ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Search" size={20} />
              </Button>
            ) : (
              <div className="absolute right-0 top-0 w-80 max-w-[calc(100vw-2rem)] md:w-96">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    type="search"
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="pr-10"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Icon name="Search" size={16} />
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* User Menu */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUserMenuToggle}
                className="relative"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated animate-scale-in">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-sm text-foreground">{user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/user-profile-dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="User" size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/user-profile-dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-border my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150 w-full text-left"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/user-authentication-login-register">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-down">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => {
              if (item?.authRequired && !user) return null;
              
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              );
            })}
            
            {!user && (
              <div className="pt-4 border-t border-border">
                <Link
                  to="/user-authentication-login-register"
                  className="flex items-center justify-center space-x-2 px-3 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all duration-150"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name="LogIn" size={20} />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNavigation;