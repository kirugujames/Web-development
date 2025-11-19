"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import type { FilterState } from "@/components/home-filters";

const categories = ['ALL', 'NEW', 'BEST SELLERS', 'T-SHIRTS', 'POLO SHIRTS', 'SHORTS', 'JACKETS', 'COATS'];

export default function HomeContent({ filters }: { filters: FilterState }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFilterSection, setExpandedFilterSection] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== 'ALL') {
        const categoryNameMap: { [key: string]: string } = {
          'NEW': 'New',
          'BEST SELLERS': 'Best Sellers',
          'T-SHIRTS': 'T-Shirts',
          'POLO SHIRTS': 'Polo Shirts',
          'SHORTS': 'Shorts',
          'JACKETS': 'Jackets',
          'COATS': 'Coats',
        };
        const categoryMatch = categoryNameMap[activeCategory];
        if (categoryMatch && product.category !== categoryMatch) {
          return false;
        }
      }

      // Filter by sidebar categories
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      if (filters.colors.length > 0 && (!product.color || !filters.colors.includes(product.color))) {
        return false;
      }

      if (filters.priceRange && filters.priceRange.length >= 2 && product.price > filters.priceRange[1]) {
        return false;
      }

      // Filter by search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery, activeCategory]);

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <span>Home / Products</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">PRODUCTS</h1>

      {/* Search Bar */}
      <div className="mb-6 flex gap-2 bg-muted rounded-lg px-4 py-3">
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent flex-1 outline-none text-foreground placeholder-muted-foreground"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-2 border border-border rounded text-sm font-medium transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-foreground text-background'
                : 'bg-background text-foreground hover:border-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-8 md:hidden space-y-3">
        {/* Size Filter */}
        <div className="border border-border rounded">
          <button
            onClick={() => setExpandedFilterSection(expandedFilterSection === 'size' ? null : 'size')}
            className="w-full flex justify-between items-center px-4 py-2 font-semibold text-sm hover:bg-muted transition"
          >
            <span>SIZE</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilterSection === 'size' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedFilterSection === 'size' && (
            <div className="px-4 py-3 border-t border-border flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', '2X'].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const isSelected = filters.sizes?.includes(size);
                    // Note: This would require passing filter callbacks from parent
                  }}
                  className={`px-3 py-1 border rounded text-xs font-medium transition ${
                    filters.sizes?.includes(size)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="border border-border rounded">
          <button
            onClick={() => setExpandedFilterSection(expandedFilterSection === 'color' ? null : 'color')}
            className="w-full flex justify-between items-center px-4 py-2 font-semibold text-sm hover:bg-muted transition"
          >
            <span>COLORS</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilterSection === 'color' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedFilterSection === 'color' && (
            <div className="px-4 py-3 border-t border-border space-y-2">
              {['Black', 'White', 'Blue', 'Red', 'Green'].map((color) => (
                <label key={color} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.colors?.includes(color) || false}
                    readOnly
                    className="w-4 h-4 rounded"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="border border-border rounded">
          <button
            onClick={() => setExpandedFilterSection(expandedFilterSection === 'price' ? null : 'price')}
            className="w-full flex justify-between items-center px-4 py-2 font-semibold text-sm hover:bg-muted transition"
          >
            <span>PRICE RANGE</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilterSection === 'price' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedFilterSection === 'price' && (
            <div className="px-4 py-3 border-t border-border space-y-2">
              <div className="text-xs text-muted-foreground">
                $0 - ${filters.priceRange?.[1] || 500}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="border border-border rounded">
          <button
            onClick={() => setExpandedFilterSection(expandedFilterSection === 'category' ? null : 'category')}
            className="w-full flex justify-between items-center px-4 py-2 font-semibold text-sm hover:bg-muted transition"
          >
            <span>CATEGORY</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilterSection === 'category' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedFilterSection === 'category' && (
            <div className="px-4 py-3 border-t border-border space-y-2">
              {['Sports', 'Beauty', 'Footwear', 'Accessories', 'Skincare', 'Makeup', 'Equipment'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat) || false}
                    readOnly
                    className="w-4 h-4 rounded"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
