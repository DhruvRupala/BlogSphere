import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialAuth, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'text-foreground'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => onSocialAuth(provider?.id)}
            disabled={loading}
            className="flex items-center justify-center space-x-2"
          >
            <Icon 
              name={provider?.icon} 
              size={18} 
              className={provider?.color}
            />
            <span>{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;