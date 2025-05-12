import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import {Helmet} from 'react-helmet-async';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import Tags from '../../pages-components/tags/tags.tsx';

function NewTask(): JSX.Element {
  const projects = ['react', 'gsldfgkm', 'gldfkgslkfgnskdjgn'];
  const projectsTypes = ['задача', 'story', 'epic story', 'проект'];
  const dropdownNewTask = useDropdownInput(projects);
  const dropdownName = useDropdownInput([]);
  const dropdownType = useDropdownInput(projectsTypes);
  const dropdownSprint = useDropdownInput(projectsTypes);
  const dropdownComplexity = useDropdownInput(projectsTypes);

  return (
    <div className="page__main">
      <Helmet>
        <title>Greend: Создание задачи</title>
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
              <section className="task-section">
                <section className="task-basic">
                  <article className="task-basic_title" ref={dropdownNewTask.dropdownRef}>
                    <div className="task-basic_title_container">
                      <h1 className="task-basic_title_name">Создание новой задачи в</h1>
                      <div className="task-basic_project-choose_container">

                      </div>
                    </div>
                  </article>

                  <article className="task-basic_name_type">
                    <div className="task-basic_name_container">
                      <p>Наименование</p>
                      <button className="task-basic_name" onClick={dropdownName.toggleDropdown}>
                        <input
                          name="text"
                          id=""
                          placeholder='впишите название задачи'
                          value={dropdownName.inputValue}
                          onChange={dropdownName.handleInputChange}
                        >
                        </input>
                      </button>
                    </div>
                  </article>

                  <article className="task-basic_time-controller">
                    <div className="task-basic_time-end_container">
                      <p>Дата конца проекта</p>
                      <div className="task-basic_time-end">
                        <input
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="task-basic_time-expected">
                      <p>Сколько планируется времени</p>
                      <div className="task-basic_time-end">
                        <input
                          type="date"
                        />
                      </div>
                    </div>
                  </article>

                  <article className="task-basic_tags">
                    <div className="task-basic_tags_container">
                      <Tags/>
                    </div>

                  </article>

                  <article className="task-basic_type-priority-complexity">
                    <div className="task-basic_type_container">
                      <p>Тип</p>
                      <button className="task-basic_type-choose" onClick={dropdownType.toggleDropdown}>
                        <input
                          name="text"
                          id=""
                          placeholder='выберите тип задачи'
                          value={dropdownType.inputValue}
                          onChange={dropdownType.handleInputChange}
                        >
                        </input>
                        <img src="../img/chevron.png" alt=""/>
                      </button>

                      {dropdownType.isOpen && (
                        <div className='choose-project'>
                          <ul>
                            {dropdownType.items.map((item) => (
                              <li key={item} onClick={() => dropdownType.handleItemSelect(item)}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="task-basic_type_container">
                      <p>Сложность</p>
                      <button className="task-basic_type-choose" onClick={dropdownComplexity.toggleDropdown}>
                        <input
                          name="text"
                          id=""
                          placeholder='выберите сложность задачи'
                          value={dropdownComplexity.inputValue}
                          onChange={dropdownComplexity.handleInputChange}
                        >
                        </input>
                        <img src="../img/chevron.png" alt=""/>
                      </button>

                      {dropdownComplexity.isOpen && (
                        <div className='choose-project'>
                          <ul>
                            {dropdownComplexity.items.map((item) => (
                              <li key={item} onClick={() => dropdownComplexity.handleItemSelect(item)}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="task-basic_type_container">
                      <p>Спринт</p>
                      <button className="task-basic_type-choose" onClick={dropdownSprint.toggleDropdown}>
                        <input
                          name="text"
                          id=""
                          placeholder='выберите спринт задачи'
                          value={dropdownSprint.inputValue}
                          onChange={dropdownSprint.handleInputChange}
                        >
                        </input>
                        <img src="../img/chevron.png" alt=""/>
                      </button>

                      {dropdownSprint.isOpen && (
                        <div className='choose-project'>
                          <ul>
                            {dropdownSprint.items.map((item) => (
                              <li key={item} onClick={() => dropdownSprint.handleItemSelect(item)}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>

                  <article className="task-basic_description">
                    <p>Описание</p>
                    <div className="task-basic_description_container">
                      <textarea name="text"></textarea>
                    </div>
                  </article>
                </section>

                <section className="task-additional">

                </section>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
