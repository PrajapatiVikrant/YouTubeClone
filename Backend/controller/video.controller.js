import Video from '../models/Video.js';
import Channel from '../models/Channel.js';

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
    } = req.body;

    const channelId = req.user.channelId; // assumes auth middleware sets channelId

    const newVideo = new Video({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channel: channelId,
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('channel', 'channelName')
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

// Get video by ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel', 'channelName');

    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch video', error: error.message });
  }
};

// Update a video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });

    const channelId = req.user.channelId;
    if (video.channel.toString() !== channelId)
      return res.status(403).json({ message: 'Unauthorized to update this video' });

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: 'Video updated', video: updatedVideo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update video', error: error.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });

    const channelId = req.user.channelId;
    if (video.channel.toString() !== channelId)
      return res.status(403).json({ message: 'Unauthorized to delete this video' });

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete video', error: error.message });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments.push({
      userId: req.user.id, // from auth middleware
      text,
    });

    await video.save();
    res.status(201).json({ message: 'Comment added successfully', comments: video.comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};
