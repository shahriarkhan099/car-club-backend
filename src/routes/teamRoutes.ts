import { Router } from 'express';
import {
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createTeamMember); 
router.get("/", getAllTeamMembers);
router.put("/:id", authenticateToken, updateTeamMember); 
router.delete("/:id", authenticateToken, deleteTeamMember);

export default router;
