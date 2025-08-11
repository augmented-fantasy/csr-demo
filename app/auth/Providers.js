'use client';

import { Authenticator } from "@aws-amplify/ui-react";
import { ApolloProvider } from '@apollo/client';
import { wsClient } from '../utils/Utilities';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#123081',
      contrastText: '#ffffff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});

export default function Providers({ children }) {
  return (
    <Authenticator>
      <ApolloProvider client={wsClient}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </Authenticator>
  );
}