// backend/controllers/progressController.js
const Progress = require("../models/Progress.js");
const { mergeIntervals } = require("../utils/intervalUtils.js");

/**
 * GET /api/progress/:userId
 * Get progress data for a user.
 */
const getProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.findOne({ userId });
    if (!progress) {
      return res.status(404).json({ message: "User progress not found" });
    }
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/progress/:userId/percentage/:videoLength
 * Fetch progress percentage for a given video length in seconds
 */
const getProgressPercentage = async (req, res, next) => {
  try {
    const { userId, videoLength } = req.params;
    const videoLenNum = Number(videoLength);
    if (isNaN(videoLenNum) || videoLenNum <= 0) {
      return res.status(400).json({ message: "Invalid video length" });
    }

    const progress = await Progress.findOne({ userId });
    if (!progress) {
      return res.json({ totalProgress: 0, progressPercentage: 0 });
    }

    const progressPercent = Math.min(
      (progress.totalProgress / videoLenNum) * 100,
      100
    );

    res.json({
      totalProgress: progress.totalProgress,
      progressPercentage: Number(progressPercent.toFixed(2)),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/progress
 * Body: { userId: string, intervals: [{start:Number, end:Number}] }
 * Update user progress by merging intervals and calculating total unique watch time
 */
const updateProgress = async (req, res, next) => {
  try {
    const { userId, intervals } = req.body;

    if (!userId || !Array.isArray(intervals)) {
      return res
        .status(400)
        .json({ message: "Invalid input: userId and intervals are required" });
    }

    // Validation & sanitization done in middleware (see below)

    const cleanedIntervals = intervals
      .filter(
        (iv) =>
          iv.start !== undefined && iv.end !== undefined && iv.end > iv.start
      )
      .map((iv) => ({
        start: Math.max(0, Number(iv.start)),
        end: Math.max(0, Number(iv.end)),
      }));

    if (!cleanedIntervals.length) {
      return res.status(400).json({ message: "No valid intervals sent" });
    }

    let progress = await Progress.findOne({ userId });
    let combinedIntervals = cleanedIntervals;

    if (progress) {
      combinedIntervals = [...progress.watchedIntervals, ...cleanedIntervals];
    } else {
      progress = new (require("../models/Progress"))({ userId });
    }

    const merged = mergeIntervals(combinedIntervals);
    const totalUniqueSeconds = merged.reduce(
      (acc, iv) => acc + (iv.end - iv.start),
      0
    );
    const lastWatched = merged.length ? merged[merged.length - 1].end : 0;

    progress.watchedIntervals = merged;
    progress.totalProgress = totalUniqueSeconds;
    progress.lastWatched = lastWatched;
    await progress.save();

    res.json(progress);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProgress,
  updateProgress,
  getProgressPercentage,
};
