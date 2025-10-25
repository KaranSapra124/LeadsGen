import express from "express";
import { createLead } from "../Controller/LeadsController.js";
const router = express.Router();

// Leads Routes
router.post("/add-lead", createLead);

export default router