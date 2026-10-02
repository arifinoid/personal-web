import Image from "next/image";
import { ArrowUpRight, AtSign, Coffee, GraduationCap, MapPin } from "lucide-react";

import { site } from "@/lib/site";

export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-kicker">
          <span className="line" />
          <span>~/work/about.tsx</span>
        </div>
        <h1 className="page-title">
          hello, I’m
          <br />
          <em>rohmad.</em>
        </h1>
        <p className="page-intro">
          Fullstack software engineer based in Kediri, Indonesia — working wherever there is a good
          problem and a reliable internet connection.
        </p>
      </div>
      <div className="about-grid">
        <div className="avatar-card">
          <div className="avatar-terminal">
            <Image
              src="/logo192.png"
              alt="Rohmad Arifin logo"
              width={160}
              height={160}
              className="avatar-image"
              priority
            />
          </div>
          <div className="avatar-caption">
            <span>arifinoid / fullstack</span>
            <span>● available</span>
          </div>
        </div>
        <div className="about-copy">
          <p>
            I’m a <strong>fullstack software engineer with 7+ years</strong> in designing,
            developing, and launching scalable systems. My work sits between product engineering and
            platform thinking: optimizing processes, reducing development cycles, and delivering
            cross-platform solutions from concept to execution.
          </p>
          <p>
            Lately I lead a team of 11 engineers at <strong>Alto Network</strong>, building internal
            platforms for Indonesia's payment switching infrastructure — one of the country's four
            licensed switching companies and part of the National Payment Gateway — holding a 99.99%
            SLA. Before that: reliability work at AIA Indonesia, developer platforms at eFishery,
            integrations at Jubelio, and mobile apps at SiCepat Express.
          </p>
          <p>
            Outside the editor, I tinker with <strong>Nix and Neovim</strong>, keep my dotfiles
            tidy, and believe a good development environment is half the product.
          </p>
          <div className="contact-line">
            <a href={`mailto:${site.email}`}>
              <AtSign size={13} className="icon-inline" />
              {site.email}
            </a>
            <span>
              <MapPin size={13} className="icon-inline" />
              kediri / remote
            </span>
            <span>
              <Coffee size={13} className="icon-inline" />
              always brewing
            </span>
          </div>
          <div className="contact-socials">
            <a className="button-primary" href={`mailto:${site.email}`}>
              start a conversation <ArrowUpRight size={14} />
            </a>
            <a
              className="button-ghost"
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/arifinoid <ArrowUpRight size={13} />
            </a>
            <a
              className="button-ghost"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin/rohmadarifin <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
