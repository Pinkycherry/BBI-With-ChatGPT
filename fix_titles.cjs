const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('data/case-studies.json', 'utf8'));

raw.case_studies.forEach(study => {
  // Fix title
  study.title = study.title.replace(/ to \$[0-9]+[KMBkmb]?\/[Mm]onth/, '')
                           .replace(/ to \$[0-9]+[KMBkmb]?/, '')
                           .replace(/ \$[0-9]+[KMBkmb]?\/[Mm]onth/, '');
  
  // Fix the weird 'enjoy premium pricing-premium pricing CPMs'
  if (study.key_takeaways_for_founders) {
    study.key_takeaways_for_founders = study.key_takeaways_for_founders.map(t => {
      return t.replace(/enjoy premium pricing-premium pricing CPMs, significantly higher than/, 'generate significantly higher advertiser returns than');
    });
  }

  // Also remove "Google and Yahoo" in customer_acquisition_tactics
  if (study.customer_acquisition_tactics) {
    study.customer_acquisition_tactics = study.customer_acquisition_tactics.map(t => {
      return t.replace(/Google and Yahoo/gi, 'major email provider');
    });
  }
});

fs.writeFileSync('data/case-studies.json', JSON.stringify(raw, null, 2));
