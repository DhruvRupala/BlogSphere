import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'published', label: 'Published Posts', icon: 'FileText', count: null },
    { id: 'drafts', label: 'Drafts', icon: 'Edit', count: null },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', count: null },
    { id: 'settings', label: 'Settings', icon: 'Settings', count: null }
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
            {tab?.count && (
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;