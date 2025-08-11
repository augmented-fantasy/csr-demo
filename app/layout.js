import Providers from './auth/Providers';
import "@aws-amplify/ui-react/styles.css";
import GlobalStyles from '@mui/material/GlobalStyles';

export const metadata = {
  title: "AMP CSR Portal",
  description: "Demo application for AMP CSR Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyles styles={{
            'html, body': {
              margin: 0,
              padding: 0,
              minHeight: '100%',
              width: '100%',
            }
          }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
