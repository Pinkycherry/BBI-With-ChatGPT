const fs = require('fs');
let content = fs.readFileSync('src/routes/calculator.index.tsx', 'utf-8');

// The original grid card:
// <Link
//   key={calculator.slug}
//   to="/calculator/$slug"
//   params={{ slug: calculator.slug }}
//   className="glass mo-card flex h-full flex-col gap-3 rounded-2xl p-6"
// >

const enhancedCard = `
              <Link
                key={calculator.slug}
                to="/calculator/$slug"
                params={{ slug: calculator.slug }}
                className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-muted/30 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:border-primary/30"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />
                <h2 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {calculator.title} <span className="text-accent">{calculator.highlight}</span>
                </h2>
`;

content = content.replace(/<Link[\s\S]*?className="glass mo-card flex h-full flex-col gap-3 rounded-2xl p-6"\n\s*>\n\s*<h2 className="font-display text-xl font-bold tracking-tight">\n\s*\{calculator\.title\} <span className="text-accent">\{calculator\.highlight\}<\/span>\n\s*<\/h2>/, enhancedCard);

fs.writeFileSync('src/routes/calculator.index.tsx', content);
