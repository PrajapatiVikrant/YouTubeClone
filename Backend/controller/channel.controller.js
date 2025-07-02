import Channel from '../models/Channel.js';

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const owner = req.user.id; // from JWTverify middleware

    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner,
    });

    await newChannel.save();

    res.status(201).json({ message: 'Channel created successfully', channel: newChannel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create channel', error: error.message });
  }
};

// Get all channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('owner', 'name email');
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch channels', error: error.message });
  }
};

// Get a single channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('owner', 'name email');
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch channel', error: error.message });
  }
};

// Update a channel (only by owner)
export const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const channel = await Channel.findById(id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this channel' });
    }

    const updatedChannel = await Channel.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'Channel updated', channel: updatedChannel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update channel', error: error.message });
  }
};

// Delete a channel
export const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findById(id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });

    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this channel' });
    }

    await Channel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete channel', error: error.message });
  }
};
