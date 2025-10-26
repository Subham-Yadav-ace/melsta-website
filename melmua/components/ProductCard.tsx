"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Card, CardContent, CardFooter } from "./ui/Card";
import { Button } from "./ui/Button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      className={`group overflow-hidden ${className}`}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors dark:bg-gray-800/80 dark:hover:bg-gray-800"
            aria-label={
              isProductFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              className={`w-5 h-5 transition-colors ${
                isProductFavorite
                  ? "text-red-500 fill-current"
                  : "text-gray-400 hover:text-red-500"
              }`}
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
              {truncateText(product.title, 60)}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>

            {product.rating && (
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.rating.rate.toFixed(1)} ({product.rating.count})
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => console.log("View product:", product.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
