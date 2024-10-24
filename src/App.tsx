import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import pathnames from './constants/pathnames';
import {Welcome} from './pages/Welcome';
import {TopBar} from './components/ui/TopBar';
import {QueryClientProvider} from 'react-query';
import {UserStorageStorageProvider} from './hooks/useUserStorage';
import { useQueryClient } from './hooks/useQueryClient';

function App() {
  const {i18n, t} = useTranslation();
  const queryClient = useQueryClient();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <Router>
        <QueryClientProvider client={queryClient}>
          <UserStorageStorageProvider>
            <>
              <TopBar />

              <Routes>
                <Route path={pathnames.home} element={<Welcome />} />
                <Route path={pathnames.login} element={<Login />} />
                <Route path={pathnames.register} element={<Register />} />
                {/* If path does not match navigate to first available page */}
                <Route path="*" element={<Welcome />} />
              </Routes>
            </>
          </UserStorageStorageProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;
