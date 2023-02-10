import { CssBaseline, ThemeProvider, ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { useMemo } from 'react';

import { useAppSelector } from '@redux/hooks';
import { selectTheme } from '@redux/slices/theme.slice';

import Layout from '@features/Layout';
import { themeSettings } from './theme';

export default function App() {
  const { mode } = useAppSelector(selectTheme);
  const theme = useMemo(() => createTheme(themeSettings(mode) as ThemeOptions), []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </div>
  );
}
