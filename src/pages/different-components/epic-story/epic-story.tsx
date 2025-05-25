import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import './epic-story.scss';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {Helmet} from 'react-helmet-async';
import {generatePath, Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';
import {useEffect} from 'react';
import {getAllComments, getTaskBySimpleId} from '../../../store/api-actions.ts';
import {AppRoute} from '../../../const.ts';
import TaskContent from '../../pages-components/task-content/task-content.tsx';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';

function EpicStory(): JSX.Element {
  const {id} = useParams<{
    id: string;
  }>();
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(getCurrentTask);
  const navigate = useNavigate();
  const currentProject = useAppSelector(getProjectInfo);

  const projectId = currentProject?.id;
  const simpleId = currentTask?.simpleId;

  const handleAddStory = () => {
    if (!currentTask?.id || !currentProject?.id) {
      return;
    }

    const path = generatePath(`${AppRoute.NewTaskStory}/:epicId`, {
      epicId: currentTask.id
    });

    navigate(path, {
      state: {
        projectId: currentProject.id
      }
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getTaskBySimpleId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (projectId && simpleId) {
      dispatch(getAllComments({ projectId,simpleId })); // Передаём один объект
    }
  }, [projectId, simpleId, dispatch]);

  if (!currentTask) {
    return <div className="loading">Загрузка Epic...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Epic ${currentTask.name}`}</title>
      </Helmet>
      <div className="page__main__parametres">
        <article className="page__main-sideber">
          <Sidebar/>
        </article>
        <div className="page__main-container">
          <header>
            <Header/>
          </header>

          <main className="page__main-content">
            <div className="search-container">
              <SearchFor />
            </div>

            <div className="project">
              <section className="project_information">
                <div className="project_parametres">
                  <article className="project_title--epic">
                    <div className="project_title_info">
                      <div className="project_title_parametres">
                        <h1 className="project_title_name">Epic:</h1>
                        <p className="project_title_description"> {currentTask.name}</p>
                      </div>
                      <div className="project_title_creator">
                        <p>Создал(а) {currentTask.creator?.firstName} {currentTask.creator?.lastName}</p>
                      </div>
                    </div>
                    <div className="new-task__link">
                      <button className="new-task" onClick={handleAddStory}>
                        Создать Story
                      </button>
                    </div>

                    <Link
                      to={generatePath(AppRoute.Edit, { id: currentTask.simpleId })}
                      state={{ taskType: 'EPIC' }}
                      className="edit-project"
                    >
                      <button className="edit-project__button">
                        <img src="../img/edit_square.png" alt="редактировать"/>
                      </button>
                    </Link>
                  </article>

                  <TaskContent task={currentTask} taskSimpleId={currentTask.simpleId}/>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EpicStory;

