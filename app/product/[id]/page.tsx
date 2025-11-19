"use client";

import { useState } from "react";
import { useParams } from 'next/navigation';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Star, ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react';
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = PRODUCTS.find((p) => p.id === id);
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <Link
              href="/products"
              className="text-primary hover:underline font-semibold"
            >
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </nav>

          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-muted rounded-lg p-8">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">{product.rating}</span>
                  <span className="text-muted-foreground ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="py-6 border-y border-border">
                <span className="text-4xl font-bold text-foreground">
                  ${product.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-semibold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                    isAdded
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isAdded ? "Added to Cart!" : "Add to Cart"}
                </button>
                <Link
                  href="/products"
                  className="w-full py-3 rounded-lg font-semibold text-center border border-border text-foreground hover:bg-muted transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Product Details */}
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    On orders over $100
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    30-Day Returns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Easy returns within 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="group cursor-pointer h-full">
                      <div className="relative bg-muted rounded-lg overflow-hidden mb-4 h-48">
                        <img
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground mt-2">
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
