"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface SearchAndFilterProps {
  className?: string;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  className = "",
}) => {
  const { filters, categories, updateFilters, clearFilters } = useProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ selectedCategory: e.target.value });
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseFloat(e.target.value) || 0;
    updateFilters({
      priceRange: {
        ...filters.priceRange,
        min,
      },
    });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseFloat(e.target.value) || 1000;
    updateFilters({
      priceRange: {
        ...filters.priceRange,
        max,
      },
    });
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.selectedCategory ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 1000;

  return (
    <div
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Search & Filter
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Input
            placeholder="Search products..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            variant="search"
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.selectedCategory}
            onChange={handleCategoryChange}
            className="w-full h-10 px-3 py-2 text-sm bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Price Range
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={handlePriceMinChange}
                  min="0"
                  step="0.01"
                />
              </div>
              <span className="text-gray-400">to</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={handlePriceMaxChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Active Filters:
            </span>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  Search: "{filters.searchTerm}"
                </span>
              )}
              {filters.selectedCategory && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                  {filters.selectedCategory}
                </span>
              )}
              {(filters.priceRange.min > 0 ||
                filters.priceRange.max < 1000) && (
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                  ${filters.priceRange.min} - ${filters.priceRange.max}
                </span>
              )}
              {!hasActiveFilters && (
                <span className="text-gray-400 text-xs">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
