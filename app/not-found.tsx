import Link from "next/link";
import { CircleAlert, House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-kicker">
          <span className="line" />
          <span>~/work/404.tsx</span>
        </div>
        <h1 className="page-title">
          buffer
          <br />
          <em>empty.</em>
        </h1>
        <p className="page-intro">
          Sorry, the page you are looking for doesn’t exist.
          <br />
          It may have been moved or deleted.
        </p>
      </div>
      <div className="panel panel-row">
        <div className="panel-icon-row">
          <CircleAlert size={22} className="icon-accent-red" />
          <div>
            <div className="panel-headline panel-headline-lg">404 — Page Not Found</div>
            <p className="timeline-copy panel-copy">E486: Pattern not found in this workspace.</p>
          </div>
        </div>
        <Link className="button-primary" href="/">
          <House size={14} /> go home
        </Link>
      </div>
    </div>
  );
}
