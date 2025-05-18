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
import NewTaskEpic from '../../pages/different-components/new-task-epic/new-task-epic.tsx';
import Project from '../../pages/different-components/project/project.tsx';
import NewSprint from '../../pages/different-components/new-sprint/new-sprint.tsx';
import EpicStory from '../../pages/different-components/epic-story/epic-story.tsx';
import AllProjects from '../../pages/different-components/all-projects/all-projects.tsx';

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
            path={`${AppRoute.NewTask}/:id`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <NewTaskEpic />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Epic}/:id`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <EpicStory />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Project}`}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Project />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.NewSprint} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <NewSprint />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.AllProjects} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AllProjects />
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
