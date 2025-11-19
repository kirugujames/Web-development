import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Premium Sports & Beauty Products
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          Discover our curated collection of high-quality sports gear and beauty essentials
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/products?category=Sports"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Shop Sports
          </Link>
          <Link
            href="/products?category=Beauty"
            className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Shop Beauty
          </Link>
        </div>
      </div>
    </section>
  );
}
