import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Routes, Route, Navigate} from 'react-router-dom';
import pathnames from './constants/pathnames';
import {Welcome} from './pages/Welcome';
import {TopBar} from './components/ui/TopBar';
import {useUserStorage} from './hooks/useUserStorage';

const AuthenticatedRoute = ({children}: {children: JSX.Element}) => {
  const {user} = useUserStorage();

  if (!user) {
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

        <Routes>
          <Route path={pathnames.login} element={<Login />} />
          <Route path={pathnames.register} element={<Register />} />

          <Route
            path={pathnames.home}
            element={
              <AuthenticatedRoute>
                <Welcome />
              </AuthenticatedRoute>
            }
          />
          {/* If path does not match navigate to first available page */}
          <Route
            path="*"
            element={
              <AuthenticatedRoute>
                <Welcome />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </>
    </>
  );
}

export default App;
