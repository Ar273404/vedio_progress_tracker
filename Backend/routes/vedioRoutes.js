import express from "express";
import {
  getVideos,
  getVideo,
  createSampleVideos,
} from "../controllers/videoController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getVideos);
router.get("/:id", getVideo);
router.post("/samples", protect, createSampleVideos);

export default router;
