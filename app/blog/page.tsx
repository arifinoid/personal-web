import Link from "next/link";
import { ArrowUpRight, Bookmark, Clock3 } from "lucide-react";

const notes = [
  {
    date: "2026",
    title: "Why I blog (again)",
    excerpt:
      "Notes from seven years of shipping — what worked, what broke, and the quiet art of building tools people want to use twice.",
    read: "coming soon",
    tag: "meta",
  },
];

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
        {notes.map((note) => (
          <article className="blog-item" key={note.title}>
            <div className="blog-date">{note.date}</div>
            <div>
              <h2 className="blog-title">{note.title}</h2>
              <p className="blog-excerpt">{note.excerpt}</p>
              <div className="project-meta">
                <span className="tag">{note.tag}</span>
                <span>
                  <Clock3 size={11} className="icon-inline" />
                  {note.read}
                </span>
              </div>
            </div>
            <Link className="blog-arrow" href="/about" aria-label={`Read ${note.title}`}>
              <ArrowUpRight size={16} />
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
