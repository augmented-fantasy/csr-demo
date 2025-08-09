import React from 'react';
import Providers from './auth/Providers';

export const metadata = {
  title: "AMP CSR Portal",
  description: "Demo application for AMP CSR Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
