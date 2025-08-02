import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';

const UserAuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    email: "demo@blogsphere.com",
    password: "Demo123!",
    username: "demo_user"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/user-profile-dashboard');
    }

    // Set initial tab based on URL parameter
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [navigate, location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    
    // Update URL without page reload
    const newUrl = tab === 'register' ? '?tab=register' : '';
    window.history.replaceState({}, '', `/user-authentication-login-register${newUrl}`);
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Generate mock JWT token
        const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
          id: 1,
          email: formData.email,
          username: mockCredentials.username,
          exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        }))}.mock_signature`;

        // Store authentication data
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: formData.email,
          username: mockCredentials.username,
          name: 'Demo User',
          bio: 'Welcome to BlogSphere! This is a demo account.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          joinedDate: '2024-01-15',
          postsCount: 12,
          followersCount: 245,
          followingCount: 89
        }));

        // Redirect to dashboard
        const from = location.state?.from?.pathname || '/user-profile-dashboard';
        navigate(from, { replace: true });
      } else {
        setError(`Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`);
      }
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration logic
      if (formData.email === 'existing@example.com') {
        setError('An account with this email already exists.');
        return;
      }

      // Generate mock JWT token for new user
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        id: Date.now(),
        email: formData.email,
        username: formData.username,
        exp: Date.now() + 24 * 60 * 60 * 1000
      }))}.mock_signature`;

      // Store authentication data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        email: formData.email,
        username: formData.username,
        name: formData.username,
        bio: 'New to BlogSphere! Excited to start sharing my thoughts.',
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
        joinedDate: new Date().toISOString().split('T')[0],
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
      }));

      // Redirect to dashboard
      navigate('/user-profile-dashboard', { replace: true });
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social auth delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock social authentication
      const mockSocialUser = {
        google: {
          email: 'user@gmail.com',
          name: 'Google User',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        github: {
          email: 'user@github.com',
          name: 'GitHub User',
          avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face'
        }
      };

      const userData = mockSocialUser[provider];
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        id: Date.now(),
        email: userData.email,
        provider: provider,
        exp: Date.now() + 24 * 60 * 60 * 1000
      }))}.mock_signature`;

      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        email: userData.email,
        username: userData.email.split('@')[0],
        name: userData.name,
        bio: `Joined BlogSphere via ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
        avatar: userData.avatar,
        joinedDate: new Date().toISOString().split('T')[0],
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
      }));

      navigate('/user-profile-dashboard', { replace: true });
    } catch (err) {
      setError(`Failed to authenticate with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <AuthHeader activeTab={activeTab} />

          {/* Auth Form Container */}
          <div className="bg-card border border-border rounded-xl shadow-elevated p-6 sm:p-8">
            {/* Tabs */}
            <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Forms */}
            {activeTab === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                loading={loading}
                error={error}
              />
            )}

            {/* Social Authentication */}
            <div className="mt-6">
              <SocialAuth
                onSocialAuth={handleSocialAuth}
                loading={loading}
              />
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              {activeTab === 'login' ? (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    onClick={() => handleTabChange('register')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-150"
                  >
                    Create one here
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    onClick={() => handleTabChange('login')}
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-150"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2">Demo Credentials</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Email:</strong> {mockCredentials.email}</p>
              <p><strong>Password:</strong> {mockCredentials.password}</p>
              <p className="mt-2 text-xs opacity-75">Use these credentials to test the login functionality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-6 px-4 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BlogSphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserAuthenticationLoginRegister;