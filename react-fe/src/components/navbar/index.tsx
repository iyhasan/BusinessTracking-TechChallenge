import React from 'react';
import { authStore } from '../../store';
import './index.css'

const Navbar: React.FC = () => {

    const logout = () => {
        authStore.getState().logout()
    }

    return (
      <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
        <a href="/" className='nav-link'>
          Home
        </a>
        <a href="/profile" className='nav-link'>
          Profile
        </a>
        <div className='right-navs'>
            <a onClick={logout} className='nav-link'>
                Logout
            </a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;