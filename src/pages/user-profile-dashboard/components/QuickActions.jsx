import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end space-y-3">
        {/* Quick Actions Menu */}
        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link to="/blog-creation-editor">
            <Button
              variant="secondary"
              size="sm"
              iconName="PenTool"
              iconPosition="left"
              className="shadow-lg"
            >
              New Post
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart3"
            iconPosition="left"
            className="shadow-lg bg-background"
          >
            View Analytics
          </Button>
        </div>

        {/* Main FAB */}
        <div className="group">
          <Link to="/blog-creation-editor">
            <Button
              variant="default"
              size="icon"
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Icon name="Plus" size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;