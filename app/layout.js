import Providers from './components/Providers';
import "@aws-amplify/ui-react/styles.css";
import * as Constants from './utils/Constants';

export const metadata = {
  title: Constants.UI_TEXT.TITLE,
  description: Constants.UI_TEXT.DESCRIPTION,
};

const RootLayout = ({ children }) => {
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

export default RootLayout;
