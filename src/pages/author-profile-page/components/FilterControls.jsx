import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedSort, 
  onSortChange,
  categories 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat?.slug, label: cat?.name }))
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-viewed', label: 'Most Viewed' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Filter" size={20} className="text-muted-foreground" />
        <h3 className="font-medium text-foreground">Filter Posts</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          placeholder="Select category"
        />
        
        <Select
          label="Sort by"
          options={sortOptions}
          value={selectedSort}
          onChange={onSortChange}
          placeholder="Sort posts"
        />
      </div>
    </div>
  );
};

export default FilterControls;