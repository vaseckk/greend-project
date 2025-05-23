import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {PriorityType, TaskType, StoryPoint, TimeEstimationData} from '../../../types/types.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {generatePath, useLocation, useNavigate, useParams} from 'react-router-dom';
import {getProjectInfo, getTagsProject} from '../../../store/project-slice/project-selector.ts';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {
  getAllSprints,
  getTaskBySimpleId,
  updateTask
} from '../../../store/api-actions.ts';
import {ALLOWED_STORY_POINTS, AppRoute, CreationStatus, TIME_UNITS} from '../../../const.ts';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import UsersSelectSubtask from '../../pages-components/users-select-subtask/users-select-subtask.tsx';
import {getAllSprintsSelector} from '../../../store/sprint-slice/sprint-selector.ts';
import {setCurrentSprint} from '../../../store/sprint-slice/sprint-slice.ts';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';

const PRIORITY_OPTIONS: PriorityType[] = ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL'];

type UpdateTaskProps = {
  taskType?: 'EPIC' | 'STORY' | 'SUBTASK' | 'DEFECT';
};

function UpdateTask({ taskType: propsTaskType }: UpdateTaskProps): JSX.Element {
  const {simpleId} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { taskType?: 'EPIC' | 'STORY' | 'SUBTASK' | 'DEFECT'} };
  const locationTaskType = (state as { taskType?: 'EPIC' | 'STORY' | 'SUBTASK' | 'DEFECT' })?.taskType;
  const taskType = locationTaskType || propsTaskType || 'EPIC';

  const dropdownPriority = useDropdownInput(PRIORITY_OPTIONS);
  const currentProject = useAppSelector(getProjectInfo);
  const currentTask = useAppSelector(getCurrentTask);
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const projectId = currentProject?.id;

  const allSprints = useAppSelector(getAllSprintsSelector);
  const sprintsNames = allSprints.map((sprint) => sprint.name);
  const dropdownSprint = useDropdownInput(sprintsNames);

  const tagsProject = useAppSelector(getTagsProject);
  const tagNames = tagsProject.map((tag) => tag.name);
  const dropdownTags = useDropdownInput(tagNames);

  const [timeEstimations, setTimeEstimations] = useState<TimeEstimationData>(
    {amount: 0, timeUnit: 'HOURS'}
  );

  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    type: taskType as TaskType,
    priority: 'MAJOR' as PriorityType,
    storyPoints: 1 as StoryPoint,
    assigneeId: '',
    reviewerId: '',
    sprintId: '',
    dueDate: '',
    projectId: currentProject?.id || '',
    timeEstimation: {
      timeUnit: TIME_UNITS[5],
      amount: 0,
    },
    tagsIds: [] as string[],
  });

  // Получаем правильный текст для типа задачи
  const getTaskTypeText = () => {
    switch (taskType) {
      case 'EPIC': return 'Epic';
      case 'STORY': return 'Story';
      case 'SUBTASK': return 'Subtask';
      default: return 'Task';
    }
  };

  useEffect(() => {
    if (simpleId) {
      dispatch(getTaskBySimpleId(simpleId));
    }
  }, [simpleId, dispatch]);

  useEffect(() => {
    if (currentTask) {
      setTaskData({
        name: currentTask.name,
        description: currentTask.description,
        type: taskType as TaskType,
        priority: currentTask.priority.code as PriorityType,
        storyPoints: currentTask.storyPoints as StoryPoint,
        assigneeId: currentTask.assignee?.id || '',
        reviewerId: currentTask.reviewer?.id || '',
        sprintId: currentTask.sprint?.id || '',
        dueDate: currentTask.dueDate,
        projectId: currentProject?.id || '',
        timeEstimation: {
          timeUnit: TIME_UNITS[5],
          amount: currentTask.timeEstimation?.amount || 0,
        },
        tagsIds: currentTask.tags?.map((tag) => tag.id) || [],
      });

      setSelectedTagIds(currentTask.tags?.map((tag) => tag.id) || []);

      setTimeEstimations({
        amount: currentTask.timeEstimation?.amount || 0,
        timeUnit: currentTask.timeEstimation?.timeUnit || 'HOURS'
      });

      if (currentTask.sprint) {
        dropdownSprint.handleItemSelect(currentTask.sprint.name);
      }
    }
  }, [currentTask, taskType]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => { // ← Добавлено async
    e.preventDefault();
    if (!currentProject?.id || !simpleId) {
      return;
    }

    try {
      await dispatch(updateTask({
        simpleId: simpleId || '',
        data: {
          name: taskData.name,
          description: taskData.description,
          type: taskData.type,
          priority: taskData.priority,
          storyPoints: taskData.storyPoints,
          assigneeId: taskData.assigneeId,
          reviewerId: taskData.reviewerId,
          sprintId: taskData.sprintId,
          dueDate: taskData.dueDate,
          timeEstimation: taskData.timeEstimation,
          tagIds: selectedTagIds,
        }
      })).unwrap();

      setStatus(CreationStatus.Created);
      const path = generatePath(`${AppRoute.Epic}`, { id: simpleId });
      navigate(path);
    } catch (err) {
      setStatus(CreationStatus.Failed);
    }
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
    setTaskData((prev) => ({
      ...prev,
      priority: dropdownPriority.inputValue as PriorityType
    }));
  }, [dropdownPriority.inputValue]);

  useEffect(() => {
    setTaskData((prev) => ({
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
    setTaskData((prev) => ({
      ...prev,
      tagsIds: selectedTagIds
    }));
  }, [selectedTagIds]);

  useEffect(() => {
    if (projectId) {
      dispatch(getAllSprints({ projectId }));
    }
  }, [projectId, dispatch]);

  if (!currentTask) {
    return <div>Загрузка данных {getTaskTypeText()}...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Редактирование ${getTaskTypeText()}`}</title>
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
                          Редактирование {getTaskTypeText()} в проекте {currentProject?.name}
                        </h1>
                      </div>
                    </article>

                    <article className="task-basic_name_type">
                      <div className="task-basic_name_container">
                        <p>Наименование</p>
                        <div className="task-basic_name">
                          <input
                            name="name"
                            placeholder='Впишите название задачи'
                            value={taskData.name}
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
                            value={taskData.dueDate}
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
                        <p>Спринт</p>
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
                                      dropdownSprint.handleItemSelect(sprint.name);
                                      setTaskData((prev) => ({
                                        ...prev,
                                        sprintId: sprint.id
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
                        <p>Приоритет</p>
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
                          onSelect={(userId) => setTaskData({...taskData, assigneeId: userId})}
                          initialValue={taskData.assigneeId}
                        />
                      </div>

                      <div className="task-basic_type_container">
                        <p>Ревьюер</p>
                        <UsersSelectSubtask
                          users={currentProject?.users || []}
                          placeholder="Выберите ревьюера"
                          onSelect={(userId) => setTaskData({...taskData, reviewerId: userId})}
                          initialValue={taskData.reviewerId}
                        />
                      </div>
                    </article>

                    <article className="story-points">
                      <p>Выберите story points</p>
                      <div className="story-points_container">
                        <select
                          value={taskData.storyPoints}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setTaskData({
                              ...taskData,
                              storyPoints: value as StoryPoint,
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
                          value={taskData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                    </article>

                    <button
                      className='create-task__button'
                      type='submit'
                      disabled={status === CreationStatus.Creating}
                    >
                      <p>
                        {status === CreationStatus.Creating
                          ? 'Обновление...'
                          : 'Обновить проект'}
                      </p>
                    </button>
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

export default UpdateTask;
