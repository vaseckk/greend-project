import {Helmet} from 'react-helmet-async';
import Sidebar from '../sidebar/sidebar.tsx';
import Header from '../header/header.tsx';
import SearchFor from '../search-for/search-for.tsx';
import Tags from '../tags/tags.tsx';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {useNavigate} from 'react-router-dom';
import {getCurrentUser} from '../../../store/auth-slice/auth-selector.ts';
import {ChangeEvent, FormEvent, useState} from 'react';
import {AppRoute, CreationStatus} from '../../../const.ts';
import {createProject} from '../../../store/api-actions.ts';

function CreateNewProject(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(getCurrentUser);

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
        headId: currentUser.id,
      })).unwrap();

      setStatus(CreationStatus.Created);
      navigate(`${AppRoute.Project}/${result.id}`);
    } catch (err) {
      setStatus(CreationStatus.Failed);
      setError(err instanceof Error ? err.message : 'Не удалось создать проект');
    }
  };

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
              <form onSubmit={handleSubmit}>
                <section className="task-section">
                  <section className="task-basic">
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

                    <article className="task-basic_name_type">
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
                          />
                        </div>
                      </div>
                    </article>

                    <article className="task-basic_tags">
                      <div className="task-basic_tags_container">
                        <Tags/>
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
                  </section>

                  <section className="task-additional">
                    <button
                      type="submit"
                      className="create-button"
                      disabled={status === CreationStatus.Creating}
                    >
                      {status === CreationStatus.Creating ? 'Создание...' : 'Создать проект'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                  </section>
                </section>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CreateNewProject;
