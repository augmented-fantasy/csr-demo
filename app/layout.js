import Providers from './auth/Providers';
import "@aws-amplify/ui-react/styles.css";

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
