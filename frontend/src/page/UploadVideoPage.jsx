"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2, Sparkles } from "lucide-react";

export default function UploadVideoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please upload a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    setLoading(true);
    try {
      await axios.post("/api/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setTags("");
      setVideo(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload video.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiSuggest = async () => {
    if (!title && !description) {
      alert("Enter at least title or description to get AI suggestions.");
      return;
    }
    const token = localStorage.getItem("token");
    setAiLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/suggest/video", {
        title,
        description,
        tags,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.generated) {
        const aiResponse = res.data.generated
        const cleaned = aiResponse
          .replace(/```json\s*/i, "")  // remove opening ```json
          .replace(/```/g, "")         // remove closing ```
          .trim();
       const jsonResponse = JSON.parse(cleaned);
       setTitle(jsonResponse.title)
        setDescription(jsonResponse.description);
      }
    } catch (err) {
      console.error(err);
      alert("AI suggestion failed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Upload Your Video 🎥
        </h1>

        <form onSubmit={handleUpload} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-medium">Description</label>
            <button
              type="button"
              onClick={handleAiSuggest}
              disabled={aiLoading}
              className="flex cursor-pointer items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              <Sparkles className="w-5 h-5" />
              {aiLoading ? "Generating..." : "Suggest with AI"}
            </button>
          </div>

          <textarea
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-xl mt-1 h-32 focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium">Tags</label>
            <input
              type="text"
              placeholder="e.g. tech, coding, javascript"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="w-full mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Uploading...
              </>
            ) : (
              "Upload Video"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
