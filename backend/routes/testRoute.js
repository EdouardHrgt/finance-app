const express = require('express');
const { getDB } = require('./config/dbConnect');
const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const db = getDB();
    const collections = await db.listCollections().toArray();
    res.json({ message: 'MongoDB connected!', collections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
