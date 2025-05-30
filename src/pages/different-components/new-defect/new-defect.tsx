import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {PriorityType, TaskType, StoryPoint, TimeEstimationData} from '../../../types/types.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {generatePath, useNavigate} from 'react-router-dom';
import {getProjectInfo, getTagsProject} from '../../../store/project-slice/project-selector.ts';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {createTask, getAllSprints} from '../../../store/api-actions.ts';
import {ALLOWED_STORY_POINTS, AppRoute, TIME_UNITS} from '../../../const.ts';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import UsersSelectSubtask from '../../pages-components/users-select-subtask/users-select-subtask.tsx';
import {getAllSprintsSelector} from '../../../store/sprint-slice/sprint-selector.ts';
import {setCurrentSprint} from '../../../store/sprint-slice/sprint-slice.ts';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';

const PRIORITY_OPTIONS: PriorityType[] = ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL'];

function NewDefect(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentStory = useAppSelector(getCurrentTask);
  const dropdownPriority = useDropdownInput(PRIORITY_OPTIONS);
  const currentProject = useAppSelector(getProjectInfo);
  const projectId = currentProject?.id;

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const allSprints = useAppSelector(getAllSprintsSelector);
  const sprintsNames = allSprints.map((sprint) => sprint.name);
  const dropdownSprint = useDropdownInput(sprintsNames);

  const tagsProject = useAppSelector(getTagsProject);
  const tagNames = tagsProject.map((tag) => tag.name);
  const dropdownTags = useDropdownInput(tagNames);

  const [timeEstimations, setTimeEstimations] = useState<TimeEstimationData>(
    {amount: 0, timeUnit: 'HOURS'}
  );

  const [EpicData, setEpicData] = useState({
    name: '',
    description: '',
    type: 'DEFECT' as TaskType,
    priority: 'MAJOR' as PriorityType,
    storyPoints: 1 as StoryPoint,
    assigneeId: '',
    storyTaskId: currentStory?.id,
    reviewerId: '',
    sprintId: '',
    dueDate: '',
    projectId: currentProject?.id || '',
    timeEstimation: {
      timeUnit: TIME_UNITS[5],
      amount: 0,
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEpicData({
      ...EpicData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentProject?.id) {
      return;
    }

    dispatch(createTask(EpicData))
      .then((action) => {
        if (createTask.fulfilled.match(action)) {
          const path = generatePath(`${AppRoute.Defect}`, { id: action.payload.simpleId });
          navigate(path);
        }
      });
  };

  const handleTimeEstimationChange = (field: keyof TimeEstimationData, value: string | number) => {
    setTimeEstimations((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) || 0 : value
    }));
  };

  const handleTagSelect = (tagName: string) => {
    const selectedTag = tagsProject.find((tag) => tag.name === tagName);
    if (selectedTag && !selectedTagIds.includes(selectedTag.id)) {
      setSelectedTagIds([...selectedTagIds, selectedTag.id]);
    }
    dropdownTags.handleItemSelect(tagName);
  };


  useEffect(() => {
    setEpicData((prev) => ({
      ...prev,
      priority: dropdownPriority.inputValue as PriorityType
    }));
  }, [dropdownPriority.inputValue]);

  useEffect(() => {
    setEpicData((prev) => ({
      ...prev,
      timeEstimation: {
        amount: Number(timeEstimations.amount) || 0,
        timeUnit: timeEstimations.timeUnit === 'HOURS'
          ? timeEstimations.timeUnit
          : TIME_UNITS[5]
      }
    }));
  }, [timeEstimations]);

  useEffect(() => {
    setEpicData((prev) => ({
      ...prev,
      tagsIds: selectedTagIds
    }));
  }, [selectedTagIds]);

  useEffect(() => {
    if (projectId) {
      dispatch(getAllSprints({projectId})); // Передаём объект { projectId: string }
    }
  }, [projectId, dispatch]);

  return (
    <div className="page__main">
      <Helmet>
        <title>Greend: Создание Дефекта</title>
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
              <form onSubmit={handleSubmit} className='task__form'>
                <section className="task-section">
                  <section className="task-basic">
                    <article className="task-basic_title">
                      <div className="task-basic_title_container">
                        <h1 className="task-basic_title_name">
                          Создание новой Дефекта в Story {currentStory?.name}
                        </h1>
                      </div>
                    </article>

                    <article className="task-basic_name_type">
                      <div className="task-basic_name_container">
                        <p className="required-field">Наименование</p>
                        <div className="task-basic_name">
                          <input
                            name="name"
                            placeholder='Впишите название задачи'
                            value={EpicData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </article>

                    <article className="task-basic_time-controller">
                      <div className="task-basic_time-end_container">
                        <p>Дата окончания</p>
                        <div className="task-basic_time-end">
                          <input
                            type="date"
                            name="dueDate"
                            value={EpicData.dueDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <article className="task-basic_name_container">
                        <p>Временная оценка</p>
                        <div className="time-estimation__container">
                          <div className="time-estimation__item">
                            <div className="time-estimation__input-container">
                              <input
                                type="number"
                                placeholder="Количество"
                                value={timeEstimations.amount}
                                onChange={(e) => handleTimeEstimationChange('amount', e.target.value)}
                                min="0"
                                step="1"
                              />

                              <select
                                value={timeEstimations.timeUnit}
                                onChange={(e) => handleTimeEstimationChange('timeUnit', e.target.value)}
                              >
                                {TIME_UNITS.map((unit) => (
                                  <option key={unit} value={unit}>
                                    {unit.toLowerCase()}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </article>
                    </article>

                    <article className="task-basic_tags-project">
                      <div className="task-basic_tags_container">
                        <p>Теги</p>
                        <button
                          type="button"
                          className="task-basic_type-choose"
                          onClick={dropdownTags.toggleDropdown}
                        >
                          <input
                            placeholder="Выберите теги"
                            value={dropdownTags.inputValue}
                            onChange={dropdownTags.handleInputChange}
                          />
                          <img src="../img/chevron.png" alt=""/>
                        </button>
                        <div className="selected-tags">
                          {selectedTagIds.map((tagId) => {
                            const tag = tagsProject.find((t) => t.id === tagId);
                            return tag ? (
                              <span key={tagId} className="selected-tag">
                                <span className="selected-tag_container">
                                  <div className="selected-tag_container-name">{tag.name}</div>
                                  <button
                                    type="button"
                                    className="tags-delete"
                                    onClick={() => setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId))}
                                  >
                                    ×
                                  </button>
                                </span>
                              </span>
                            ) : null;
                          })}
                        </div>
                        {dropdownTags.isOpen && (
                          <div className="choose-project">
                            <ul>
                              {dropdownTags.items.map((tagName) => (
                                <li
                                  key={tagName}
                                  onClick={() => handleTagSelect(tagName)}
                                >
                                  {tagName}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="task-basic_tags_container" ref={dropdownSprint.dropdownRef}>
                        <p className="required-field">Спринт</p>
                        <button
                          type="button"
                          className="task-basic_type-choose"
                          onClick={dropdownSprint.toggleDropdown}
                        >
                          <input
                            placeholder="Выберите спринт"
                            value={dropdownSprint.inputValue}
                            onChange={dropdownSprint.handleInputChange}
                            readOnly
                          />
                          <img src="../img/chevron.png" alt=""/>
                        </button>
                        {dropdownSprint.isOpen && (
                          <div className="choose-project">
                            {allSprints.length > 0 ? (
                              <ul>
                                {allSprints.map((sprint) => (
                                  <li
                                    key={sprint.id}
                                    onClick={() => {
                                      dispatch(setCurrentSprint(sprint));
                                      dropdownSprint.handleItemSelect(sprint.name); // Устанавливаем имя для отображения
                                      setEpicData((prev) => ({
                                        ...prev,
                                        sprintId: sprint.id // Устанавливаем id спринта
                                      }));
                                      dropdownSprint.toggleDropdown();
                                    }}
                                    className="selected"
                                  >
                                    {sprint.name}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="empty-message">Нет доступных спринтов</div>
                            )}
                          </div>
                        )}
                      </div>
                    </article>

                    <article className="task-basic_type-priority-complexity">
                      <div className="task-basic_type_container">
                        <p className="required-field">Приоритет</p>
                        <button
                          type="button"
                          className="task-basic_type-choose"
                          onClick={dropdownPriority.toggleDropdown}
                        >
                          <input
                            placeholder="Выберите приоритет"
                            value={dropdownPriority.inputValue}
                            onChange={dropdownPriority.handleInputChange}
                          />
                          <img src="../img/chevron.png" alt=""/>
                        </button>

                        {dropdownPriority.isOpen && (
                          <div className="choose-project">
                            <ul>
                              {dropdownPriority.items.map((item) => (
                                <li
                                  key={item}
                                  onClick={() => dropdownPriority.handleItemSelect(item)}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="task-basic_type_container">
                        <p>Исполнитель</p>
                        <UsersSelectSubtask
                          users={currentProject?.users || []}
                          placeholder="Выберите исполнителя"
                          onSelect={(userId) => setEpicData({...EpicData, assigneeId: userId})}
                          initialValue={EpicData.assigneeId}
                        />
                      </div>

                      <div className="task-basic_type_container">
                        <p>Ревьюер</p>
                        <UsersSelectSubtask
                          users={currentProject?.users || []}
                          placeholder="Выберите ревьюера"
                          onSelect={(userId) => setEpicData({...EpicData, reviewerId: userId})}
                          initialValue={EpicData.reviewerId}
                        />
                      </div>

                    </article>

                    <article className="story-points">
                      <p className="required-field">Выберите story points</p>
                      <div className="story-points_container">
                        <select
                          value={EpicData.storyPoints}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10); // Добавляем radix
                            setEpicData({
                              ...EpicData,
                              storyPoints: value as StoryPoint, // Приводим тип
                            });
                          }}
                          required
                        >
                          <option value="" disabled>Выберите Story Points</option>
                          {ALLOWED_STORY_POINTS.map((point) => (
                            <option key={point} value={point} className='option'>{point}</option>
                          ))}
                        </select>
                      </div>
                    </article>

                    <article className="task-basic_description">
                      <p>Описание</p>
                      <div className="task-basic_description_container">
                        <textarea
                          name="description"
                          value={EpicData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </article>

                    <button type="submit" className='create-task__button'>Создать</button>
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

export default NewDefect;
