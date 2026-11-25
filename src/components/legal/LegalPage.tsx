import React from "react";

/* ── Content model ─────────────────────────────────────────────── */
export type LegalBody =
  | { kind: "clauses"; items: { num: string; text: string }[] }
  | { kind: "list"; lead: string; items: string[] }
  | { kind: "text"; text: string };

export type LegalSection = {
  heading: string;
  body: LegalBody;
};

export type LegalContent = {
  title: string;
  intro: string;
  sections: LegalSection[];
  closing: { thanks: string; note: string };
  /** Body text tone — Terms uses 0.7, Privacy uses 0.85 in Figma. */
  bodyToneClass?: string;
};

/* ── Section renderer ──────────────────────────────────────────── */
const SectionBody: React.FC<{ body: LegalBody; tone: string }> = ({ body, tone }) => {
  const base = `font-sans font-medium text-[16px] leading-[30px] ${tone}`;

  if (body.kind === "clauses") {
    return (
      <p className={base}>
        {body.items.map((c, i) => (
          <React.Fragment key={i}>
            <span className="font-extrabold text-[18px] text-[#020202D9]">{c.num} </span>
            {c.text}
            {i < body.items.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </p>
    );
  }

  if (body.kind === "list") {
    return (
      <div className="flex flex-col">
        <p className={base}>{body.lead}</p>
        <ul className={`list-disc ps-[27px] ${base}`}>
          {body.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className={base}>{body.text}</p>;
};

/* ── Page ──────────────────────────────────────────────────────── */
const LegalPage: React.FC<{ content: LegalContent }> = ({ content }) => {
  const tone = content.bodyToneClass ?? "text-[#020202B3]";

  return (
    <main className="bg-white">
      <section className="w-916/1000 xl:w-888/1000 max-w-[1280px] mx-auto pt-28 xl:pt-40 pb-20 xl:pb-28">
        {/* Hero */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif italic font-medium text-[#1a1815] text-[32px] xl:text-[52px] leading-tight tracking-[-0.96px] xl:tracking-[-1.56px]">
            {content.title}
          </h1>
          <p className="font-[family-name:var(--font-work-sans)] font-medium text-[16px] leading-[28.8px] text-[#020202D9]">
            {content.intro}
          </p>
        </div>

        {/* Sections */}
        <div className="mt-12 xl:mt-[50px] flex flex-col gap-5">
          {content.sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-1.5">
              <h2 className="font-sans font-bold capitalize text-[#020202] text-[24px] xl:text-[32px] leading-[31px] xl:leading-[48px]">
                {section.heading}
              </h2>
              <SectionBody body={section.body} tone={tone} />
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-12 xl:mt-[50px] flex flex-col gap-4">
          <p className={`font-sans font-medium text-[15px] leading-[26px] ${tone}`}>
            {content.closing.thanks}
          </p>
          <p className={`font-sans font-medium text-[15px] leading-[26px] ${tone}`}>
            <span className="font-bold">Note:</span> {content.closing.note}
          </p>
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
