"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from "react";

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu Button */}
          <button
            className="p-2 hover:bg-muted rounded-lg transition md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 flex-1 ml-8">
            <Link href="/" className="text-foreground hover:text-primary transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition font-medium">
              Collections
            </Link>
            <Link href="/products?sort=new" className="text-foreground hover:text-primary transition font-medium">
              New
            </Link>
          </nav>

          {/* Brand Mark - Center */}
          <div className="flex-1 flex justify-center">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full"></div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button className="p-2 hover:bg-muted rounded-full transition">
              <Heart className="w-6 h-6" />
            </button>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition"
            >
              <span>Cart</span>
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="p-2 hover:bg-muted rounded-full transition">
              <div className="w-6 h-6 bg-foreground rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-foreground hover:text-primary transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition font-medium">
              Collections
            </Link>
            <Link href="/products?sort=new" className="text-foreground hover:text-primary transition font-medium">
              New
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
