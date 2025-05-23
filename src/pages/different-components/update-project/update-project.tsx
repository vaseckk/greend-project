import {useAppDispatch, useAppSelector} from '../../../hooks';
import {generatePath, useNavigate, useParams} from 'react-router-dom';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {AppRoute, CreationStatus} from '../../../const.ts';
import {fetchProjectsAction, updateProject} from '../../../store/api-actions.ts';
import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';

function UpdateProject(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentProject = useAppSelector(getProjectInfo);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    headId: currentProject?.head.id,
  });
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные проекта при монтировании
  useEffect(() => {
    if (id) {
      dispatch(fetchProjectsAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentProject) {
      setFormData({
        name: currentProject.name,
        description: currentProject.description,
        headId: currentProject?.head.id,
      });
    }
  }, [currentProject]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id) {
      setError('ID проекта не указан');
      return;
    }

    setStatus(CreationStatus.Creating);
    setError(null);

    try {
      await dispatch(updateProject({
        id,
        data: {
          name: formData.name,
          description: formData.description,
          headId: currentProject?.head.id,
        }
      })).unwrap();

      setStatus(CreationStatus.Created);
      navigate(generatePath(`${AppRoute.Project}`, { id }));
    } catch (err) {
      setStatus(CreationStatus.Failed);
      setError(err instanceof Error ? err.message : 'Не удалось обновить проект');
    }
  };

  if (!currentProject) {
    return <div className="loading">Загрузка данных проекта...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>Greend: Создание проекта</title>
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
              <SearchFor/>
            </div>

            <div className="task">
              <form className='task__form' onSubmit={(e) => handleSubmit(e)}>
                <section className="task-section">
                  <article className="task-basic_name_type">
                    <div className="task-basic_name_container">
                      <p>Наименование</p>
                      <div className="task-basic_name">
                        <input
                          name="name"
                          placeholder='Введите название проекта'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </article>

                  <article className="task-basic_description">
                    <p>Описание</p>
                    <div className="task-basic_description_container">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </article>

                  <article className="task-basic_creation">
                    <button
                      className="task-creation"
                      disabled={status === CreationStatus.Creating}
                    >
                      <p>
                        {status === CreationStatus.Creating
                          ? 'Обновление...'
                          : 'Обновить проект'}
                      </p>
                    </button>
                  </article>

                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                </section>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;
