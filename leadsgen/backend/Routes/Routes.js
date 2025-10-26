import express from "express";
import { createLead, deleteLead, editLead, getLeads } from "../Controller/LeadsController.js";
import { login, signup, genAIFollowUps } from "../Controller/UserController.js";
const router = express.Router();

// Leads Routes
router.post("/add-lead", createLead);
router.get("/get-leads", getLeads);
router.get('/delete-leads/:id', deleteLead)
router.post('/edit-lead/:id', editLead)
router.post('/ai/follow-up', genAIFollowUps)
// Auth Routes
router.post("/auth/register", signup)
router.post("/auth/login", login)

export default router