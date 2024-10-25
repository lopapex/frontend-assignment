import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Login} from './pages/Auth/Login';
import {Register} from './pages/Auth/Register';
import {Routes, Route, Navigate} from 'react-router-dom';
import pathnames from './constants/pathnames';
import {Home} from './pages/Todo/Home';
import {TopBar} from './components/TopBar';
import {useUser} from './hooks/useUser';
import {AnimatePresence} from 'framer-motion';
import AnimatedLayout from './components/AnimatedLayout';
import {ContentCard} from './components/ContentCard';
import {CONTENT_MAX_WIDTH, LOGIN_MAX_WIDTH} from './constants/sizes';

const AuthenticatedRoute = ({children}: {children: JSX.Element}) => {
  const {getUser} = useUser();

  if (!getUser()) {
    return <Navigate to={pathnames.login} />;
  }

  return children;
};

function App() {
  const {i18n, t} = useTranslation();
  const {getUser} = useUser();

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
        <AnimatePresence>
          <ContentCard maxWidth={getUser() ? CONTENT_MAX_WIDTH : LOGIN_MAX_WIDTH} width="100%">
            <Routes>
              <Route
                path={pathnames.login}
                element={
                  <AnimatedLayout>
                    <Login />
                  </AnimatedLayout>
                }
              />
              <Route
                path={pathnames.register}
                element={
                  <AnimatedLayout>
                    <Register />
                  </AnimatedLayout>
                }
              />

              <Route
                path={pathnames.home}
                element={
                  <AuthenticatedRoute>
                    <AnimatedLayout>
                      <Home />
                    </AnimatedLayout>
                  </AuthenticatedRoute>
                }
              />
              {/* If path does not match navigate to first available page */}
              <Route
                path="*"
                element={
                  <AuthenticatedRoute>
                    <AnimatedLayout>
                      <Home />
                    </AnimatedLayout>
                  </AuthenticatedRoute>
                }
              />
            </Routes>
          </ContentCard>
        </AnimatePresence>
      </>
    </>
  );
}

export default App;
