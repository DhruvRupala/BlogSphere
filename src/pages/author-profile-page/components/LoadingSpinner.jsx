import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin mb-4">
        <Icon name="Loader2" size={32} className="text-primary" />
      </div>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;