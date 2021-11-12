const express = require('express');

const { upload } = require('../utils/upload');
const { addMusic, uploadSong, getSongs, getSongById, updateSongDetails, deleteSong } = require('../controller/music');

const router = express.Router();

router.get('/', getSongs);
router.get('/:id', getSongById);

router.post('/add', addMusic);
router.post('/upload/song', upload.single('song'), uploadSong);

router.put('/:id', updateSongDetails);
router.delete('/:id', deleteSong);

module.exports = router;
