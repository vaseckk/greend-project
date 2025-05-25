import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import './task.scss';
import {Helmet} from 'react-helmet-async';
import {generatePath, Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';
import {AppRoute, STATUSES_LIST} from '../../../const.ts';
import {FormEvent, useEffect, useMemo} from 'react';
import {getTaskBySimpleId, updateTaskStatus} from '../../../store/api-actions.ts';
import TaskContent from '../../pages-components/task-content/task-content.tsx';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import {Statuses} from '../../../types/types.ts';

function Task(): JSX.Element {
  const {id} = useParams<{
    id: string;
  }>();
  const dispatch = useAppDispatch();
  const currentTask = useAppSelector(getCurrentTask);

  const statusOptions = useMemo(() =>
    STATUSES_LIST.map((status) => ({
      code: status.toUpperCase().replace(/\s+/g, '_'),
      value: status
    })), []);

  const dropdownStatus = useDropdownInput(statusOptions.map((option) => option.value));

  const selectedStatus = useMemo(() =>
    statusOptions.find((option) => option.value === dropdownStatus.inputValue),
  [dropdownStatus.inputValue, statusOptions]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentTask?.simpleId || !selectedStatus?.code) {
      return;
    }

    dispatch(updateTaskStatus({
      simpleId: currentTask.simpleId,
      data:  { status: selectedStatus.code as Statuses }
    }));
  };

  useEffect(() => {
    if (currentTask?.status) {
      dropdownStatus.handleItemSelect(currentTask.status.value as Statuses);
    }
  }, [currentTask?.status]);

  useEffect(() => {
    if (id) {
      dispatch(getTaskBySimpleId(id));
    }
  }, [id, dispatch]);

  if (!currentTask) {
    return <div className="loading">Загрузка Подзадачи...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Подзадача ${currentTask.name}`}</title>
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
                    <div className="project_title_info">
                      <div className="project_title_parametres">
                        <h1 className="project_title_name">Подзадача:</h1>
                        <p className="project_title_description"> {currentTask.name}</p>
                      </div>
                      <div className="project_title_creator">
                        <p>Создал(а) {currentTask.creator?.firstName} {currentTask.creator?.lastName}</p>
                      </div>
                    </div>


                    <form onSubmit={handleSubmit} className="task-basic_type_container">
                      <p>Статус</p>
                      <div ref={dropdownStatus.dropdownRef} className="dropdown-container">
                        <input
                          type="text"
                          value={dropdownStatus.inputValue}
                          onChange={dropdownStatus.handleInputChange}
                          onClick={dropdownStatus.toggleDropdown}
                          placeholder="Выберите статус"
                          className="status-input"
                        />
                        <button
                          type="button"
                          className="task-basic_type-choose"
                          onClick={dropdownStatus.toggleDropdown}
                        >
                          <img src="../img/chevron.png" alt=""/>
                        </button>

                        {dropdownStatus.isOpen && (
                          <div className="choose-project">
                            <ul>
                              {dropdownStatus.items.map((item) => {
                                const option = statusOptions.find((opt) => opt.value === item);
                                return (
                                  <li
                                    key={option?.code || item}
                                    onClick={() => dropdownStatus.handleItemSelect(item)}
                                  >
                                    {item}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="save-status-button"
                        disabled={
                          !selectedStatus?.code ||
                          selectedStatus.code === currentTask.status.code
                        }
                      >
                        Сохранить статус
                      </button>
                    </form>

                    <Link
                      to={generatePath(AppRoute.Edit, {id: currentTask.simpleId})}
                      state={{taskType: 'SUBTASK'}} // Передаём тип задачи
                      className="edit-project"
                    >
                      <button className="edit-project__button">
                        <img src="../img/edit_square.png" alt="редактировать"/>
                      </button>
                    </Link>
                  </article>

                  <TaskContent task={currentTask} taskSimpleId={currentTask.simpleId}/>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Task;
