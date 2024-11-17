import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createProduct); 
router.get("/", getAllProducts);
router.put("/:id", authenticateToken, updateProduct); 
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
