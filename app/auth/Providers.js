'use client';

import { Authenticator } from "@aws-amplify/ui-react";
import { ApolloProvider } from '@apollo/client';
import { wsClient } from '../utils/Utilities';

export default function Providers({ children }) {
  return (
    <Authenticator>
      <ApolloProvider client={wsClient}>
        {children}
      </ApolloProvider>
    </Authenticator>
  );
}