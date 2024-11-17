import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, createEvent); 
router.get("/", getAllEvents); 
router.put("/:id", authenticateToken, updateEvent); 
router.delete("/:id", authenticateToken, deleteEvent); 

export default router;
