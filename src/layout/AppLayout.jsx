import { useContext } from 'react';
import './app-layout.css';
import { ThemeContext } from './ThemeContext';

// eslint-disable-next-line react/prop-types
function AppLayout({ children }) {
  return (
    <div className="app-container">
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
