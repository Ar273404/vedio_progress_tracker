import Video from "../models/Video.js";

// Get all videos
export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().select(
      "_id title description thumbnailUrl duration"
    );

    res.status(200).json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

// Get single video
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      video,
    });
  } catch (err) {
    next(err);
  }
};

// Create sample videos (used for demo/testing)
export const createSampleVideos = async (req, res, next) => {
  try {
    const sampleVideos = [
      {
        title: "Introduction to JavaScript",
        description:
          "Learn the basics of JavaScript programming language including variables, data types, and functions.",
        videoUrl:
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnailUrl:
          "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        duration: 182, // 3:02 in seconds
      },
      {
        title: "Advanced CSS Techniques",
        description:
          "Master advanced CSS concepts like Flexbox, Grid, and CSS Variables to create responsive layouts.",
        videoUrl:
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnailUrl:
          "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
        duration: 249, // 4:09 in seconds
      },
      {
        title: "React Hooks Explained",
        description:
          "Understand how to use React Hooks like useState, useEffect, and useContext to manage state and side effects.",
        videoUrl:
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        thumbnailUrl:
          "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
        duration: 315, // 5:15 in seconds
      },
    ];

    // Check if videos already exist
    const existingVideos = await Video.countDocuments();

    if (existingVideos > 0) {
      return res.status(400).json({
        success: false,
        message: "Sample videos already exist",
      });
    }

    await Video.create(sampleVideos);

    res.status(201).json({
      success: true,
      count: sampleVideos.length,
      message: "Sample videos created successfully",
    });
  } catch (err) {
    next(err);
  }
};
