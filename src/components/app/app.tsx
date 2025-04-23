import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Login from '../../pages/different-components/login/login.tsx';
import TimeTrackerTask from '../../pages/different-components/time-tracker-task/time-tracker-task.tsx';
import NewTask from '../../pages/different-components/new-task/new-task.tsx';
import BoardsAgile from '../../pages/different-components/boards-agile/boards-agile.tsx';
import NotFound from '../../pages/pages-components/not-found/not-found.tsx';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.TimeTrackerTask} element={<TimeTrackerTask />} />
          <Route path={AppRoute.NewTask} element={<NewTask />} />
          <Route path={AppRoute.BoardsAgile} element={<BoardsAgile />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
