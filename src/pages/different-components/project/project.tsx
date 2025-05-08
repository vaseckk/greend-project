import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import './project.scss';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getCurrentProject} from '../../../store/project-slice/project-selector.ts';
import {useEffect} from 'react';
import {fetchProjectsAction} from '../../../store/api-actions.ts';

function Project(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const project = useAppSelector(getCurrentProject);

  const dropdownDetails = useDropdownButton();
  const dropdownPeople = useDropdownButton();
  const dropdownDescription = useDropdownButton();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectsAction(id));
    }
  }, [id, dispatch]);

  if (!project) {
    return <div>Загрузка проекта...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Проект ${project.name}`}</title>
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
                    <div className="project_title_parametres">
                      <h1 className="project_title_name">Проект {project.name}:</h1>
                      <p className="project_title_description">{project.description || 'Описание отсутствует'}</p>
                    </div>
                    {project.headId && (
                      <div className="project_title_creator">
                        <p>Создал(а) {project.headId}</p>
                      </div>
                    )}
                  </article>

                  <article className="project_details" ref={dropdownDetails.dropdownRef}>
                    <div className="project_details_title project_details" onClick={dropdownDetails.toggleDropdown}>
                      <img
                        src="../img/chevron_right.png"
                        alt=""
                        style={{ transform: dropdownDetails.isOpen ? 'rotate(90deg)' : 'none' }}
                      />
                      <p>Детали</p>
                    </div>
                    {dropdownDetails.isOpen && (
                      <div className="project_details_content project_details">
                        <ul>
                          <li>
                            <p className="project_details_key project_details">Ключ:</p>
                            <p className="project_details_value project_details">{project.key}</p>
                          </li>
                          {project.headId && (
                            <li>
                              <p className="project_details_key project_details">Владелец проекта:</p>
                              <p className="project_details_value project_details">{project.headId}</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </article>

                  {project.users && project.users.length > 0 && (
                    <article className="project_people" ref={dropdownPeople.dropdownRef}>
                      <div className="project_details_title project_people" onClick={dropdownPeople.toggleDropdown}>
                        <img
                          src="../img/chevron_right.png"
                          alt=""
                          style={{ transform: dropdownPeople.isOpen ? 'rotate(90deg)' : 'none' }}
                        />
                        <p>Участники ({project.users.length})</p>
                      </div>
                      {dropdownPeople.isOpen && (
                        <div className="project_details_content project_people">
                          <ul>
                            {project.users.map((user) => (
                              <li key={user.id}>
                                <img src="../img/account_circle.png" alt="иконка аккаунта" className="project_details_key"/>
                                <p className="project_details_value project_people">
                                  {user.firstName} {user.lastName}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  )}

                  <article className="project_description" ref={dropdownDescription.dropdownRef}>
                    <div className="project_details_title project_description"
                         onClick={dropdownDescription.toggleDropdown}
                    >
                      <img
                        src="../img/chevron_right.png"
                        alt=""
                        style={{ transform: dropdownDescription.isOpen ? 'rotate(90deg)' : 'none' }}
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
