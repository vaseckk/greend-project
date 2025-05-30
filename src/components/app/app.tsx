import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Login from '../../pages/different-components/login/login.tsx';
import TimeTrackerTask from '../../pages/different-components/time-tracker-task/time-tracker-task.tsx';
import BoardsAgile from '../../pages/different-components/boards-agile/boards-agile.tsx';
import NotFound from '../../pages/pages-components/not-found/not-found.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import NewProject from '../../pages/different-components/new-project/new-project.tsx';
import NewTaskEpic from '../../pages/different-components/new-task-epic/new-task-epic.tsx';
import Project from '../../pages/different-components/project/project.tsx';
import NewSprint from '../../pages/different-components/new-sprint/new-sprint.tsx';
import EpicStory from '../../pages/different-components/epic-story/epic-story.tsx';
import UpdateProject from '../../pages/different-components/update-project/update-project.tsx';
import Task from '../../pages/different-components/task/task.tsx';
import NewTaskStory from '../../pages/different-components/new-task-story/new-task-story.tsx';
import Story from '../../pages/different-components/story/story.tsx';
import UpdateTask from '../../pages/different-components/update-task/update-task.tsx';
import NewTaskSubtask from '../../pages/different-components/new-task-subtask/new-task-subtask.tsx';
import Defect from '../../pages/different-components/defect/defect.tsx';
import NewDefect from '../../pages/different-components/new-defect/new-defect.tsx';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';
import {useAppSelector} from '../../hooks';
import AllProjects from '../../pages/different-components/all-projects/all-projects.tsx';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.AllProjects}
            element={
              <PrivateRoute authorizationStatus={authStatus}>
                <AllProjects />
              </PrivateRoute>
            }
          />
            <Route
              path={AppRoute.TimeTrackerTask}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <TimeTrackerTask />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.NewSprint} element={
              <PrivateRoute authorizationStatus={authStatus}>
                <NewSprint />
              </PrivateRoute>
            }
            />
            <Route
              path={AppRoute.BoardsAgile}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <BoardsAgile />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.NewProject}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <NewProject />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.NewTaskEpic}/:id`}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <NewTaskEpic />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.NewTaskStory}/:id`}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <NewTaskStory />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.NewTaskSubtask}/:id`}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <NewTaskSubtask />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.NewDefect}/:id`}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <NewDefect />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Epic}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <EpicStory />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Project}`}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <Project />
                </PrivateRoute>
              }
            />

            <Route
              path={AppRoute.Task}
              element={<Task />}
            />
            <Route
              path={AppRoute.Story}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <Story />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Defect}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <Defect />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.EditProject}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <UpdateProject />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Edit}
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <UpdateTask />
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
