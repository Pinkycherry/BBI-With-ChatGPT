const fs = require("fs");
let content = fs.readFileSync("src/routes/calculator.$slug.tsx", "utf-8");

const otherCalculatorsReplaced = `
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                More Analyzers
              </h2>
              <div className="h-px flex-1 bg-border/50"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.slice(0, 6).map((other) => (
                <Link
                  key={other.slug}
                  to="/calculator/$slug"
                  params={{ slug: other.slug }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/20" />
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary mb-2 line-clamp-2">
                      {other.title} <span className="text-accent">{other.highlight}</span>
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {other.answers}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Open Analyzer
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            {others.length > 6 && (
              <div className="mt-8 text-center">
                <Link to="/calculator" className="inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                  View all {others.length + 1} calculators
                </Link>
              </div>
            )}
          </div>
`;

content = content.replace(
  /<div className="glass mt-10 rounded-2xl px-5 py-6 sm:px-7">[\s\S]*?<\/ul>\s*<\/div>/,
  otherCalculatorsReplaced,
);

fs.writeFileSync("src/routes/calculator.$slug.tsx", content);
