import './time-tracker-task.scss';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import useDropdown from '../../../hooks/use-dropdown.tsx';
import useWeeks from '../../../hooks/use-weeks/use-weeks.ts';
import {useEffect, useState} from 'react';
import WeekPickerModal from '../../pages-components/week-picker-modal/week-picker-modal.tsx';
import TimeTrackerTable from '../../pages-components/time-tracker-table/time-tracker-table.tsx';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getTimeSheetProjectSelector,
  getTimeSheetTaskSelector
} from '../../../store/time-sheet-slice/time-sheet-selector.ts';
import {getAllProject, getTimeSheetProject, getTimeSheetTask} from '../../../store/api-actions.ts';
import { format} from 'date-fns';
import {getAllProjects} from '../../../store/project-slice/project-selector.ts';
import {ProjectAllData} from '../../../types/types.ts';

function TimeTrackerTask(): JSX.Element {
  const dropdownWeeks = useDropdown();
  const weeks = useWeeks();
  const dispatch = useAppDispatch();
  const currentTimeSheetTask = useAppSelector(getTimeSheetTaskSelector);
  const currentTimeSheetProject = useAppSelector(getTimeSheetProjectSelector);
  const projects = useAppSelector(getAllProjects);
  const dropdownProject = useDropdown();

  const [selectedWeek, setSelectedWeek] = useState<{
    number: number;
    start: string;
    end: string;
  } | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectAllData | null>(null);

  const handleWeekSelect = (week: {number: number; start: string; end: string}) => {
    setSelectedWeek(week);
    dropdownWeeks.closeDropdown();

    // При выборе недели сбрасываем выбранный проект
    setSelectedProject(null);

    // Загружаем задачи для всех проектов
    dispatch(getTimeSheetTask({
      startDate: week.start,
      endDate: week.end
    }));
  };

  const handleTaskDeleted = () => {
    if (!selectedWeek) return;

    if (selectedProject) {
      // Обновляем данные для выбранного проекта
      dispatch(getTimeSheetProject({
        projectId: selectedProject.id,
        startDate: selectedWeek.start,
        endDate: selectedWeek.end
      }));
    } else {
      // Обновляем данные для всех проектов
      dispatch(getTimeSheetTask({
        startDate: selectedWeek.start,
        endDate: selectedWeek.end
      }));
    }
  };

  const handleProjectSelect = (project: ProjectAllData | null) => {
    if (!selectedWeek) return;

    if (project) {
      // Выбран конкретный проект
      setSelectedProject(project);
      dispatch(getTimeSheetProject({
        projectId: project.id,
        startDate: selectedWeek.start,
        endDate: selectedWeek.end
      }));
    } else {
      // Выбраны все проекты
      setSelectedProject(null);
      dispatch(getTimeSheetTask({
        startDate: selectedWeek.start,
        endDate: selectedWeek.end
      }));
    }
    dropdownProject.closeDropdown();
  };

  useEffect(() => {
    dispatch(getAllProject())
  }, [dispatch]);

  // Определяем какие задачи показывать - по проекту или все
  const tasksToShow = selectedProject ? currentTimeSheetProject : currentTimeSheetTask;

  const totalTimeSpent = tasksToShow.reduce((total, task) => {
    const amount = task.timeEstimation.amount;
    const multiplier = task.timeEstimation.timeUnit === 'HOURS' ? 1 : 1/60;
    return total + (amount * multiplier);
  }, 0);

  return (
    <div className="page__main">
      <Helmet>
        <title>Greend: Учёт времени</title>
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

            <div className="task-tracker">
              <section className="task-section-tracker">
                <div className="time-sheet_between">
                  <div className="time-sheet_container">
                    <article className="time-interval">
                      <div className="time-interval_container">
                        <button onClick={dropdownWeeks.toggleDropdown} className='time-interval__button_choose'>
                          {selectedWeek
                            ? `Неделя ${selectedWeek.number} (${format(new Date(selectedWeek.start), 'dd.MM.yyyy')} - ${format(new Date(selectedWeek.end), 'dd.MM.yyyy')})`
                            : 'выберите неделю'}
                          <img
                            src="../img/chevron.png"
                            alt="стрелка"
                            style={{transform: dropdownWeeks.isOpen ? 'rotate(90deg)' : 'none'}}
                          />
                        </button>
                        {dropdownWeeks.isOpen && (
                          <WeekPickerModal
                            weeks={weeks}
                            onSelect={handleWeekSelect}
                            onClose={dropdownWeeks.closeDropdown}
                          />
                        )}
                      </div>
                    </article>

                    <article className="time-spent">
                      <div className="time-spent_container">
                        <p>Затраченно времени: {Math.round(totalTimeSpent * 10) / 10}ч.</p>
                      </div>
                    </article>
                  </div>

                  {selectedWeek && (
                    <div className="time-sheet_choose-project">
                      <div className="dropdown-container" ref={dropdownProject.dropdownRef}>
                        <button
                          type="button"
                          className="dropdown-button"
                          onClick={dropdownProject.toggleDropdown}
                        >
                          {selectedProject ? selectedProject.name : 'Все проекты'}
                        </button>
                        {dropdownProject.isOpen && (
                          <div className="dropdown-content">
                            <div className="dropdown-content_parametres">
                              <ul>
                                <li
                                  key="all-projects"
                                  onClick={() => handleProjectSelect(null)}
                                  className={!selectedProject ? 'selected' : ''}
                                >
                                  Все проекты
                                </li>
                                {projects.map((project) => (
                                  <li
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project)}
                                    className={selectedProject?.id === project.id ? 'selected' : ''}
                                  >
                                    {project.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <article className="time-tracker__table">
                  {selectedWeek && (
                    <TimeTrackerTable
                      tasks={tasksToShow}
                      weekStart={selectedWeek.start}
                      weekEnd={selectedWeek.end}
                      onTaskDeleted={handleTaskDeleted}
                    />
                  )}
                </article>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TimeTrackerTask;
