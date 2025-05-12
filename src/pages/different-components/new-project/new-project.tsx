import {useAppDispatch, useAppSelector} from '../../../hooks';
import {useNavigate} from 'react-router-dom';
import './new-project.scss';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {AppRoute, CreationStatus, NameSpace} from '../../../const.ts';
import {createProject, getUserInfo} from '../../../store/api-actions.ts';
import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {getMyUser, getUser} from '../../../store/users-slice/users-selector.ts';

function NewProject(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(getMyUser);
  const firstname = useAppSelector(getUser);

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    key: '',
  });
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError('Пользователь не авторизован');
      return;
    }

    setStatus(CreationStatus.Creating);
    setError(null);

    try {
      const result = await dispatch(createProject({
        ...projectData,
        headId: currentUser,
      })).unwrap();

      setStatus(CreationStatus.Created);
      navigate(`${AppRoute.Project}/${result.id}`);
    } catch (err) {
      setStatus(CreationStatus.Failed);
      setError(err instanceof Error ? err.message : 'Не удалось создать проект');
    }
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

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
                          value={projectData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </article>

                  <article className="task-basic_name_type--key">
                    <div className="task-basic_name_container">
                      <p>Ключ проекта</p>
                      <div className="task-basic_name">
                        <input
                          name="key"
                          placeholder='Введите ключ проекта (например: GRN)'
                          value={projectData.key}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          autoComplete={'off'}
                        />
                      </div>
                    </div>
                  </article>

                  <article className="task-basic_name_type--key">
                    <div className="task-basic_name_container">
                      <p>Ключ проекта {currentUser ? currentUser : 'Пользователь не загружен'} {firstname}</p>
                    </div>
                  </article>

                  <article className="task-basic_description">
                    <p>Описание</p>
                    <div className="task-basic_description_container">
                      <textarea
                        name="description"
                        value={projectData.description}
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
                          ? 'Создание...'
                          : 'Создать проект'}
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

export default NewProject;
