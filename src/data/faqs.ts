export const faqs = [
  {
    question: "Why does first-party web analytics matter?",
    answer:
      "First-party analytics keeps your users' data on your own server instead of shipping it to third-party vendors. This builds trust with your audience since they don't see their data being shipped through the door to third parties. This reflects possitively on your brand and reinforces credibility.",
  },
  {
    question: "What's self-hosting like?",
    answer:
      "Infinity Metrics runs on Docker and uses SQLite. No need for any external Database server setup or maintenance. It can run in a 512MB RAM VPS. Plus, it supports multiple websites out of the box. You can also run it in Kubernetes, Coolify or similar container orchestration platforms.",
  },
  {
    question: "How easy is the setup?",
    answer:
      "You can use our installer that will do the heavy lifting for you. Updates? They're automated, zero-downtime, and always backward-compatible. You can also install it manually, it's just Docker and SQLite. Check our docs for more info.",
  },
  {
    question: "Can I manage my data?",
    answer:
      "Totally. It's a SQLite database, query it, export it, or plug it into your tools anytime. Your data, your rules.",
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
    question: "What does 'bare bones support' include?",
    answer:
      "Bare bones support includes basic installation help, bug reports, and essential troubleshooting via email. This covers getting you up and running and fixing any software issues. It doesn't include custom feature development, extensive configuration consulting, or priority support channels.",
  },
  {
    question: "Do updates cost extra?",
    answer:
      "Updates within the same major version (1.0 to 1.1) are free. Regarding major version upgrades (1.x to 2.x), I'm still determining the pricing structure. Since this is a new product, I want to be honest that I haven't finalized how future major version upgrades will be handled yet. You'll always have the choice whether to upgrade to a new major version when the time comes.",
  },
  {
    question: "Is it GDPR compliant?",
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
  {
    question: "Can Adblockers block InfinityMetrics?",
    answer:
      "No they can't. Since Infinity Metrics is self-hosted on your domain, adblockers and privacy software can't block your analytics script. This means you get complete, accurate data without gaps from blocked requests. Plus, serving analytics from your own domain strengthens user trust since no data is shared with external domains - everything stays on your server.",
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
