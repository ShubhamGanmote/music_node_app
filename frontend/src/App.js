import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home'
import Song from './components/Song';
import AddSong from './components/AddSong';
import UpdateSong from './components/UpdateSong';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/add" element={<AddSong />} />
        <Route path="/update/:id" element={<UpdateSong />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
