import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import './project.scss';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import {Helmet} from 'react-helmet-async';
import {generatePath, Link, useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getHeadUserProject,
  getProjectInfo,
  getUsersProject,
  isLoading
} from '../../../store/project-slice/project-selector.ts';
import {useEffect} from 'react';
import {fetchProjectsAction} from '../../../store/api-actions.ts';
import {AppRoute} from '../../../const.ts';
import AddUserModal from '../../pages-components/add-user-modal/add-user-modal.tsx';
import Tags from '../../pages-components/tags/tags.tsx';

function Project(): JSX.Element {
  const {id} = useParams<{
    id: string;
  }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useAppSelector(getProjectInfo);
  const loading = useAppSelector(isLoading);
  const headUserProject = useAppSelector(getHeadUserProject);
  const usersProject = useAppSelector(getUsersProject);

  const dropdownPeople = useDropdownButton();
  const dropdownDescription = useDropdownButton();
  const dropdownAddUser = useDropdownButton();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectsAction(id));
    }
  }, [id, dispatch]);

  const handleAddEpic = () => {
    if(!project?.id) {
      return;
    }
    const path = generatePath(`${AppRoute.NewTaskEpic}/:id`, { id: project.id });
    navigate(path);
  };

  if (loading) {
    return <div className="loading">Загрузка проекта...</div>;
  }

  if (!project) {
    return <div className="error">Проект не найден</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Проект ${project.name}`}</title>
      </Helmet>
      <div className="page__main__parametres">
        <article className="page__main-sideber">
          <Sidebar />
        </article>
        <div className="page__main-container">
          <header>
            <Header />
          </header>

          <main className="page__main-content">
            <div className="search-container">
              <SearchFor />
            </div>

            <div className="project">
              <section className="project_information">
                <div className="project_parametres">
                  <article className="project_title-info">
                    <div className="project_title-names">
                      <div className="project_title_parametres">
                        <h1 className="project_title_name">Проект:</h1>
                        <p className="project_title_description">
                          {project.name || 'Описание отсутствует'}
                        </p>
                      </div>
                      <div className="project_title_creator">
                        <p>Создал(а) {headUserProject?.lastName} {headUserProject?.firstName}</p>
                      </div>
                    </div>
                    <div className="project_title__buttons" ref={dropdownAddUser.dropdownRef}>
                      <div className="project_add-users_container">
                        <button className="add-users-in-project" onClick={dropdownAddUser.toggleDropdown}>
                          <p>Добавить участника в проект</p>
                          <img
                            src="../img/chevron_right.png"
                            alt=""
                            style={{
                              transform: dropdownAddUser.isOpen ? 'rotate(90deg)' : 'none',
                            }}
                          />
                        </button>

                        {dropdownAddUser.isOpen && (
                          <AddUserModal/>
                        )}
                      </div>

                      <div className="new-task__link">
                        <button className="new-task" onClick={handleAddEpic}>
                          Создать EpicStory
                        </button>
                      </div>

                      <Link to={generatePath(AppRoute.EditProject, {id: project.id})} className="edit-project">
                        <button className="edit-project__button">
                          <img src="../img/edit_square.png" alt="редактировать"/>
                        </button>
                      </Link>
                    </div>
                  </article>


                  <article className="task-basic_tags">
                    <Tags/>
                  </article>


                  <article className="project_people" ref={dropdownPeople.dropdownRef}>
                    <div
                      className="project_details_title project_people"
                      onClick={dropdownPeople.toggleDropdown}
                    >
                      <img
                        src="../img/chevron_right.png"
                        alt=""
                        style={{
                          transform: dropdownPeople.isOpen ? 'rotate(90deg)' : 'none',
                        }}
                      />
                      <p>Участники ({usersProject.length})</p>
                    </div>
                    {dropdownPeople.isOpen && (
                      <div className="project_details_content project_people">
                        {usersProject.length > 0 ? (
                          <ul>
                            {usersProject.map((user) => (
                              <li key={user.id}>
                                <img
                                  src="../img/account_circle.png"
                                  alt="иконка аккаунта"
                                  className="project_details_key"
                                />
                                <p className="project_details_value project_people">
                                  {user.lastName} {user.firstName}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="no-users-message">Нет участников проекта</p>
                        )}
                      </div>
                    )}
                  </article>

                  <article className="project_description" ref={dropdownDescription.dropdownRef}>
                    <div
                      className="project_details_title project_description"
                      onClick={dropdownDescription.toggleDropdown}
                    >
                      <img
                        src="../img/chevron_right.png"
                        alt=""
                        style={{
                          transform: dropdownDescription.isOpen
                            ? 'rotate(90deg)'
                            : 'none',
                        }}
                      />
                      <p>Описание</p>
                    </div>
                    {dropdownDescription.isOpen && (
                      <div className="project_details_content project_description">
                        <ul>
                          <li>
                            <p className="project_details_value project_description">
                              {project.description || 'Описание отсутствует'}
                            </p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </article>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Project;
