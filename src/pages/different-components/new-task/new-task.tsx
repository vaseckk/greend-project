import './new-task.scss';
import {CreationTypeModal} from '../../pages-components/create-type-modal/create-type-modal.tsx';
import {Route, Routes} from 'react-router-dom';
import CreateNewProject from '../../pages-components/create-new-project/create-new-project.tsx';
import CreateNewTask from '../../pages-components/create-new-task/create-new-task.tsx';
import {AppRoute} from '../../../const.ts';

function NewTask(): JSX.Element {
  return (
    <>
      <CreationTypeModal />
      <Routes>
        <Route path={AppRoute.CreateProject} element={<CreateNewProject />} />
        <Route path={AppRoute.CreateTask} element={<CreateNewTask />} />
      </Routes>
    </>
  );
}

export default NewTask;
