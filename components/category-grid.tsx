import Link from "next/link";

export default function CategoryGrid() {
  const categories = [
    {
      name: "Sports",
      description: "Performance gear and fitness equipment",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      name: "Beauty",
      description: "Skincare and cosmetics essentials",
      color: "from-pink-500/20 to-pink-600/10",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name}`}
              className={`bg-gradient-to-br ${category.color} border border-border rounded-lg p-8 hover:border-primary transition group`}
            >
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition mb-2">
                {category.name}
              </h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <span className="text-primary font-semibold">Browse Collection →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
