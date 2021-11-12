import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import './Song.css';

import HeadPhoneIcon from '../assets/headphone.jpeg';

import Loader from './Loader';
import Header from './Header';

const Song = (props) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState(false);
  const [songUrl, setSongUrl] = useState('');
  const [buttonText, setButtonText] = useState('Play Song');

  const audioRef = createRef();

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`http://localhost:5000/api/music/${id}`)
      .then((res) => {
        setSong(res.data.song);
        setIsLoading(false);
      })
      .catch((err) => {
        alert('Something went wrong!');
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/api/music/song/play/${id}`, { responseType: 'blob' })
      .then((res) => {
        const mp3 = new Blob([res.data], { type: 'audio/mp3' });
        const url = window.URL.createObjectURL(mp3);
        setSongUrl(url);
      })
      .catch((err) => {
        console.log('play audio error: ', err);
      });
  }, [id]);

  const playAudio = async () => {
    if (buttonText === 'Play Song') {
      audioRef.current.load();
      audioRef.current.play();
      setButtonText('Pause Song');
    } else if (buttonText === 'Pause Song') {
      audioRef.current.pause();
      setButtonText('Play Song');
    }
  };

  return isLoading ? (
    <div className='center'>
      <Loader />
    </div>
  ) : (
    <>
      <Header />
      <div className='song-wrapper'>
        <div className='album-image'>
          <img className='album-img' src={HeadPhoneIcon} alt='' />
        </div>
        <div className='details'>
          <div className='song-name'>{song.name}</div>
          <div className='song-album'>{song.album}</div>
          <div className='song-singers'>{song.singers?.join(', ')}</div>
          <div className='song-date'>{moment(song.date).format('LL')}</div>
          <div className='play-button'>
            <button onClick={playAudio}>{buttonText}</button>
          </div>
          <audio ref={audioRef} src={songUrl} />
        </div>
      </div>
    </>
  );
};

export default Song;
