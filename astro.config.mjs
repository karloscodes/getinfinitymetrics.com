// File: astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	integrations: [
		tailwind(),
		react(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
			customPages: [
				"https://getinfinitymetrics.com/privacy-policy",
				"https://getinfinitymetrics.com/terms",
				"https://getinfinitymetrics.com/gdpr",
				"https://getinfinitymetrics.com/thank-you",
			],
		}),
	],
	site: "https://getinfinitymetrics.com",
});
