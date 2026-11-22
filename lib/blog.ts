export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  read: string;
  excerpt: string;
  tags: string[];
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rust-for-typescript-developers",
    title: "Rust for TypeScript Developers",
    date: "2026-11-22",
    read: "10 min read",
    excerpt:
      "If you write TypeScript for a living, Rust is less a career change than a dialect. About 70% of what you know carries over; the rest is ownership, borrowing, and a compiler that treats your types as a contract.",
    tags: ["rust", "typescript"],
    href: "/blog/rust-for-typescript-developers",
  },
  {
    slug: "why-i-blog-again",
    title: "Why I blog (again)",
    date: "2026",
    read: "coming soon",
    excerpt:
      "Notes from seasoned shipping — what worked, what broke, and the quiet art of building tools people want to use twice.",
    tags: ["meta"],
    href: "/about",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
