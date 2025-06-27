import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multerMemory from "../middleware/multerMemory.js";
import PhotoController from "../controllers/photoController.js";

const router = express.Router();
const upload = multerMemory.single("image");

router.post("/upload", authMiddleware, upload, PhotoController.uploadPhoto);
router.put("/:id", authMiddleware, upload, PhotoController.updatePhoto);
router.patch("/:id/caption", authMiddleware, PhotoController.updateCaption);
router.get("/my", authMiddleware, PhotoController.getMyPhotos);
router.delete("/:id", authMiddleware, PhotoController.deletePhoto);

export default router;
