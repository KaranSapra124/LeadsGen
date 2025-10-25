import express from "express";
import { createLead, getLeads } from "../Controller/LeadsController.js";
const router = express.Router();

// Leads Routes
router.post("/add-lead", createLead);
router.get("/get-leads", getLeads);

export default router