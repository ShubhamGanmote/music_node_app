import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-wrapper'>
      <div className='app-name'>
        <Link to='/'>
          <h3>Music App</h3>
        </Link>
      </div>
      <div className='link-wrapper'>
        <Link to='/add'>Add Song</Link>
      </div>
    </div>
  );
};

export default Header;
