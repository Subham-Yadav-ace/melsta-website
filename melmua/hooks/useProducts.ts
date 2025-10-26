"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, ProductsState, SearchFilters } from "@/types/product";
import { productApi, ApiError } from "@/lib/api";

interface UseProductsOptions {
  initialFilters?: Partial<SearchFilters>;
  autoFetch?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const { initialFilters = {}, autoFetch = true } = options;

  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: false,
    error: null,
    filteredProducts: [],
  });

  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    selectedCategory: "",
    priceRange: { min: 0, max: 1000 },
    ...initialFilters,
  });

  const [categories, setCategories] = useState<string[]>([]);

  const fetchProducts = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const [productsData, categoriesData] = await Promise.all([
        productApi.getAllProducts(),
        productApi.getCategories(),
      ]);

      setState((prev) => ({
        ...prev,
        products: productsData,
        loading: false,
      }));

      setCategories(categoriesData);
    } catch (error) {
      const errorMessage =
        error instanceof ApiError ? error.message : "Failed to fetch products";

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = state.products;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === filters.selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    return filtered;
  }, [state.products, filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      selectedCategory: "",
      priceRange: { min: 0, max: 1000 },
    });
  };

  const resetError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const refetch = () => {
    fetchProducts();
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, filteredProducts }));
  }, [filteredProducts]);

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch]);

  return {
    products: state.products,
    filteredProducts: state.filteredProducts,
    loading: state.loading,
    error: state.error,
    filters,
    categories,
    updateFilters,
    clearFilters,
    resetError,
    refetch,
    fetchProducts,
  };
};
