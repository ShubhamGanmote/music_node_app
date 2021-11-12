import React from 'react';
import axios from 'axios';

import './Home.css';

import Loader from './Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/music').then(res => {
      this.setState({
        songs: res.data.songs,
        isLoading: false,
      });
    }).catch(err => {
      alert('Something went wrong!');
      console.log(err);
    })
  }

  render() {
    return this.state.isLoading ? (
      <div className="center">
        <Loader />
      </div>
    ) : (
      <div className="home-wrapper">
        <h3>Music App</h3>
        <pre>
          {JSON.stringify(this.state.songs, null, 2)}
        </pre>
      </div>
    )
  }
}

export default Home;
