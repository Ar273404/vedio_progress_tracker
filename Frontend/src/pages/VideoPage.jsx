import React from "react";
import { useAuth } from "../contexts/AuthContext";
import VideoPlayer from "../components/VideoPlayer";

export default function VideoPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Lecture Video</h1>
      <VideoPlayer userId={user._id} token={user.token} />
    </div>
  );
}
