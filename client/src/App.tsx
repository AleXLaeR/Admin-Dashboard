import { CssBaseline, ThemeProvider, ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { useMemo } from 'react';

import { useAppSelector } from '@redux/hooks';
import { selectGlobalState } from '@redux/slices/global.slice';

import Layout from '@features/Layout';
import { themeSettings } from './theme';

export default function App() {
  const { mode } = useAppSelector(selectGlobalState);
  const theme = useMemo(() => createTheme(themeSettings(mode) as ThemeOptions), [mode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </div>
  );
}
