const Music = require('../model/music');

const addMusic = async (req, res, next) => {
  const body = req.body;

  const newSong = new Music({
    name: body.name,
    song: body.song,
    date: body.date,
    album: body.album,
    singers: body.singers,
  });

  try {
    await newSong.save();
  } catch (err) {
    return res.send(err);
  }

  res.send({ song: newSong });
};

const uploadSong = async (req, res, next) => {
  const path = req.file.path.replaceAll('\\', '/');

  res.send({
    path: path,
    fileName: req.file.filename,
  });
};

const getSongs = async (req, res, next) => {
  let songs = [];

  try {
    songs = await Music.find({});
  } catch (err) {
    return res.send(err);
  }

  res.send({
    songs: songs,
  });
};

const getSongById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.send('Please send the id of the song');
  }

  let song;

  try {
    song = await Music.findById(id);
  } catch (err) {
    return res.send(err);
  }

  res.send({
    song: song,
  });
};

const updateSongDetails = async (req, res, next) => {
  const { id } = req.params;

  const body = req.body;

  if (!id) {
    return res.send('Please send the id of the song');
  }

  let song;

  const newSongData = {
    name: body.name,
    song: body.song,
    date: body.date,
    album: body.album,
    singers: body.singers,
  }

  try {
    song = await Music.findByIdAndUpdate(id, newSongData, { new: true });
  } catch (err) {
    return res.send(err);
  }

  res.send(song);
};

const deleteSong = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.send('Please send the id of the song');
  }

  try {
    await Music.findByIdAndDelete(id);
  } catch (err) {
    return res.send(err);
  }

  res.send({ message: 'Deleted Successfully' });
}

module.exports = { addMusic, uploadSong, getSongs, getSongById, updateSongDetails, deleteSong };
