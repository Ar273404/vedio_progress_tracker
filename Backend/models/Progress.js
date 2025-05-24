import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  // Store watched time intervals as arrays of [start, end] in seconds
  intervals: {
    type: [[Number, Number]],
    default: [],
  },
  // Store last position in the video (for resume)
  lastPosition: {
    type: Number,
    default: 0,
  },
  // Store calculated progress percentage
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure a user can only have one progress entry per video
progressSchema.index({ user: 1, video: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
