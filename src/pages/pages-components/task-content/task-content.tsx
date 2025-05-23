import {TaskData} from '../../../types/types.ts';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import Tags from '../tags/tags.tsx';
import TaskDialog from '../task-dialog/task-dialog.tsx';
import TimeTracker from '../time-tracker/time-tracker.tsx';

interface TaskContentProps {
  task: TaskData;
  taskSimpleId?: string;
}

function TaskContent({ task, taskSimpleId }: TaskContentProps): JSX.Element {
  const dropdownDetails = useDropdownButton();
  const dropdownDescription = useDropdownButton();
  const dropdownDialog = useDropdownButton();
  const dropdwonParticipal = useDropdownButton();
  const dropdwonDate = useDropdownButton();

  return (
    <section className="task-content">
      <div className="task-content_parametres">
        <section className="task-basic">
          <div className="task-basic_parametres">
            <article className="project_details" ref={dropdownDetails.dropdownRef}>
              <div
                className="project_details_title project_details"
                onClick={dropdownDetails.toggleDropdown}
              >
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
                      <p className="project_details_key project_details">Сложность:</p>
                      <p className="project_details_value project_details">{task.priority.value}</p>
                    </li>
                    <li>
                      <p className="project_details_key project_details">Спринт:</p>
                      <p className="project_details_value project_details">{task.sprint?.name}</p>
                    </li>
                    <section className='tags-section'>
                      <Tags />
                    </section>
                  </ul>
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
                  style={{ transform: dropdownDescription.isOpen ? 'rotate(90deg)' : 'none' }}
                />
                <p>Описание</p>
              </div>
              {dropdownDescription.isOpen && (
                <div className="project_details_content project_description">
                  <ul>
                    <li>
                      <p className="project_details_value project_description">{task.description}</p>
                    </li>
                  </ul>
                </div>
              )}
            </article>

            <article className="project_task-dialog" ref={dropdownDialog.dropdownRef}>
              <div
                className="project_details_title project_description"
                onClick={dropdownDialog.toggleDropdown}
              >
                <img
                  src="../img/chevron_right.png"
                  alt=""
                  style={{ transform: dropdownDialog.isOpen ? 'rotate(90deg)' : 'none' }}
                />
                <p>Комментарии</p>
              </div>
              {dropdownDialog.isOpen && (
                <TaskDialog taskSimpleId={taskSimpleId || task.simpleId} />
              )}
            </article>
          </div>
        </section>

        <section className="task-additional">
          <article className="task-additional_block participating-in-project">
            <div
              className="project_details_title participating-in-project_title"
              onClick={dropdwonParticipal.toggleDropdown}
            >
              <img
                src="../img/chevron_right.png"
                alt=""
                style={{ transform: dropdwonParticipal.isOpen ? 'rotate(90deg)' : 'none' }}
              />
              <p>Участвующие в проекте</p>
            </div>
            {dropdwonParticipal.isOpen && (
              <div className="task-additional_content project_description">
                <ul>
                  <li>
                    <p className="task-additional_key project_details">Создатель:</p>
                    <div className="task-additional_value project_details">
                      <p>{task.creator.firstName} {task.creator.lastName}</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </article>

          <article className="task-additional_block participating-in-project">
            <div
              className="project_details_title participating-in-project_title"
              onClick={dropdwonDate.toggleDropdown}
            >
              <img
                src="../img/chevron_right.png"
                alt=""
                style={{ transform: dropdwonDate.isOpen ? 'rotate(90deg)' : 'none' }}
              />
              <p>Даты</p>
            </div>
            {dropdwonDate.isOpen && (
              <div className="task-additional_content project_description">
                <ul>
                  <li>
                    <p className="task-additional_key project_details">Создана:</p>
                    <div className="task-additional_value project_details">
                      <p>05.05.2024</p>
                    </div>
                  </li>
                  <li>
                    <p className="task-additional_key project_details">Обновлена:</p>
                    <div className="task-additional_value project_details">
                      <p>08.05.2024</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </article>

          <article className="time-tracker-container">
            <TimeTracker totalHours={24} />
          </article>
        </section>
      </div>
    </section>
  );
}

export default TaskContent;
