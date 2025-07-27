// File: astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
	compressHTML: false,
	integrations: [
		tailwind(),
		react(),
		mdx(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
			customPages: [
				"https://getinfinitymetrics.com/privacy-policy",
				"https://getinfinitymetrics.com/terms",
				"https://getinfinitymetrics.com/thank-you",
				"https://getinfinitymetrics.com/docs",
				"https://getinfinitymetrics.com/why-infinity-metrics",
				"https://getinfinitymetrics.com/gdpr",
			],
		}),
	],
	site: "https://getinfinitymetrics.com",
	markdown: {
		syntaxHighlight: 'prism',
		remarkPlugins: [],
		rehypePlugins: [],
		shikiConfig: {
			theme: 'github-dark',
			wrap: true
		}
	},
});
