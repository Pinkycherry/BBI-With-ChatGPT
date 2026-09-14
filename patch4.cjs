const fs = require("fs");
let content = fs.readFileSync("src/routes/calculator.$slug.tsx", "utf-8");

// Replace FieldInput rendering
const fieldInputReplaced = `
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-input/60 bg-gradient-to-b from-card to-card/50 px-3 py-1 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-primary/50">
        {field.prefix && (
          <span aria-hidden className="text-sm font-medium text-muted-foreground/80">
            {field.prefix}
          </span>
        )}
        <input
          id={id}
          name={field.key}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-describedby={issue ? \`\${helpId} \${errorId}\` : helpId}
          className="w-full bg-transparent py-1.5 text-base font-semibold outline-none placeholder:text-muted-foreground"
`;
content = content.replace(
  /<div className="mt-1\.5 flex items-center gap-2 rounded-md border border-input bg-card px-3 focus-within:border-primary">[\s\S]*?<input[\s\S]*?aria-describedby=\{issue \? `\$\{helpId\} \$\{errorId\}` : helpId\}/,
  fieldInputReplaced,
);

// Replace ResultRow rendering
const resultRowReplaced = `
  return (
    <li className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 p-4 shadow-sm transition-all hover:shadow-md">
      {reading.primary && (
        <div className="absolute top-0 right-0 h-16 w-16 -translate-y-8 translate-x-8 rounded-full bg-primary/20 blur-2xl" />
      )}
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {reading.label}
        </p>
        <p className={reading.primary ? "mt-1 font-display text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm" : "mt-1 text-2xl font-bold tracking-tight text-foreground"}>
          {reading.display}
        </p>
        <p className="mt-3 rounded-md bg-muted/50 px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
          {reading.formula}
        </p>
        {reading.note && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reading.note}</p>}
      </div>
    </li>
  );
`;
content = content.replace(
  /function ResultRow[\s\S]*?<\/li>\n  \);\n}/,
  "function ResultRow({ reading }: { reading: Reading }) {" + resultRowReplaced + "\n}",
);

fs.writeFileSync("src/routes/calculator.$slug.tsx", content);
