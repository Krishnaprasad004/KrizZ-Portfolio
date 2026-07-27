const TECH_STACK = [
  "Python",
  "SQL",
  "Power BI",
  "Databricks",
  "PySpark",
  "FastAPI",
  "ETL",
  "ELT",
  "Git",
  "GitHub",
];

const LOOP_ITEMS = [...TECH_STACK, ...TECH_STACK];

export default function TechMarquee() {
  return (
    <section className="w-full bg-[#0a0a0a] py-10 sm:hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center gap-3"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {LOOP_ITEMS.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="rounded-full border border-blue-500/30 bg-white/[0.02] px-4 py-2 font-mono text-xs whitespace-nowrap text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
