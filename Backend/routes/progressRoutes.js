import express from "express";
import {
  getAllProgress,
  getVideoProgress,
  updateProgress,
} from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(protect);

router.get("/", getAllProgress);
router.get("/:videoId", getVideoProgress);
router.post("/", updateProgress);

export default router;
