// src/Layout.js
import React from 'react';
import Navbar from '../navbar';

interface LayoutProps {
    children: React.ReactNode;
}
  
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
        <Navbar />
        <div>{children}</div>
        </div>
    );
};

export default Layout;