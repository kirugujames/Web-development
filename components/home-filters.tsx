"use client";

import { useState } from "react";
import { ChevronDown } from 'lucide-react';

interface FilterSection {
  title: string;
  type: 'size' | 'availability' | 'expandable';
  items?: { label: string; count?: number }[];
}

export interface FilterState {
  sizes: string[];
  availability: string[];
  categories: string[];
  colors: string[];
  priceRange: [number, number];
}

export default function HomeFilters({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['Size', 'Category']);
  
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    sizes: [],
    availability: [],
    categories: [],
    colors: [],
    priceRange: [0, 500],
  });

  const filters: FilterSection[] = [
    {
      title: 'Size',
      type: 'size',
      items: [
        { label: 'XS' },
        { label: 'S' },
        { label: 'M' },
        { label: 'L' },
        { label: 'XL' },
        { label: '2X' },
      ],
    },
    {
      title: 'Availability',
      type: 'availability',
      items: [
        { label: 'In Stock', count: 450 },
        { label: 'Out of Stock', count: 18 },
      ],
    },
    {
      title: 'Category',
      type: 'expandable',
      items: [
        { label: 'Sports' },
        { label: 'Beauty' },
        { label: 'Footwear' },
        { label: 'Accessories' },
        { label: 'Skincare' },
        { label: 'Makeup' },
        { label: 'Equipment' },
      ],
    },
    {
      title: 'Colors',
      type: 'expandable',
      items: [
        { label: 'Black' },
        { label: 'White' },
        { label: 'Blue' },
        { label: 'Red' },
        { label: 'Green' },
      ],
    },
    {
      title: 'Price Range',
      type: 'expandable',
    },
    {
      title: 'Collections',
      type: 'expandable',
    },
    {
      title: 'Tags',
      type: 'expandable',
    },
    {
      title: 'Ratings',
      type: 'expandable',
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((s) => s !== title)
        : [...prev, title]
    );
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      const array = updated[filterType] as string[];
      
      if (checked) {
        if (!array.includes(value)) {
          array.push(value);
        }
      } else {
        updated[filterType] = array.filter((item) => item !== value);
      }
      
      onFilterChange(updated);
      return updated;
    });
  };

  return (
    <aside className="w-full md:w-64 pr-0 md:pr-6 mb-6 md:mb-0">
      <h2 className="text-lg font-bold mb-6">Filters</h2>

      {filters.map((filter) => (
        <div key={filter.title} className="mb-6 border-b border-border pb-6">
          <button
            onClick={() => toggleSection(filter.title)}
            className="w-full flex justify-between items-center font-semibold text-foreground hover:text-primary transition"
          >
            <span>{filter.title}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedSections.includes(filter.title) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSections.includes(filter.title) && filter.items && (
            <div className="mt-3 flex flex-col gap-2">
              {filter.type === 'size' ? (
                <div className="flex gap-2 flex-wrap">
                  {filter.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        const isSelected = selectedFilters.sizes.includes(item.label);
                        handleFilterChange('sizes', item.label, !isSelected);
                      }}
                      className={`px-3 py-2 border rounded font-medium text-sm transition ${
                        selectedFilters.sizes.includes(item.label)
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : (
                filter.items.map((item) => {
                  let filterArray: string[] = [];
                  if (filter.title === 'Availability') {
                    filterArray = selectedFilters.availability;
                  } else if (filter.title === 'Category') {
                    filterArray = selectedFilters.categories;
                  } else if (filter.title === 'Colors') {
                    filterArray = selectedFilters.colors;
                  }

                  return (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterArray.includes(item.label)}
                        onChange={(e) => {
                          const filterKey = 
                            filter.title === 'Availability' ? 'availability' :
                            filter.title === 'Category' ? 'categories' :
                            filter.title === 'Colors' ? 'colors' :
                            'sizes';
                          handleFilterChange(filterKey as keyof FilterState, item.label, e.target.checked);
                        }}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">{item.label}</span>
                      {item.count && (
                        <span className="text-xs text-muted-foreground">({item.count})</span>
                      )}
                    </label>
                  );
                })
              )}
            </div>
          )}

          {filter.title === 'Price Range' && expandedSections.includes(filter.title) && (
            <div className="mt-3 flex flex-col gap-3">
              <input
                type="range"
                min="0"
                max="500"
                value={selectedFilters.priceRange[1]}
                onChange={(e) => {
                  const newFilters = { ...selectedFilters, priceRange: [0, parseInt(e.target.value)] };
                  setSelectedFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>$0</span>
                <span>${selectedFilters.priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
