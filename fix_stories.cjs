const fs = require('fs');
let content = fs.readFileSync('src/routes/founder-stories.$slug.tsx', 'utf8');

// The SEO title
content = content.replace(/How \$\{study.founder_profile.founder_alias\} scaled a \$\{study.story_theme\} to \$\$\{study.revenue.monthly_revenue_usd.toLocaleString\(\)\}\/mo\./g, 
  'How this founder scaled a ${study.story_theme} without venture capital.');

// Financial stats card
content = content.replace(/\{formatUsd\(study\.revenue\.monthly_revenue_usd\)\}/g, '\"Premium Pricing\"');
content = content.replace(/\{formatUsd\(study\.revenue\.annual_run_rate_usd\)\}/g, '\"Sustainable Scale\"');
content = content.replace(/\{study\.revenue\.net_profit_margin_percent\}%/g, '\"High Margin\"');
content = content.replace(/\{formatUsd\(study\.initial_investment\.total_amount_usd\)\}/g, '\"Bootstrapped\"');
content = content.replace(/\{study\.time_to_first_dollar\}/g, '\"Rapid Validation\"');
content = content.replace(/From \\\$0 to "Premium Pricing"\/mo/g, 'Zero to Traction');

// Fix founder alias
content = content.replace(/\{study\.founder_profile\.founder_alias\}/g, '\"Verified Operator\"');
content = content.replace(/\{study\.founder_profile\.location\}/g, '\"Global\"');

// Milestone revenue
content = content.replace(/\{formatUsd\(milestone\.revenue_reached_usd\)\}\/mo/g, 'Milestone Achieved');

fs.writeFileSync('src/routes/founder-stories.$slug.tsx', content);
