import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';
import {BrowserRouter as Router} from 'react-router-dom';
import CustomQueryClientProvider from './hooks/providers/CustomQueryProvider';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <HelmetProvider>
        <Router>
          <CustomQueryClientProvider>
            <>
              <App />
              <GlobalStyles />
              <WebVitals showStatusInConsoleLog />
            </>
          </CustomQueryClientProvider>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>,
  MOUNT_NODE
);
