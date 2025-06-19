const express = require('express');
const router = express.Router();
const Artifact = require('../models/Artifact');
const authenticate = require('../middleware/auth');

// @route   POST /api/artifacts
// @desc    Upload a new artifact
// @access  Private
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, imageUrl, description } = req.body;

    const artifact = new Artifact({
      title,
      imageUrl,
      description,
      user: req.user, // ✅ Fix here
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await artifact.save();
    res.status(201).json(artifact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/artifacts
// @desc    Get all artifacts for the logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const artifacts = await Artifact.find({ user: req.user }).sort({ createdAt: -1 }); // ✅ Fix here
    res.json(artifacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/artifacts/:id
// @desc    Update an artifact (only by its creator)
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) return res.status(404).json({ message: 'Artifact not found' });
    if (artifact.user.toString() !== req.user)
      return res.status(403).json({ message: 'Unauthorized access' });

    artifact.title = req.body.title || artifact.title;
    artifact.description = req.body.description || artifact.description;
    artifact.imageUrl = req.body.imageUrl || artifact.imageUrl;
    artifact.updatedAt = new Date();

    await artifact.save();
    res.json(artifact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/artifacts/:id
// @desc    Delete an artifact (soft delete)
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);

    if (!artifact) return res.status(404).json({ message: 'Artifact not found' });
    if (artifact.user.toString() !== req.user)
      return res.status(403).json({ message: 'Unauthorized access' });

    artifact.isDeleted = true;
    artifact.deletedAt = new Date();

    await artifact.save();
    res.json({ message: 'Artifact archived (soft deleted)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
