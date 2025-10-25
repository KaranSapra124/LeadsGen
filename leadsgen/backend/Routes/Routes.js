import express from "express";
import { createLead, deleteLead, getLeads } from "../Controller/LeadsController.js";
const router = express.Router();

// Leads Routes
router.post("/add-lead", createLead);
router.get("/get-leads", getLeads);
router.get('/delete-leads/:id', deleteLead)

export default router