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
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {mutationErrorHandler, queryErrorHandler} from './components/utils/errorHandler';

const MOUNT_NODE = document.getElementById('root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: 0,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    onError: mutationErrorHandler,
  }),
});

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <HelmetProvider>
        <Router>
          <QueryClientProvider client={queryClient}>
            <>
              <App />
              <GlobalStyles />
              <WebVitals showStatusInConsoleLog />
            </>
          </QueryClientProvider>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>,
  MOUNT_NODE
);
