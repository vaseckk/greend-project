import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';
import {getSprintStatus} from '../../../store/sprint-slice/sprint-selector.ts';
import {FormEvent, useState} from 'react';
import {createSprint} from '../../../store/api-actions.ts';
import {AppRoute, CreationStatus} from '../../../const.ts';

function NewSprint(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentProject = useAppSelector(getProjectInfo);
  const status = useAppSelector(getSprintStatus);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!currentProject?.id) {
      return;
    }

    dispatch(createSprint({
      projectId: currentProject?.id,
      sprintData: {
        ...formData,
        projectId: currentProject?.id,
      }
    })).then((action) => {
      if (createSprint.fulfilled.match(action)) {
        navigate(AppRoute.BoardsAgile);
      }
    });
  };

  return (
    <div className="page__main">
      <Helmet>
        <title>Greend: Создание спринта {currentProject?.name ? `| ${currentProject.name}` : ''}</title>
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
              <form className='task__form' onSubmit={handleSubmit}>
                <section className="task-section">
                  <article className="task-basic_name_type">
                    <div className="task-basic_name_container">
                      <p>Наименование</p>
                      <div className="task-basic_name">
                        <input
                          name="name"
                          placeholder='Введите название спринта'
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </article>

                  <article className="task-basic_time-controller">
                    <div className="task-basic_time-end_container">
                      <p>Дата начала спринта</p>
                      <div className="task-basic_time-end">
                        <input
                          type="date"
                          name="startDate"
                          required
                          value={formData.startDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="task-basic_time-expected">
                      <p>Дата конца спринта</p>
                      <div className="task-basic_time-end">
                        <input
                          type="date"
                          name="endDate"
                          required
                          value={formData.endDate}
                          onChange={handleInputChange}
                          min={formData.startDate}
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
                      type="submit"
                      disabled={status === CreationStatus.Creating}
                    >
                      <p>
                        {status === CreationStatus.Creating ? 'Создание...' : 'Создать'}
                      </p>
                    </button>
                    {status === CreationStatus.Failed && (
                      <p className="error-message">Ошибка при создании спринта</p>
                    )}
                  </article>
                </section>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default NewSprint;
