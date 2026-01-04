import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const teamRegistrations = pgTable("team_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamName: text("team_name").notNull(),
  captainName: text("captain_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number"),
  memberCount: integer("member_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeamRegistrationSchema = createInsertSchema(teamRegistrations).omit({
  id: true,
  createdAt: true,
}).extend({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  captainName: z.string().min(2, "Captain name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  memberCount: z.number().min(1, "At least 1 member required").max(6, "Maximum 6 members allowed"),
});

export type InsertTeamRegistration = z.infer<typeof insertTeamRegistrationSchema>;
export type TeamRegistration = typeof teamRegistrations.$inferSelect;
