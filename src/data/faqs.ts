export const faqs = [
  {
    question: "What's self-hosting like?",
    answer:
      "You own your data, fully. It's lightweight, runs on Docker with just 512MB RAM on any VPS. Plus, it supports multiple websites out of the box.",
  },
  {
    question: "How easy is the setup?",
    answer:
      "One command, done. Installs in seconds via Docker, no fuss. Updates? They're automated, zero-downtime, and always backward-compatible.",
  },
  {
    question: "Can I manage my data?",
    answer:
      "Totally. It's yours in a SQLite database, query it, export it, or plug it into your tools anytime.",
  },
  {
    question: "How does the AI Query feature work? Is my data sent externally?",
    answer:
      "No, your analytics data is never sent externally. When you ask a question in plain English (e.g., \"Show me page views per day for the last week\"), the AI model (running via an API like OpenAI, which requires your own API key configured in the settings) translates your question into an SQL query. This SQL query is then executed *locally* against your own database on your server to retrieve the results. Only the natural language question itself is sent to the AI API for translation, not your underlying visitor data.",
  },
  {
    question: "How does pricing work?",
    answer:
      "One-time payment, lifetime access, no subscriptions. Not happy? We've got a 30-day money-back guarantee.",
  },
  {
    question: "Do updates cost extra?",
    answer:
      "Updates within the same major version (1.0 to 1.1) are free. Regarding major version upgrades (1.x to 2.x), I'm still determining the pricing structure. Since this is a new product, I want to be honest that I haven't finalized how future major version upgrades will be handled yet. You'll always have the choice whether to upgrade to a new major version when the time comes.",
  },
  {
    question: "Is it really GDPR compliant?",
    answer:
      "Yes, 100%. No cookies, no personal data, no consent banners needed. Just anonymous stats, aggregated data, privacy-first by design.",
  },
  {
    question: "What metrics does Infinity Metrics track?",
    answer:
      "Infinity Metrics tracks a wide range of aggregated metrics including: Pageviews, Unique Visitors (daily fingerprint), Sessions, Bounce Rate, Avg. Session Duration, Page-specific views/entrances/exits, Referrer Sources, UTM Campaign parameters (source, medium, campaign, term, content), Browser types, Operating Systems, Device Types (desktop, mobile, tablet), Visitor Country, and any Custom Events you define.",
  },
  {
    question: "How does privacy-first tracking work?",
    answer:
      "Infinity Metrics ditches cookies for fingerprinting and session-based analytics, no personal data stored. You get accurate insights while keeping user privacy intact.",
  },
];

export function getFaqSchema() {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
} 
