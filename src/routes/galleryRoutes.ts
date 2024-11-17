import { Router } from 'express';
import {
  createGallery,
  getAllGalleries,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createGallery);
router.get("/", getAllGalleries);
router.put("/:id", authenticateToken, updateGallery); 
router.delete("/:id", authenticateToken, deleteGallery); 

export default router;
