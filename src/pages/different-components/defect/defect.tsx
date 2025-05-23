import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import './task.scss';
import {Helmet} from 'react-helmet-async';
import {generatePath, Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';
import {AppRoute} from '../../../const.ts';
import {useEffect} from 'react';
import {getTaskBySimpleId} from '../../../store/api-actions.ts';
import TaskContent from '../../pages-components/task-content/task-content.tsx';

function Defect(): JSX.Element {
  const {id} = useParams<{
    id: string;
  }>();
  const dispatch = useAppDispatch();
  const currentStory = useAppSelector(getCurrentTask);

  useEffect(() => {
    if (id) {
      dispatch(getTaskBySimpleId(id));
    }
  }, [id, dispatch]);

  if (!currentStory) {
    return <div className="loading">Загрузка Дефекта...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Дефект ${currentStory.name}`}</title>
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
                  <article className="project_title">
                    <div className="project_title_info">
                      <div className="project_title_parametres">
                        <h1 className="project_title_name">Подзадача:</h1>
                        <p className="project_title_description"> {currentStory.name}</p>
                      </div>
                      <div className="project_title_creator">
                        <p>Создал(а) {currentStory.creator?.firstName} {currentStory.creator?.lastName}</p>
                      </div>
                    </div>

                    <Link
                      to={generatePath(AppRoute.Edit, { id: currentStory.simpleId })}
                      state={{ taskType: 'DEFECT' }} // Передаём тип задачи
                      className="edit-project"
                    >
                      <button className="edit-project__button">
                        <img src="../img/edit_square.png" alt="редактировать"/>
                      </button>
                    </Link>
                  </article>

                  <TaskContent task={currentStory} taskSimpleId={currentStory.simpleId} />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Defect;
