import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getTitle = () => {
    return activeTab === 'login' ? 'Welcome back' : 'Create your account';
  };

  const getSubtitle = () => {
    return activeTab === 'login' ?'Sign in to your BlogSphere account to continue writing and sharing your stories.' :'Join BlogSphere today and start sharing your thoughts with the world.';
  };

  return (
    <div className="text-center mb-8">
      <Link 
        to="/homepage-feed" 
        className="inline-flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-150 mb-6"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
          <Icon name="BookOpen" size={24} color="white" />
        </div>
        <span className="font-heading font-bold text-2xl">BlogSphere</span>
      </Link>
      
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        {getTitle()}
      </h1>
      
      <p className="text-muted-foreground text-base max-w-md mx-auto">
        {getSubtitle()}
      </p>
    </div>
  );
};

export default AuthHeader;