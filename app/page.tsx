import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { alternates: { canonical: "/" } };

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
            I’m <strong>Rohmad Arifin</strong> — Seasoned fullstack software engineer with
            experience building and optimizing enterprise applications, developer platforms, and
            cross platform solutions. I optimize processes, cut development cycles, and deliver
            cross-platform solutions from concept to execution.
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
    </div>
  );
}
