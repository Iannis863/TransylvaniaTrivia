import { type User, type InsertUser, type TeamRegistration, type InsertTeamRegistration, teamRegistrations } from "@shared/schema";
import { db } from "./db.js";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTeamRegistration(registration: InsertTeamRegistration): Promise<TeamRegistration>;
  getTeamRegistrations(): Promise<TeamRegistration[]>;
  deleteTeamRegistration(id: string): Promise<boolean>;
  markReminderSent(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private registrations: Map<string, TeamRegistration>;

  constructor() {
    this.users = new Map();
    this.registrations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTeamRegistration(registration: InsertTeamRegistration): Promise<TeamRegistration> {
    const id = randomUUID();
    const newRegistration: TeamRegistration = {
      ...registration,
      id,
      phoneNumber: registration.phoneNumber || null,
      createdAt: new Date(),
      reminderSent: false,
    };
    this.registrations.set(id, newRegistration);
    return newRegistration;
  }

  async getTeamRegistrations(): Promise<TeamRegistration[]> {
    return Array.from(this.registrations.values());
  }

  async deleteTeamRegistration(id: string): Promise<boolean> {
    if (this.registrations.has(id)) {
      this.registrations.delete(id);
      return true;
    }
    return false;
  }

  async markReminderSent(id: string): Promise<void> {
    const reg = this.registrations.get(id);
    if (reg) {
      reg.reminderSent = true;
    }
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async createTeamRegistration(registration: InsertTeamRegistration): Promise<TeamRegistration> {
    const [result] = await db.insert(teamRegistrations).values(registration).returning();
    return result;
  }

  async getTeamRegistrations(): Promise<TeamRegistration[]> {
    return await db.select().from(teamRegistrations);
  }

  async deleteTeamRegistration(id: string): Promise<boolean> {
    const result = await db.delete(teamRegistrations).where(eq(teamRegistrations.id, id)).returning();
    return result.length > 0;
  }

  async markReminderSent(id: string): Promise<void> {
    await db.update(teamRegistrations).set({ reminderSent: true }).where(eq(teamRegistrations.id, id));
  }
}

export const storage = new DatabaseStorage();
