import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import './all-projects.scss';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getAllProjects} from '../../../store/project-slice/project-selector.ts';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';
import {useEffect} from 'react';
import {getAllProject} from '../../../store/api-actions.ts';

function AllProjects(): JSX.Element {
  const dispatch = useAppDispatch();
  const allProjects = useAppSelector(getAllProjects);

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  return (
    <div>
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

              <div className="task-all_projects">
                <article className="projects">
                  <div className="projects_scroll">
                    {allProjects.map((project) => (
                      <Link to={generatePath(AppRoute.Project, {id: project.id})} className='project__link' key={project.id}>
                        <div className="projects_container">
                          <div className="projects_name">
                            {project.name}
                          </div>
                          <div className="projects_headers">
                            Создатель: {project.head?.firstName} {project.head?.lastName}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProjects;
