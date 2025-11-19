"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/products";
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
          <div className="relative bg-muted overflow-hidden aspect-square">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            <button
              onClick={handleFavorite}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>

            {product.price < 100 && (
              <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Sale
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col flex-grow space-y-3">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 transition-colors ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between pt-2 mt-auto">
              <div>
                <span className="text-2xl font-bold text-foreground">${product.price}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
