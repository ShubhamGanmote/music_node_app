import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './Home.css';

import PlayIcon from '../assets/play.png';

import Loader from './Loader';
import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getSongsList();
  }

  getSongsList() {
    axios
      .get('http://localhost:5000/api/music')
      .then((res) => {
        this.setState({
          songs: res.data.songs,
          isLoading: false,
        });
      })
      .catch((err) => {
        alert('Something went wrong!');
        console.log(err);
      });
  }

  deleteSong(id) {
    if (!id) {
      return;
    }

    axios
      .delete(`http://localhost:5000/api/music/${id}`)
      .then((res) => {
        this.getSongsList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return this.state.isLoading ? (
      <div className='center'>
        <Loader />
      </div>
    ) : (
      <>
        <Header />
        <div className='wrapper'>
          <div className='list-header-wrapper'>
            <div className='slno'>#</div>
            <div className='name'>Name</div>
            <div className='album'>Album</div>
            <div className='singers'>Singers</div>
            <div className='date'>Date</div>
            <div className='actions'>Actions</div>
          </div>
          {this.state.songs.map((song, index) => (
            <div className='list-wrapper' key={song._id}>
              <div className='slno'>{`#${index + 1}`}</div>
              <Link className='name' to={`/song/${song._id}`}>
                <span>{song.name}</span>
                <img className='play-icon' src={PlayIcon} alt='' />
              </Link>
              <div className='album'>{song.album}</div>
              <div className='singers'>
                {song.singers.map((singer, index) => (
                  <span key={index}>{singer}</span>
                ))}
              </div>
              <div className='date'>{moment(song.date).format('L')}</div>
              <div className='actions'>
                <Link to={`update/${song._id}`}>Update Song</Link>
                <div onClick={() => this.deleteSong(song._id)}>Delete Song</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
