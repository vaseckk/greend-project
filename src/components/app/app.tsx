import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Login from '../../pages/different-components/login/login.tsx';
import TimeTrackerTask from '../../pages/different-components/time-tracker-task/time-tracker-task.tsx';
import BoardsAgile from '../../pages/different-components/boards-agile/boards-agile.tsx';
import NotFound from '../../pages/pages-components/not-found/not-found.tsx';
import {useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import NewProject from '../../pages/different-components/new-project/new-project.tsx';
import NewTask from '../../pages/different-components/new-task/new-task.tsx';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.TimeTrackerTask}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <TimeTrackerTask />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.NewProject}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <NewProject />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.NewTask}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <NewTask />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.BoardsAgile}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BoardsAgile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
