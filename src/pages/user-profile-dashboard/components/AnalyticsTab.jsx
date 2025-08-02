import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsTab = ({ analyticsData }) => {
  const viewsData = [
    { month: 'Jan', views: 1200, likes: 89 },
    { month: 'Feb', views: 1900, likes: 142 },
    { month: 'Mar', views: 2400, likes: 198 },
    { month: 'Apr', views: 2100, likes: 167 },
    { month: 'May', views: 2800, likes: 234 },
    { month: 'Jun', views: 3200, likes: 289 }
  ];

  const topPostsData = [
    { title: 'Getting Started with React Hooks', views: 1250, likes: 89 },
    { title: 'Advanced JavaScript Patterns', views: 980, likes: 67 },
    { title: 'CSS Grid vs Flexbox Guide', views: 875, likes: 54 },
    { title: 'Node.js Best Practices', views: 720, likes: 43 },
    { title: 'TypeScript for Beginners', views: 650, likes: 38 }
  ];

  const audienceData = [
    { name: 'Desktop', value: 65, color: '#6366F1' },
    { name: 'Mobile', value: 28, color: '#8B5CF6' },
    { name: 'Tablet', value: 7, color: '#F59E0B' }
  ];

  const engagementMetrics = [
    { label: 'Average Read Time', value: '4.2 min', icon: 'Clock', trend: '+12%' },
    { label: 'Bounce Rate', value: '32%', icon: 'TrendingDown', trend: '-8%' },
    { label: 'Comments per Post', value: '8.5', icon: 'MessageCircle', trend: '+15%' },
    { label: 'Shares per Post', value: '12.3', icon: 'Share2', trend: '+22%' }
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={metric?.icon} size={20} className="text-primary" />
              </div>
              <span className="text-xs text-success font-medium">{metric?.trend}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
            <p className="text-sm text-muted-foreground">{metric?.label}</p>
          </div>
        ))}
      </div>
      {/* Views and Likes Over Time */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Views & Likes Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-foreground)'
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Views"
              />
              <Line
                type="monotone"
                dataKey="likes"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                name="Likes"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Posts</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPostsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" />
                <YAxis 
                  type="category" 
                  dataKey="title" 
                  stroke="var(--color-muted-foreground)"
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Bar dataKey="views" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Demographics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Audience by Device</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={audienceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {audienceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {audienceData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New comment on "Getting Started with React Hooks"', time: '2 hours ago', icon: 'MessageCircle' },
            { action: 'Post "Advanced JavaScript Patterns" reached 1000 views', time: '5 hours ago', icon: 'Eye' },
            { action: 'New follower: Sarah Johnson', time: '1 day ago', icon: 'UserPlus' },
            { action: 'Post "CSS Grid vs Flexbox Guide" was liked 50 times', time: '2 days ago', icon: 'Heart' },
            { action: 'Draft "TypeScript Advanced Topics" was auto-saved', time: '3 days ago', icon: 'Save' }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={activity?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;