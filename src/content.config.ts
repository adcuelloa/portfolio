import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

/**
 * Layout: src/content/<collection>/<locale>/<slug>.md
 * The same file name in both locale folders marks the two as translations of each other.
 */

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      /** What the work is. Employment, independent and open-source work are never mixed up. */
      kind: z.enum(["employment", "independent", "open-source"]),
      status: z.enum(["live", "development", "experimental"]).optional(),
      /** One honest sentence about maturity and adoption, e.g. development vs. production use. */
      statusNote: z.string(),
      /** Verifiable implementation facts, shown on featured cards. */
      highlights: z.array(z.string()).max(4).default([]),
      /** Initiatives in formation may not have a technology stack yet. */
      stack: z.array(z.string()),
      links: z
        .object({
          live: z.url().optional(),
          repository: z.url().optional(),
        })
        .default({}),
      /** Genuine screenshot of a live public page, mastered on the CDN (R2). Never an invented interface. */
      image: z.url().optional(),
      imageAlt: z.string().optional(),
      /** Where the screenshot was taken from, shown as a caption. */
      imageSource: z.string().optional(),
      /** The screenshot shows sample data (e.g. a marketing mock-up); a visible disclaimer is rendered. */
      illustrativeMockup: z.boolean().default(false),
      /** Meta description for the case-study page (required by the SEO audit once the entry has a body). */
      seoDescription: z.string().min(110).max(160).optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
    })
    .refine((data) => !data.image || Boolean(data.imageAlt && data.imageSource), {
      message: "imageAlt and imageSource are required when image is set",
    }),
});

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(110).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Drafts are never built, listed or added to the sitemap. */
    draft: z.boolean().default(false),
    seoTitle: z.string().max(60).optional(),
  }),
});

export const collections = { projects, articles };
