import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, postCounts }) => {
  const tabs = [
    {
      id: 'recent',
      label: 'Recent Posts',
      icon: 'Clock',
      count: postCounts?.recent
    },
    {
      id: 'popular',
      label: 'Popular Posts',
      icon: 'TrendingUp',
      count: postCounts?.popular
    },
    {
      id: 'about',
      label: 'About',
      icon: 'User',
      count: null
    }
  ];

  return (
    <div className="border-b border-border mb-8">
      <nav className="flex space-x-8 overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-150 ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={18} />
            <span>{tab?.label}</span>
            {tab?.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
              }`}>
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