import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(['prompts', 'skills', 'agents', 'guides', 'enterprise']),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  date: z.coerce.date(),
  featured: z.boolean().default(false),
});

const prompts = defineCollection({ type: 'content', schema: baseSchema });
const skills = defineCollection({ type: 'content', schema: baseSchema });
const agents = defineCollection({ type: 'content', schema: baseSchema });
const guides = defineCollection({ type: 'content', schema: baseSchema });
const enterprise = defineCollection({ type: 'content', schema: baseSchema });

export const collections = { prompts, skills, agents, guides, enterprise };
