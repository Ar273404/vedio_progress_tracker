import React, { useRef, useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import {
  updateUserProgress,
  getUserProgress,
  getUserProgressPercentage,
  setAuthToken,
} from "../services/progressServices.jsx";

export default function VideoPlayer({ userId, token }) {
  const videoRef = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const watchingWindow = useRef({ start: null, end: null });

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.onloadedmetadata = async () => {
      setVideoDuration(videoRef.current.duration);
      const progress = await getUserProgressPercentage(
        userId,
        videoRef.current.duration
      );
      setProgressPercent(progress.progressPercentage || 0);
    };

    (async () => {
      const progressData = await getUserProgress(userId);
      if (progressData?.lastWatched && videoRef.current) {
        videoRef.current.currentTime = progressData.lastWatched;
        setWatchedIntervals(progressData.watchedIntervals || []);
      }
    })();
  }, [userId]);

  const mergeIntervals = (intervals) => {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a.start - b.start);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
      let last = merged[merged.length - 1];
      const current = intervals[i];
      if (current.start <= last.end) last.end = Math.max(last.end, current.end);
      else merged.push(current);
    }
    return merged;
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;

    if (watchingWindow.current.start === null) {
      watchingWindow.current.start = currentTime;
      watchingWindow.current.end = currentTime;
    } else {
      if (currentTime > watchingWindow.current.end) {
        watchingWindow.current.end = currentTime;
      } else if (currentTime < watchingWindow.current.end - 1) {
        pushInterval();
        watchingWindow.current.start = currentTime;
        watchingWindow.current.end = currentTime;
      }
    }
  };

  const pushInterval = () => {
    if (watchingWindow.current.start === null) return;

    const newInterval = {
      start: watchingWindow.current.start,
      end: watchingWindow.current.end,
    };
    if (newInterval.end - newInterval.start < 1) {
      watchingWindow.current = { start: null, end: null };
      return;
    }

    const updated = mergeIntervals([...watchedIntervals, newInterval]);
    setWatchedIntervals(updated);
    watchingWindow.current = { start: null, end: null };
    syncProgress(updated);
  };

  const syncProgress = async (intervals) => {
    try {
      if (!intervals.length) return;
      await updateUserProgress({ userId, intervals });
      const progress = await getUserProgressPercentage(userId, videoDuration);
      setProgressPercent(progress.progressPercentage || 0);
    } catch (err) {
      console.error("Error syncing progress:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <video
        ref={videoRef}
        src="/sample-lecture.mp4"
        controls
        className="w-full rounded border border-gray-300"
        onTimeUpdate={onTimeUpdate}
        onPause={pushInterval}
        onEnded={pushInterval}
      />
      <ProgressBar progressPercentage={progressPercent} />
    </div>
  );
}
