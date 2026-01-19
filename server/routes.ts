import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertTeamRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendRegistrationConfirmation } from "./email.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/registrations", async (req, res) => {
    try {
      const data = insertTeamRegistrationSchema.parse(req.body);
      const registration = await storage.createTeamRegistration(data);
      
      // Send confirmation email (don't block the response)
      sendRegistrationConfirmation(
        data.email,
        data.teamName,
        data.captainName,
        data.memberCount
      ).catch(err => console.error("Failed to send confirmation email:", err));
      
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Failed to register team" });
      }
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getTeamRegistrations();
      res.json(registrations);
    } catch (error) {
      console.error("Get registrations error:", error);
      res.status(500).json({ message: "Failed to get registrations" });
    }
  });

  app.delete("/api/registrations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTeamRegistration(id);
      if (deleted) {
        res.status(200).json({ message: "Team deleted successfully" });
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      console.error("Delete registration error:", error);
      res.status(500).json({ message: "Failed to delete team" });
    }
  });

  return httpServer;
}
