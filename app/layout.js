import Providers from './components/Providers';
import GlobalStyles from '@mui/material/GlobalStyles';
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

export default RootLayout;
