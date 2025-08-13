'use client';

import { Authenticator } from "@aws-amplify/ui-react";
import { ApolloProvider } from '@apollo/client';
import { wsClient } from '../utils/Utilities';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          minHeight: '100%',
          width: '100%',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#3d66d9ff',
      contrastText: '#ffffff'
    }
  }
});

export default function Providers({ children }) {
  return (
      <Authenticator>
        <ApolloProvider client={wsClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </Authenticator>
  );
}