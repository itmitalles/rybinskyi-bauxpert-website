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

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      location: z.string(),
      date: z.string().optional(),
      services: z.array(z.string()),
      summary: z.string(),
      cover: image(),
      images: z.array(
        z.object({
          src: image(),
          alt: z.string(),
          stage: z.enum(["vorher", "waehrend", "detail", "nachher"]).optional(),
        }),
      ),
      work: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { services, projects };
