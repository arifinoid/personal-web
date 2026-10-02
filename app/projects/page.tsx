import Link from "next/link";
import { ArrowUpRight, Blocks, CodeXml, FolderKanban, LockKeyhole } from "lucide-react";

import { GithubIcon } from "@/components/brand-icons";
import { site } from "@/lib/site";

const projects = [
  {
    title: "payment switching internal platform",
    type: "work / alto network",
    description:
      "Internal platform for Indonesia's payment switching infrastructure — one of the country's four licensed switching companies — with high-volume data viewing and download, 27 million records per day, straight from core systems.",
    tags: ["java spring boot", "react", "postgresql"],
    year: "2026",
    icon: Blocks,
    open: false,
  },
  {
    title: "onefish dls",
    type: "work / efishery",
    description:
      "A platform tool that streamlined core processes and eliminated key development pain points for faster feature delivery across teams.",
    tags: ["developer tools", "internal platform"],
    year: "2024",
    icon: CodeXml,
    open: false,
  },
  {
    title: "unified login system",
    type: "work / efishery",
    description:
      "Architecture and JS SDK for authentication services across multiple platforms — cutting feature delivery timelines and standardizing security protocols.",
    tags: ["auth", "javascript sdk", "security"],
    year: "2023",
    icon: FolderKanban,
    open: false,
  },
  {
    title: "integration factory",
    type: "work / jubelio",
    description:
      "A factory pattern for third-party integrations — marketplaces, couriers, payment gateways — that cut integration development time significantly.",
    tags: ["integrations", "azure functions"],
    year: "2021",
    icon: LockKeyhole,
    open: false,
  },
];

export default function Projects() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-kicker">
          <span className="line" />
          <span>~/work/projects.tsx</span>
        </div>
        <h1 className="page-title">
          things I’ve
          <br />
          <em>made.</em>
        </h1>
        <p className="page-intro">
          Systems, platforms, and tools built across seven years — each one started as a problem
          worth solving.
        </p>
      </div>
      <div className="project-list">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <article className="project-row" key={project.title}>
              <div>
                <h2 className="project-title">
                  <Icon size={17} strokeWidth={1.7} />
                  {project.title}
                </h2>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <div className="tag-row tag-row-tight">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                className="project-arrow"
                href="/about"
                aria-label={`Ask about ${project.title}`}
              >
                <ArrowUpRight size={17} />
              </Link>
            </article>
          );
        })}
      </div>
      <div className="panel panel-row panel-footer">
        <span className="timeline-copy">
          More experiments live on GitHub — personal tools, dotfiles, and the occasional Nix
          adventure.
        </span>
        <a className="button-ghost" href={site.github} target="_blank" rel="noopener noreferrer">
          github.com/arifinoid <GithubIcon size={13} />
        </a>
      </div>
    </div>
  );
}
