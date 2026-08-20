import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    summary: z.string(),
    intro: z.string(),
    typicalWork: z.array(z.string()),
    process: z.array(z.string()),
    suitableFor: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { services };
