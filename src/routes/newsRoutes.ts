import { Router } from 'express';
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getNewsById,
  getNewsByCategory
} from "../controllers/newsController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createNews);
router.get("/", getAllNews);
router.put("/:id", authenticateToken, updateNews);
router.delete("/:id", authenticateToken, deleteNews);
router.get("/:id", getNewsById);
router.get("/category/:category", getNewsByCategory);

export default router;
