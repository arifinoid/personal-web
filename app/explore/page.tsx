import Link from "next/link";
import { ArrowUpRight, Brackets, Eye, MousePointer2, Radio, Waypoints } from "lucide-react";

const timeline = [
  {
    date: "2026 — now",
    title: "fullstack associate manager / alto network",
    copy: "Leading 11 engineers on Scrum, enforcing SDLC best practices, and building internal platforms for Indonesia's payment switching infrastructure — 99.99% SLA, 27M records/day.",
    tags: ["java spring boot", "react", "postgresql"],
  },
  {
    date: "2024 — 26",
    title: "senior software engineer / aia indonesia",
    copy: "Hardened reliability on AKS, refactored legacy codebases, and cut the agent recruitment page load from 48 seconds to 1 second.",
    tags: ["aks", "monitoring", "performance"],
  },
  {
    date: "2021 — 24",
    title: "software engineer, platform / efishery",
    copy: "Built developer tools, OneFish DLS, a unified login system, and a JS auth SDK. Introduced Nix flakes for faster onboarding and no-code platforms with Strapi and Budibase.",
    tags: ["refine", "strapi", "nix"],
  },
  {
    date: "2020 — 21",
    title: "full-stack engineer / jubelio",
    copy: "Integrated marketplaces, couriers, and payment gateways; built an integration factory and leaned on Azure Functions to cut complexity and cost.",
    tags: ["integrations", "azure functions", "react"],
  },
  {
    date: "2019 — 20",
    title: "react native developer / sicepat express",
    copy: "Shipped SiCepat App, SiGesit, and SiCepat Absensi — then spent months tuning stability and response times.",
    tags: ["react native", "mobile"],
  },
  {
    date: "2019",
    title: "asst. tech mentor / impact byte",
    copy: "Front-end work on skilvul.com, unit tests, and mentoring students through the learning process.",
    tags: ["react", "mentoring", "testing"],
  },
];

export default function Explore() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-kicker">
          <span className="line" />
          <span>~/work/experience.tsx</span>
        </div>
        <h1 className="page-title">
          the long way
          <br />
          <em>around.</em>
        </h1>
        <p className="page-intro">
          Seven years across logistics, insurtech, agritech, fintech, and developer platforms — from
          React Native apps to micro-frontend payment systems.
        </p>
      </div>
      <div className="experience-grid">
        <section className="panel">
          <div className="panel-label">01 / PATH</div>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.date}>
                <div className="timeline-date">{item.date}</div>
                <h2 className="timeline-title">{item.title}</h2>
                <p className="timeline-copy">{item.copy}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="stack">
          <section className="panel">
            <div className="panel-label">02 / PRINCIPLES</div>
            <div className="principles">
              <div className="principle">
                <strong>reliability is a feature</strong>
                <span>99.99% SLAs and proactive monitoring beat firefighting every time.</span>
              </div>
              <div className="principle">
                <strong>developer experience compounds</strong>
                <span>
                  Good tools, unified logins, and reproducible environments pay for themselves.
                </span>
              </div>
              <div className="principle">
                <strong>measure, then optimize</strong>
                <span>From 48-second loads to 1 second — performance work starts with data.</span>
              </div>
            </div>
          </section>
          <section className="panel">
            <div className="panel-label">03 / TOOLBOX</div>
            <div className="tag-row tag-row-gap">
              <span className="tag">
                <Brackets size={12} /> typescript / react / next.js
              </span>
              <span className="tag">
                <Waypoints size={12} /> node / go / python
              </span>
              <span className="tag">
                <Radio size={12} /> postgresql / sql / nosql
              </span>
              <span className="tag">
                <MousePointer2 size={12} /> react native / flutter
              </span>
              <span className="tag">
                <Eye size={12} /> kubernetes / azure / graphql
              </span>
            </div>
            <Link className="button-ghost panel-cta" href="/projects">
              see it in practice <ArrowUpRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
