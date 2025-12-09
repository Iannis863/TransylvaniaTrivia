import { type User, type InsertUser, type TeamRegistration, type InsertTeamRegistration, teamRegistrations } from "@shared/schema";
import { db } from "./db";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTeamRegistration(registration: InsertTeamRegistration): Promise<TeamRegistration>;
  getTeamRegistrations(): Promise<TeamRegistration[]>;
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
    };
    this.registrations.set(id, newRegistration);
    return newRegistration;
  }

  async getTeamRegistrations(): Promise<TeamRegistration[]> {
    return Array.from(this.registrations.values());
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
}

export const storage = new DatabaseStorage();
