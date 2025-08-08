import AuthenticatorWrapper from "./auth/AuthenticatorWrapper";
import "@aws-amplify/ui-react/styles.css";

export const metadata = {
  title: "AMP CSR Portal",
  description: "Demo application for AMP CSR Portal",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthenticatorWrapper>
          {children}
        </AuthenticatorWrapper>
      </body>
    </html>
  );
}

export default RootLayout
