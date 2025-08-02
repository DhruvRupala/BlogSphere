import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ onCategoryChange, onSortChange, onSearch, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'development', label: 'Development' },
    { value: 'business', label: 'Business' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-commented', label: 'Most Commented' }
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSort('newest');
    onCategoryChange('all');
    onSortChange('newest');
    onSearch('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSort !== 'newest' || searchQuery;

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border mb-6">
      <div className="px-4 lg:px-6 py-4">
        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Select category"
              className="w-48"
            />
            
            <Select
              options={sortOptions}
              value={selectedSort}
              onChange={handleSortChange}
              placeholder="Sort by"
              className="w-40"
            />
          </div>

          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Clear Filters
              </Button>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>Filters Active</span>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
            >
              Filters
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Clear
              </Button>
            )}
          </div>

          {/* Mobile Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 space-y-4 p-4 bg-card border border-border rounded-lg">
              <Select
                label="Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select category"
              />
              
              <Select
                label="Sort By"
                options={sortOptions}
                value={selectedSort}
                onChange={handleSortChange}
                placeholder="Sort by"
              />

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
                
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                <span>{categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}</span>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedSort !== 'newest' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary text-sm rounded-md">
                <span>{sortOptions?.find(opt => opt?.value === selectedSort)?.label}</span>
                <button
                  onClick={() => handleSortChange('newest')}
                  className="hover:bg-secondary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {searchQuery && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent text-sm rounded-md">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => onSearch('')}
                  className="hover:bg-accent/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;