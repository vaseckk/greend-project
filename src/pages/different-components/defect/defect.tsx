import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import {Helmet} from 'react-helmet-async';
import {generatePath, Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getCurrentTask} from '../../../store/task-slice/task-selector.ts';
import {AppRoute} from '../../../const.ts';
import {FormEvent, useEffect, useMemo} from 'react';
import {getAppropriateStatus, getTaskBySimpleId, updateTaskStatus} from '../../../store/api-actions.ts';
import TaskContent from '../../pages-components/task-content/task-content.tsx';
import {Statuses} from '../../../types/types.ts';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import './defect.scss';
import {getAppropriateStatusSelector} from '../../../store/status-slice/status-selector.ts';

function Defect(): JSX.Element {
  const {id} = useParams<{
    id: string;
  }>();
  const dispatch = useAppDispatch();
  const currentStory = useAppSelector(getCurrentTask);
  const appropriateStatuses = useAppSelector(getAppropriateStatusSelector);

  const statusOptions = useMemo(() =>
    appropriateStatuses.map((status) => ({
      code: status.code,
      value: status.value
    })), [appropriateStatuses]);

  const dropdownStatus = useDropdownInput(statusOptions.map((option) => option.value));

  const selectedStatus = useMemo(() =>
    statusOptions.find((option) => option.value === dropdownStatus.inputValue),
  [dropdownStatus.inputValue, statusOptions]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentStory?.simpleId || !selectedStatus?.code) {
      return;
    }

    dispatch(updateTaskStatus({
      simpleId: currentStory.simpleId,
      data:  { status: selectedStatus.code as Statuses }
    }));
  };

  useEffect(() => {
    if (id) {
      dispatch(getTaskBySimpleId(id))
        .unwrap()
        .then((task) => {
          if (task?.simpleId) {
            dispatch(getAppropriateStatus({simpleId: task.simpleId}));
          }
        });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentStory?.status) {
      const currentStatus = statusOptions.find(
        (option) => option.code === currentStory.status.code
      );
      console.log('Current status check:', {
        options: statusOptions,
        currentStatus: currentStory.status,
        found: currentStatus
      });
      if (currentStatus) {
        dropdownStatus.handleItemSelect(currentStatus.value);
      }
    }
  }, [currentStory?.status, statusOptions]);

  if (!currentStory) {
    return <div className="loading">Загрузка Дефекта...</div>;
  }

  return (
    <div className="page__main">
      <Helmet>
        <title>{`Greend: Дефект ${currentStory.name}`}</title>
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
                        <h1 className="project_title_name">Дефект:</h1>
                        <p className="project_title_description"> {currentStory.name}</p>
                      </div>
                      <div className="project_title_creator">
                        <p>Создал(а) {currentStory.creator?.firstName} {currentStory.creator?.lastName}</p>
                      </div>
                    </div>

                    <div className='defect-edit'>
                      <form onSubmit={handleSubmit} className="status-choose">
                        <div ref={dropdownStatus.dropdownRef} className="status-choose__dropdown">
                          <div className="status-container">
                            <input
                              type="text"
                              value={dropdownStatus.inputValue || currentStory.status.value}
                              onChange={dropdownStatus.handleInputChange}
                              onClick={dropdownStatus.toggleDropdown}
                              placeholder="Выберите статус"
                              className="status-input"
                            />
                            <button
                              type="button"
                              className="chevron-status"
                              onClick={dropdownStatus.toggleDropdown}
                            >
                              <img src="../img/chevron.png" alt=""/>
                            </button>

                            <button
                              type="submit"
                              className="save-status-button"
                              disabled={
                                !selectedStatus?.code ||
                                selectedStatus.code === currentStory.status.code
                              }
                            >
                              <img src="../img/check.png" alt=""/>
                            </button>
                          </div>
                          {dropdownStatus.isOpen && (
                            <div className="choose-status">
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
                      </form>

                      <Link
                        to={generatePath(AppRoute.Edit, {id: currentStory.simpleId})}
                        state={{taskType: 'DEFECT'}}
                        className="edit-project"
                      >
                        <button className="edit-project__button">
                          <img src="../img/edit_square.png" alt="редактировать"/>
                        </button>
                      </Link>
                    </div>
                  </article>

                  <TaskContent task={currentStory} taskSimpleId={currentStory.simpleId}/>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Defect;
