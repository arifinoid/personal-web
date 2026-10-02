import Link from "next/link";
import { ArrowRight, Braces, Cpu, GitBranch, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="page">
      <section className="hero-grid">
        <div>
          <div className="page-kicker">
            <span className="line" /> <span>~/work/index.tsx</span>
          </div>
          <h1 className="page-title">
            build quietly.
            <br />
            <em>ship loudly.</em>
          </h1>
          <p className="page-intro">
            I’m <strong>Rohmad Arifin</strong> — a fullstack software engineer with 7+ years
            designing, developing, and launching <strong>scalable systems</strong>. I optimize
            processes, cut development cycles, and deliver cross-platform solutions from concept to
            execution.
          </p>
          <div className="hero-cta-row">
            <Link className="button-primary" href="/projects">
              open projects <ArrowRight size={14} />
            </Link>
            <Link className="button-ghost" href="/about">
              :about me
            </Link>
          </div>
        </div>
        <div className="code-card" aria-label="Code preview">
          <div className="code-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="code-lines">
            <div className="code-line">
              <span className="line-num">01</span>
              <span className="code-text">
                <span className="syntax-purple">const</span>{" "}
                <span className="syntax-cyan">developer</span> = {"{"}
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">02</span>
              <span className="code-text">
                &nbsp;&nbsp;name: <span className="syntax-yellow">"rohmad arifin"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">03</span>
              <span className="code-text">
                &nbsp;&nbsp;role: <span className="syntax-yellow">"fullstack engineer"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">04</span>
              <span className="code-text">
                &nbsp;&nbsp;location: <span className="syntax-yellow">"kediri, indonesia"</span>,
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">05</span>
              <span className="code-text">
                &nbsp;&nbsp;stack: [<span className="syntax-yellow">"ts"</span>,{" "}
                <span className="syntax-yellow">"react"</span>,{" "}
                <span className="syntax-yellow">"node"</span>],
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">06</span>
              <span className="code-text">
                &nbsp;&nbsp;mode: <span className="syntax-green">"always learning"</span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-num">07</span>
              <span className="code-text">
                {"}"}
                <span className="code-caret" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>at a glance</h2>
          <Link href="/about">read the context →</Link>
        </div>
        <div className="stat-grid">
          <div className="stat-cell">
            <span className="stat-number">07</span>
            <span className="stat-label">years shipping software</span>
          </div>
          <div className="stat-cell">
            <span className="stat-number">06</span>
            <span className="stat-label">companies, jakarta to bandung</span>
          </div>
          <div className="stat-cell">
            <span className="stat-number">∞</span>
            <span className="stat-label">curiosity remaining</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>what I reach for</h2>
          <Link href="/explore">explore the experience →</Link>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <Cpu className="feature-card-icon" size={18} />
            <div>
              <h3>systems that scale</h3>
              <p>
                Payment switching platforms handling 27M records a day, micro-frontend dashboards,
                and 99.99% SLA reliability.
              </p>
            </div>
          </article>
          <article className="feature-card">
            <Braces className="feature-card-icon" size={18} />
            <div>
              <h3>developer experience first</h3>
              <p>
                Internal tools, unified login systems, JS SDKs, and Nix-based environments that make
                teams faster.
              </p>
            </div>
          </article>
          <article className="feature-card">
            <Sparkles className="feature-card-icon" size={18} />
            <div>
              <h3>fullstack range</h3>
              <p>
                TypeScript, React, Next.js, Node, Go, Python, Java — web, mobile, cloud, and no-code
                platforms.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>now playing</h2>
          <span className="tag">2026 / q3</span>
        </div>
        <div className="panel panel-row">
          <div>
            <div className="panel-label">CURRENTLY BUILDING</div>
            <div className="panel-headline">payment switching platforms at alto network</div>
            <p className="timeline-copy panel-copy">
              Leading 11 engineers on Scrum, building internal platforms for Indonesia's payment
              switching infrastructure on Java Spring Boot, React, and PostgreSQL.
            </p>
          </div>
          <GitBranch className="panel-accent-icon" size={21} />
        </div>
      </section>
    </div>
  );
}
