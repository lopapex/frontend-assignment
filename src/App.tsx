import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Login} from './pages/Auth/Login';
import {Register} from './pages/Auth/Register';
import {Routes, Route, Navigate} from 'react-router-dom';
import pathnames from './constants/pathnames';
import {Home} from './pages/Todo/Home';
import {TopBar} from './components/TopBar';
import { Center } from '@chakra-ui/react';
import { useUser } from './hooks/useUser';

const AuthenticatedRoute = ({children}: {children: JSX.Element}) => {
  const {getUser} = useUser();

  if (!getUser()) {
    return <Navigate to={pathnames.login} />;
  }

  return children;
};

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      <>
        <TopBar />

        <Center>
          <Routes>
            <Route path={pathnames.login} element={<Login />} />
            <Route path={pathnames.register} element={<Register />} />

            <Route
              path={pathnames.home}
              element={
                <AuthenticatedRoute>
                  <Home />
                </AuthenticatedRoute>
              }
            />
            {/* If path does not match navigate to first available page */}
            <Route
              path="*"
              element={
                <AuthenticatedRoute>
                  <Home />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </Center>
      </>
    </>
  );
}

export default App;
