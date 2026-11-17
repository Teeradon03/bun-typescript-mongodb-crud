import { Router } from "express";
import * as postController from "../controllers/post.controller";
import { auth } from "../middlewares/auth";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../middlewares/validate";

const router = Router();

// อ่านโพสต์ได้โดยไม่ต้อง login
router.get("/get-all-posts", postController.getAll);
router.get("/get-post-by-id/:id", postController.getById);

// สร้าง / แก้ไข / ลบ ต้อง login ก่อน (ผ่าน auth)
router.post("/create-post", auth, validateCreatePost, postController.create);
router.patch(
  "/update-post-by-id/:id",
  auth,
  validateUpdatePost,
  postController.update,
);
router.delete("/delete-post-by-id/:id", auth, postController.remove);

export default router;
