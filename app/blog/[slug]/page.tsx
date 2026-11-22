import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import type { ComponentType } from "react";

import RustForTypeScriptDevelopers from "@/components/blog/rust-for-typescript-developers";
import { blogPosts, getBlogPost } from "@/lib/blog";

const postBodies: Record<string, ComponentType> = {
  "rust-for-typescript-developers": RustForTypeScriptDevelopers,
};

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.filter((post) => post.slug in postBodies).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}/`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Body = postBodies[slug];
  if (!post || !Body) notFound();

  return (
    <div className="page">
      <article className="post">
        <header className="post-header">
          <div className="page-kicker">
            <span className="line" />
            <span>~/work/blog/{post.slug}.tsx</span>
          </div>
          <h1 className="page-title">{post.title}</h1>
          <div className="post-meta">
            <span>{post.date}</span>
            <span className="post-meta-dot" aria-hidden="true" />
            <span>
              <Clock3 size={11} strokeWidth={1.5} absoluteStrokeWidth className="icon-inline" />
              {post.read}
            </span>
            <span className="tag-row">
              {post.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </header>
        <Body />
        <footer className="post-footer">
          <Link className="button-ghost" href="/blog">
            <ArrowLeft size={13} strokeWidth={2} absoluteStrokeWidth />
            all notes
          </Link>
        </footer>
      </article>
    </div>
  );
}
