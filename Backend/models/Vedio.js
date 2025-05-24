import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: [true, "Video URL is required"],
  },
  thumbnailUrl: {
    type: String,
    default:
      "https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg",
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
