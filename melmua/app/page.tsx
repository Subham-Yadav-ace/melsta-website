"use client";

import { Header } from "@/components/Header";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { ProductGallery } from "@/components/ProductGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Product Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing products from our curated collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchAndFilter className="sticky top-24" />
          </div>

          <div className="lg:col-span-3">
            <ProductGallery />
          </div>
        </div>
      </main>
    </div>
  );
}
