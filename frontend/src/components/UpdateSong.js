import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './AddSong.css';

import Header from './Header';

const UpdateSong = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [song, setSong] = useState('');
  const [singers, setSingers] = useState([]);
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`http://localhost:5000/api/music/${id}`)
      .then((res) => {
        const data = res.data.song;

        const formattedDate = new Date(data.date).toISOString().substr(0, 10);

        setName(data.name);
        setDate(formattedDate);
        setSong(data.song);
        setSingers(data.singers && data.singers?.join(','));
        setAlbum(data.album);
        console.log(new Date(data.date))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleOnChange = (event, id) => {
    const value = event.target.value;

    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'album':
        setAlbum(value);
        break;
      case 'singers':
        setSingers(value);
        break;
      case 'file':
        const attachedFiles = event.target.files[0];
        setFile(attachedFiles);
        break;
      default:
        break;
    }
  };

  const uploadSong = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();

    formData.append('song', file);

    axios
      .post(`http://localhost:5000/api/music/upload/song`, formData)
      .then((res) => {
        setSong(res.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSong = () => {
    const newSong = {
      name: name,
      song: song,
      date: moment(date).format('YYYY-MM-DD'),
      album: album,
      singers: singers && singers?.split(','),
    };

    axios
      .put(`http://localhost:5000/api/music/${id}`, newSong)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className='form'>
        <h2>Update Song</h2>
        <div className='form-element'>
          <label>Name: </label>
          <input type='text' onChange={(event) => handleOnChange(event, 'name')} value={name} />
        </div>
        <div className='form-element'>
          <label>Song: </label>
          <input type='text' onChange={(event) => handleOnChange(event, 'song')} value={song} disabled />
        </div>
        <div className='form-element'>
          <label>Album: </label>
          <input type='text' onChange={(event) => handleOnChange(event, 'album')} value={album} />
        </div>
        <div className='form-element'>
          <label>Singers: </label>
          <input type='text' onChange={(event) => handleOnChange(event, 'singers')} value={singers} />
        </div>
        <div className='form-element'>
          <label>Date: </label>
          <input type='date' onChange={(event) => handleOnChange(event, 'date')} value={date} />
        </div>
        <br />
        <br />
        <div className='form-element flex-end'>
          <button onClick={addSong}>Edit Song</button>
        </div>
      </div>

      <div className='upload-wrapper'>
        <input type='file' onChange={(event) => handleOnChange(event, 'file')} accept='audio/mp3' />
        <button onClick={uploadSong}>Upload Song</button>
      </div>
    </>
  );
};

export default UpdateSong;
