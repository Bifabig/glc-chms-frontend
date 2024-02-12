import { createTheme } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
      grey: {
        100: '#e0e0e0',
        200: '#c2c2c2',
        300: '#a3a3a3',
        400: '#858585',
        500: '#666666',
        600: '#525252',
        700: '#3d3d3d',
        800: '#292929',
        900: '#141414',
      },
      primary: {
        100: '#ced4db',
        200: '#9da8b7',
        300: '#6b7d92',
        400: '#3a516e',
        500: '#09264a',
        600: '#071e3b',
        700: '#05172c',
        800: '#040f1e',
        900: '#02080f',
      },
      // primary: {
      //   100: '#d0d1d5',
      //   200: '#a1a4ab',
      //   300: '#727681',
      //   400: '#1f2a40',
      //   500: '#141b2d',
      //   600: '#101624',
      //   700: '#0c101b',
      //   800: '#080b12',
      //   900: '#040509',
      // },
      greenAccent: {
        100: '#dbf5ee',
        200: '#b7ebde',
        300: '#94e2cd',
        400: '#70d8bd',
        500: '#4cceac',
        600: '#3da58a',
        700: '#2e7c67',
        800: '#1e5245',
        900: '#0f2922',
      },
      redAccent: {
        100: '#f8dcdb',
        200: '#f1b9b7',
        300: '#e99592',
        400: '#e2726e',
        500: '#db4f4a',
        600: '#af3f3b',
        700: '#832f2c',
        800: '#58201e',
        900: '#2c100f',
      },
      orangeAccent: {
        100: '#feead2',
        200: '#fdd6a6',
        300: '#fbc179',
        400: '#faad4d',
        500: '#f99820',
        600: '#c77a1a',
        700: '#955b13',
        800: '#643d0d',
        900: '#321e06',
      },
      blueAccent: {
        100: '#e1e2fe',
        200: '#c3c6fd',
        300: '#a4a9fc',
        400: '#868dfb',
        500: '#6870fa',
        600: '#535ac8',
        700: '#3e4396',
        800: '#2a2d64',
        900: '#151632',
      },
    } : {
      grey: {
        100: '#141414',
        200: '#292929',
        300: '#3d3d3d',
        400: '#525252',
        500: '#666666',
        600: '#858585',
        700: '#a3a3a3',
        800: '#c2c2c2',
        900: '#e0e0e0',
      },
      //       gray: {
      //           100: "#f1f1f1",
      //           200: "#e4e4e4",
      //           300: "#d6d6d6",
      //           400: "#c9c9c9",
      //           500: "#bbbbbb",
      //           600: "#969696",
      //           700: "#707070",
      //           800: "#4b4b4b",
      //           900: "#252525"
      // },
      primary: {
        100: '#02080f',
        200: '#040f1e',
        300: '#05172c',
        400: '#e4e4e4',
        500: '#f1f1f1',
        600: '#3a516e',
        700: '#6b7d92',
        800: '#9da8b7',
        900: '#ced4db',
      },
      // primary: {
      //   100: '#040509',
      //   200: '#080b12',
      //   300: '#0c101b',
      //   400: '#f2f0f0',
      //   500: '#141b2d',
      //   600: '#434957',
      //   700: '#727681',
      //   800: '#a1a4ab',
      //   900: '#d0d1d5',
      // },
      greenAccent: {
        100: '#0f2922',
        200: '#1e5245',
        300: '#2e7c67',
        400: '#3da58a',
        500: '#4cceac',
        600: '#70d8bd',
        700: '#2e7c67',
        800: '#b7ebde',
        900: '#dbf5ee',
      },
      redAccent: {
        100: '#2c100f',
        200: '#58201e',
        300: '#832f2c',
        400: '#af3f3b',
        500: '#db4f4a',
        600: '#e2726e',
        700: '#e99592',
        800: '#f1b9b7',
        900: '#f8dcdb',
      },
      orangeAccent: {
        100: '#321e06',
        200: '#643d0d',
        300: '#955b13',
        400: '#c77a1a',
        500: '#f99820',
        600: '#faad4d',
        700: '#fbc179',
        800: '#fdd6a6',
        900: '#feead2',
      },
      blueAccent: {
        100: '#151632',
        200: '#2a2d64',
        300: '#3e4396',
        400: '#535ac8',
        500: '#6870fa',
        600: '#868dfb',
        700: '#a4a9fc',
        800: '#c3c6fd',
        900: '#e1e2fe',
      },
    }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
          },
        } : {
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: '#fcfcfc',
          },
        }),
    },
    typography: {
      fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
      fonstSize: 12,
      h1: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 40,
      },
      h2: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 14,
      },
      h6: {
        fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
        fonstSize: 12,
      },
    },
  };
};

// color mode context
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [],
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
