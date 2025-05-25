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
import AllProjects from '../../pages/different-components/all-projects/all-projects.tsx';
import UpdateProject from '../../pages/different-components/update-project/update-project.tsx';
import Task from '../../pages/different-components/task/task.tsx';
import NewTaskStory from '../../pages/different-components/new-task-story/new-task-story.tsx';
import Story from '../../pages/different-components/story/story.tsx';
import UpdateTask from '../../pages/different-components/update-task/update-task.tsx';
import NewTaskSubtask from '../../pages/different-components/new-task-subtask/new-task-subtask.tsx';
import Defect from '../../pages/different-components/defect/defect.tsx';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.TimeTrackerTask}
            element={
              <PrivateRoute>
                <TimeTrackerTask />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.NewSprint} element={
            <PrivateRoute>
              <NewSprint />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.AllProjects} element={
            <PrivateRoute>
              <AllProjects />
            </PrivateRoute>
          }
          />
          <Route
            path={AppRoute.BoardsAgile}
            element={
              <PrivateRoute>
                <BoardsAgile />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.NewProject}
            element={
              <PrivateRoute>
                <NewProject />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.NewTask}/:id`}
            element={
              <PrivateRoute>
                <NewTaskEpic />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.NewTaskStory}/:id`}
            element={
              <PrivateRoute>
                <NewTaskStory />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.NewTaskSubtask}/:id`}
            element={
              <PrivateRoute>
                <NewTaskSubtask />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Epic}
            element={
              <PrivateRoute>
                <EpicStory />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Project}`}
            element={
              <PrivateRoute>
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
              <PrivateRoute>
                <Story />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Defect}
            element={
              <PrivateRoute>
                <Defect />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.EditProject}
            element={
              <PrivateRoute>
                <UpdateProject />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Edit}
            element={
              <PrivateRoute>
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
