import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";

import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = { alternates: { canonical: "/blog/" } };

export default function Blog() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-kicker">
          <span className="line" />
          <span>~/work/blog.tsx</span>
        </div>
        <h1 className="page-title">
          notes from
          <br />
          <em>the buffer.</em>
        </h1>
        <p className="page-intro">
          Dispatches on engineering, developer experience, and systems that stay calm under load.
        </p>
      </div>
      <div className="blog-list">
        {blogPosts.map((note) => (
          <article className="blog-item" key={note.slug}>
            <div className="blog-date">{note.date}</div>
            <div>
              <h2 className="blog-title">{note.title}</h2>
              <p className="blog-excerpt">{note.excerpt}</p>
              <div className="project-meta">
                {note.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
                <span>
                  <Clock3 size={11} strokeWidth={1.5} absoluteStrokeWidth className="icon-inline" />
                  {note.read}
                </span>
              </div>
            </div>
            <Link className="blog-arrow" href={note.href} aria-label={`Read ${note.title}`}>
              <ArrowUpRight size={16} strokeWidth={2} absoluteStrokeWidth />
            </Link>
          </article>
        ))}
      </div>
      <div className="panel panel-note">
        <Bookmark size={15} className="icon-accent-yellow" />
        <span className="timeline-copy">
          This buffer is still warming up. New notes land as they get written — usually with too
          much coffee.
        </span>
      </div>
    </div>
  );
}
