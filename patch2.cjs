const fs = require('fs');
let content = fs.readFileSync('src/routes/calculator.$slug.tsx', 'utf-8');

// The mentor block logic
const mentorBlock = `
                    <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                      These answers come only from the figures above. This page holds no benchmark,
                      no market average and no opinion on whether a number is good — it does the
                      arithmetic and shows its working.
                    </p>
                  </>
                )}
              </div>

              {calculator.mentorAnalysis && issues.length === 0 && (
                <div className="glass mo-card mt-6 overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent shadow-[0_0_20px_rgba(200,80,20,0.3)]">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {calculator.mentorAnalysis(values, readings).header}
                    </h3>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {calculator.mentorAnalysis(values, readings).tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent/80 shadow-[0_0_8px_rgba(200,80,20,0.8)]" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
`;

content = content.replace(/<p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">[\s\S]*?<\/div>[\s\S]*?<\/div>/, mentorBlock);

fs.writeFileSync('src/routes/calculator.$slug.tsx', content);
