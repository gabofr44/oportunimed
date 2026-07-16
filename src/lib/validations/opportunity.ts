import { z } from "zod";

export const opportunitySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  institution: z
    .string()
    .min(2, "Institution is required")
    .max(200, "Institution must be at most 200 characters"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["scholarship", "research", "internship", "course"]),
  funding: z.boolean().default(false),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .optional(),
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;

export const searchSchema = z.object({
  query: z.string().max(200).default(""),
  type: z
    .enum(["scholarship", "research", "internship", "course", "all"])
    .default("all"),
  funding: z.boolean().default(false),
  page: z.number().int().positive().default(1),
});

export type SearchInput = z.infer<typeof searchSchema>;

export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export type AuthInput = z.infer<typeof authSchema>;
