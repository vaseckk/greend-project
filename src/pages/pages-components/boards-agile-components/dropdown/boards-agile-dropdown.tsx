import useDropdown from '../../../../hooks/use-dropdown.tsx';
import './boards-agile-dropdown.scss';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {getAllProjects, getProjectInfo} from '../../../../store/project-slice/project-selector.ts';
import {useEffect} from 'react';
import {fetchProjectsAction, getAllProject, getAllSprints, getSprint} from '../../../../store/api-actions.ts';
import {ProjectAllData, SprintAllData} from '../../../../types/types.ts';
import {useNavigate} from 'react-router-dom';
import {APIRoute} from '../../../../const.ts';
import {getAllSprintsSelector, getCurrentSprint} from '../../../../store/sprint-slice/sprint-selector.ts';
import {setCurrentSprint} from '../../../../store/sprint-slice/sprint-slice.ts';

function BADropdown(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects = useAppSelector(getAllProjects);
  const currentProject = useAppSelector(getProjectInfo);
  const allSprints = useAppSelector(getAllSprintsSelector);
  const currentSprint = useAppSelector(getCurrentSprint);

  const dropdownSprint = useDropdown();
  const dropdownProject = useDropdown();

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  const handleProjectSelect = (project: ProjectAllData) => {
    dispatch(setCurrentSprint(null));
    dispatch(fetchProjectsAction(project.id));
    dispatch(getAllSprints({projectId: project.id}));
    dropdownProject.toggleDropdown();
  };

  const handleSprintSelect = (sprint: SprintAllData) => {
    dispatch(setCurrentSprint(sprint));
    dispatch(getSprint({
      projectId: currentProject!.id,
      sprintId: sprint.id
    }));
    dropdownSprint.toggleDropdown();
  };


  const handleAddSprintProject = () => {
    if(!currentProject?.id) {
      return;
    }
    navigate(`${APIRoute.ProjectCreateApi}/${currentProject.id}${APIRoute.SprintApi}`);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-container_two-button">
        <div className="dropdown-container" ref={dropdownProject.dropdownRef}>
          <button
            type="button"
            className="dropdown-button"
            onClick={dropdownProject.toggleDropdown}
          >
            {currentProject?.name || 'Текущий проект'}
          </button>
          {dropdownProject.isOpen && (
            <div className="dropdown-content">
              {projects.length > 0 ? (
                <div className="dropdown-content_parametres">
                  <ul>
                    {projects.map((project) => (
                      <li
                        key={project.id}
                        onClick={() => handleProjectSelect(project)}
                        className={currentProject?.id === project.id ? 'selected' : ''}
                      >
                        {project.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="empty-message">Нет доступных проектов</div>
              )}
            </div>
          )}
        </div>

        <div className="dropdown-container" ref={dropdownSprint.dropdownRef}>
          <button
            type="button"
            className="dropdown-button"
            onClick={dropdownSprint.toggleDropdown}
          >
            {currentSprint?.name || 'Выберите спринт'}
          </button>
          {dropdownSprint.isOpen && (
            <div className="dropdown-content">
              <div className="dropdown-content_parametres">
                {allSprints.length > 0 ? (
                  <ul>
                    {allSprints.map((sprint) => (
                      <li
                        key={sprint.id}
                        onClick={() => handleSprintSelect(sprint)}
                        className={currentSprint?.id === sprint.id ? 'selected' : ''}
                      >
                        {sprint.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-message">Нет доступных спринтов</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="dropdown-button_add-sprint"
        onClick={handleAddSprintProject}
      >
        Добавить спринт
      </button>
    </div>
  );
}

export default BADropdown;
