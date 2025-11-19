"use client";

import { useState } from "react";
import Header from "@/components/header";
import HomeFilters from "@/components/home-filters";
import HomeContent from "@/components/home-content";
import Footer from "@/components/footer";
import type { FilterState } from "@/components/home-filters";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    availability: [],
    categories: [],
    colors: [],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two Column Layout: Filters + Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block md:w-64 flex-shrink-0">
              <HomeFilters onFilterChange={setFilters} />
            </div>

            <HomeContent filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
