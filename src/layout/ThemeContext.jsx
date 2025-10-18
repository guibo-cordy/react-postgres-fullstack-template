// ThemeContext.js
import { createContext, useState, useEffect } from 'react';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import useUserPreference from '../hooks/useUserPreference';

const ThemeContext = createContext();

const dbthemes = [
  {
    display: true,
    key: 'light',
    label: 'light',
    icon: <SunOutlined />,
  },
  {
    display: true,
    key: 'dark',
    label: 'dark',
    icon: <MoonOutlined />,
  },
];

const themes = Object.fromEntries(
  dbthemes.filter((t) => t.display === true)
    .map((t) => [t.key, t]),
);

function ThemeProvider({ children }) {
  const defaultTheme = 'light';
  const [theme, setTheme] = useState();
  const themeParameter = useUserPreference('idmv-theme');

  const upadateTheme = (value) => {
    const finalValue = themes[value] ? value : defaultTheme;
    setTheme(finalValue);
    document.documentElement.setAttribute('data-theme', finalValue);
    themeParameter.set(finalValue);
  };

  useEffect(() => {
    const storedTheme = themeParameter.get();
    if (storedTheme) {
      upadateTheme(storedTheme);
    } else {
      upadateTheme(defaultTheme);
    }
  }, []);

  useEffect(() => {
    // save parameter in local storage
  }, [theme]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, upadateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeContext, ThemeProvider, dbthemes };
