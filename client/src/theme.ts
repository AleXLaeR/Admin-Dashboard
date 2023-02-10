import { CSSObject } from '@emotion/react';
import { Theme } from './typings';

type ShadeTokens = 'grey' | 'primary' | 'secondary';
const steps = [...Array.from({ length: 11 }, (_, i) => i * 100), 10, 50];

type ColorShade = {
  [key in (typeof steps)[number]]?: CSSObject['color'];
};

type ColorShadeTokens = {
  [key in ShadeTokens]: ColorShade;
};

// color design tokens export
export const tokensDark: ColorShadeTokens = {
  grey: {
    0: '#ffffff',
    50: '#f0f0f0',
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000',
  },
  primary: {
    // blue
    100: '#d3d4de',
    200: '#a6a9be',
    300: '#7a7f9d',
    400: '#4d547d',
    500: '#21295c',
    600: '#191F45',
    700: '#141937',
    800: '#0d1025',
    900: '#070812',
  },
  secondary: {
    // yellow
    50: '#f0f0f0', // manually adjusted
    100: '#fff6e0',
    200: '#ffedc2',
    300: '#ffe3a3',
    400: '#ffda85',
    500: '#ffd166',
    600: '#cca752',
    700: '#997d3d',
    800: '#665429',
    900: '#332a14',
  },
};

const reverseTokens = (tokens: ColorShadeTokens) => {
  const reversedTokens: any = {};
  Object.entries(tokens).forEach(([key, value]) => {
    const keys = Object.keys(value);
    const values = Object.values(value);
    const reversed: any = {};

    keys.forEach((_, idx) => {
      reversed[keys[idx]] = values[keys.length - idx - 1];
    });
    reversedTokens[key] = reversed;
  });
  return reversedTokens;
};

export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode: Theme) => {
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              paper: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              paper: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
