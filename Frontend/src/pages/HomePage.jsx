import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserProgressPercentage } from "../services/progressServices.jsx";

export default function HomePage() {
  const { user, token } = useAuth();
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    async function fetchProgress() {
      try {
        if (user && token) {
          const videoLength = 600; // set your actual video length in seconds here or fetch dynamically
          const result = await getUserProgressPercentage(user._id, videoLength);
          setProgressPercent(result.progressPercentage || 0);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      }
    }
    fetchProgress();
  }, [user, token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      <div className="mb-6 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-3">Your Progress</h2>
        <p>
          You have watched <strong>{progressPercent.toFixed(1)}%</strong> of the
          video.
        </p>
      </div>

      <div className="space-x-4">
        <a
          href="/video"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Continue Learning
        </a>
      </div>
    </div>
  );
}
