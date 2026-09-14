const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/case-studies.json', 'utf8'));

data.forEach(study => {
  // 1. Remove financial figures
  delete study.initial_investment;
  delete study.revenue;
  delete study.time_to_first_dollar;
  delete study.time_to_scaling;

  // Modify execution milestones to remove revenue and specific amounts/dates
  if (study.execution_milestones) {
    study.execution_milestones.forEach(m => {
      delete m.revenue_reached_usd;
      m.month = m.month.replace(/Month \d+(-?\d+)?/g, 'Phase');
      // scrub specific numbers from key_action if they are financial or views
      m.key_action = m.key_action.replace(/\$[0-9,]+/g, 'revenue');
      m.key_action = m.key_action.replace(/[0-9,]+ views/g, 'significant traction');
      m.key_action = m.key_action.replace(/12 videos/g, 'several videos');
    });
  }

  // 2. Remove invented persons
  delete study.founder_profile;
  study.is_composite = "This is an illustrative composite case study representing common patterns in this business model. It does not represent a specific real founder.";

  // 3. Set data_level
  study.data_level = "PLACEHOLDER";

  // 4. Remove brands and specific AI tools
  if (study.tech_stack_and_tools) {
    study.tech_stack_and_tools = study.tech_stack_and_tools.map(tool => {
      const lower = tool.toLowerCase();
      if (lower.includes('claude') || lower.includes('chatgpt') || lower.includes('openai')) return 'AI Language Model';
      if (lower.includes('midjourney')) return 'AI Image Generator';
      if (lower.includes('elevenlabs')) return 'AI Voice Generator';
      if (lower.includes('instantly') || lower.includes('smartlead')) return 'Cold Email Tool';
      if (lower.includes('stripe')) return 'Payment Processor';
      if (lower.includes('canva')) return 'Design Tool';
      if (lower.includes('epidemic sound')) return 'Audio Library';
      if (lower.includes('davinci')) return 'Video Editor';
      if (lower.includes('notion') || lower.includes('airtable')) return 'Database Tool';
      if (lower.includes('cloudflare')) return 'DNS Provider';
      if (lower.includes('mxtoolbox')) return 'DNS Audit Tool';
      if (lower.includes('google workspace') || lower.includes('g-suite')) return 'Email Provider';
      if (lower.includes('framer') || lower.includes('webflow')) return 'Website Builder';
      if (lower.includes('apollo') || lower.includes('zoominfo')) return 'Lead Database';
      if (lower.includes('neverbounce')) return 'Email Verifier';
      if (lower.includes('zapier') || lower.includes('make')) return 'Automation Tool';
      if (lower.includes('make.com')) return 'Automation Tool';
      if (lower.includes('cal.com') || lower.includes('calendly')) return 'Scheduling Link';
      if (lower.includes('youtube')) return 'Video Platform';
      if (lower.includes('tiktok')) return 'Short-form Video Platform';
      if (lower.includes('linkedin')) return 'Professional Network';
      if (lower.includes('twitter') || lower.includes('x')) return 'Social Network';
      if (lower.includes('upwork') || lower.includes('fiverr')) return 'Freelance Platform';
      if (lower.includes('carrd')) return 'Landing Page Builder';
      if (lower.includes('gumroad')) return 'Checkout Platform';
      
      return 'Industry Standard Tool'; // generic fallback
    });
    // Deduplicate
    study.tech_stack_and_tools = [...new Set(study.tech_stack_and_tools)];
  }

  // Scrub specific numbers and names from customer_acquisition_tactics
  if (study.customer_acquisition_tactics) {
     study.customer_acquisition_tactics = study.customer_acquisition_tactics.map(t => {
       return t
       .replace(/YouTube Shorts and TikTok/gi, 'short-form video platforms')
       .replace(/YouTube/gi, 'video platforms')
       .replace(/LinkedIn/gi, 'professional networks')
       .replace(/Reddit/gi, 'forums')
       .replace(/Indie Hackers/gi, 'founder communities')
       .replace(/Twitter/gi, 'social media')
       .replace(/SEO/g, 'search engine optimization')
       .replace(/\$[0-9,]+/g, 'a small budget')
     });
  }

  // Scrub key takeaways
  if (study.key_takeaways_for_founders) {
     study.key_takeaways_for_founders = study.key_takeaways_for_founders.map(t => {
       return t
       .replace(/YouTube/gi, 'Video platforms')
       .replace(/\$[0-9,]+/g, 'premium pricing')
       .replace(/[0-9]+x/g, 'significantly')
       .replace(/enjoy \$[0-9]+-\$[0-9]+ CPMs, 4x higher than/gi, 'generate significantly higher advertiser returns than')
       .replace(/over 55%/g, 'the majority')
     });
  }

  // Scrub problem identified
  if (study.problem_identified) {
     study.problem_identified = study.problem_identified
       .replace(/in 2024 /g, '')
       .replace(/in 2023 /g, '')
       .replace(/Google and Yahoo/g, 'Major email providers')
       .replace(/Apollo/g, 'lead databases')
  }

  // Scrub solution and offer
  if (study.solution_and_offer) {
     study.solution_and_offer = study.solution_and_offer
       .replace(/\$[0-9,]+/g, 'premium pricing')
       .replace(/AI motion graphics/g, 'generated motion graphics')
  }

  // Scrub bottlenecks
  if (study.primary_bottleneck_and_fix) {
     study.primary_bottleneck_and_fix = study.primary_bottleneck_and_fix
       .replace(/Upwork/g, 'freelance platforms')
       .replace(/Fiverr/g, 'freelance platforms')
       .replace(/NeverBounce/g, 'verification tools')
       .replace(/Apollo/g, 'lead databases')
       .replace(/\$[0-9,]+/g, 'market rates')
  }

  // execution milestones cleanups
  if (study.execution_milestones) {
     study.execution_milestones.forEach(m => {
       m.key_action = m.key_action
         .replace(/ElevenLabs/g, 'voice generation tools')
         .replace(/Midjourney/g, 'image generation tools')
         .replace(/DaVinci Resolve/g, 'video editors')
         .replace(/Cloudflare API/g, 'DNS APIs')
         .replace(/AdSense/g, 'platform ad revenue')
         .replace(/YouTube/g, 'the platform')
         .replace(/Upwork/g, 'freelance platforms')
     });
  }

});

fs.writeFileSync('data/case-studies.json', JSON.stringify(data, null, 2));
