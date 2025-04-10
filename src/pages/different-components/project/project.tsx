import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import './project.scss';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';

function Project(): JSX.Element {
  const dropdownDetails = useDropdownButton();
  const dropdownPeople = useDropdownButton();
  const dropdownDescription = useDropdownButton();
  const dropdownEpicStory = useDropdownButton();

  return (
    <div className="page__main">
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
                      <h1 className="project_title_name">Проект Greend:</h1>
                      <p className="project_title_description">Разработка платформ для онлайн обучения</p>
                    </div>
                    <div className="project_title_creator">
                      <p>Создал(а) Васина Анастасия Александровна</p>
                    </div>
                  </article>
                  <article className="project_details" ref={dropdownDetails.dropdownRef}>
                    <div className="project_details_title project_details" onClick={dropdownDetails.toggleDropdown}>
                      <img src="../img/chevron_right.png" alt="" style={{transform: dropdownDetails.isOpen ? 'rotate(90deg)' : 'none'}}/>
                      <p>Детали</p>
                    </div>
                    {dropdownDetails.isOpen && (
                      <div className="project_details_content project_details">
                        <ul>
                          <li>
                            <p className="project_details_key project_details">Ключ:</p>
                            <p className="project_details_value project_details">GD</p>
                          </li>
                          <li>
                            <p className="project_details_key project_details">Владелец проекта:</p>
                            <p className="project_details_value project_details">Васина Анастасия Александровна</p>
                          </li>
                          <li>
                            <p className="project_details_key project_details">Тестировщик:</p>
                            <p className="project_details_value project_details">Комина Ирина Николаевна</p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </article>

                  <article className="project_people" ref={dropdownPeople.dropdownRef}>
                    <div className="project_details_title project_people" onClick={dropdownPeople.toggleDropdown}>
                      <img src="../img/chevron_right.png" alt=""
                        style={{transform: dropdownPeople.isOpen ? 'rotate(90deg)' : 'none'}}
                      />
                      <p>Участники</p>
                    </div>
                    {dropdownPeople.isOpen && (
                      <div className="project_details_content project_people">
                        <ul>
                          <li>
                            <img src="../img/account_circle.png" alt="иконка аккаунта" className="project_details_key"/>
                            <p className="project_details_value project_people">Васина Анастасия Александровна</p>
                          </li>
                          <li>
                            <img src="../img/account_circle.png" alt="иконка аккаунта" className="project_details_key"/>
                            <p className="project_details_value project_people">Васина Анастасия Александровна</p>
                          </li>
                          <li>
                            <img src="../img/account_circle.png" alt="иконка аккаунта" className="project_details_key"/>
                            <p className="project_details_value project_people">Васина Анастасия Александровна</p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </article>

                  <article className="project_description" ref={dropdownDescription.dropdownRef}>
                    <div className="project_details_title project_description"
                      onClick={dropdownDescription.toggleDropdown}
                    >
                      <img src="../img/chevron_right.png" alt=""
                        style={{transform: dropdownDescription.isOpen ? 'rotate(90deg)' : 'none'}}
                      />
                      <p>Описание</p>
                    </div>
                    {dropdownDescription.isOpen && (
                      <div className="project_details_content project_description">
                        <ul>
                          <li>
                            <p className="project_details_value project_description">Наша платформа активно растет, и
                              текущая архитектура начинает показывать признаки перегрузки. Количество пользователей
                              выросло
                              до 1 млн активных пользователей в день, и прогнозируется, что это число достигнет 10 млн в
                              ближайшие 12 месяцев. Текущая система не справляется с нагрузкой: наблюдаются задержки в
                              обработке
                              запросов, частые сбои сервисов и высокая нагрузка на базу данных. Это приводит к ухудшению
                              пользовательского
                              опыта и потере клиентов.
                            </p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </article>

                  <article className="project_epic-story" ref={dropdownEpicStory.dropdownRef}>
                    <div className="task epic-story">
                      <div className="task_parametres epic-story_parametres">
                        <div className="project_details_title project_description"
                          onClick={dropdownEpicStory.toggleDropdown}
                        >
                          <img src="../img/chevron_right.png" alt=""
                            style={{transform: dropdownEpicStory.isOpen ? 'rotate(90deg)' : 'none'}}
                          />
                          <p>Epic Story</p>
                        </div>

                        {dropdownEpicStory.isOpen && (
                          <button className="task_button epic-story__button">
                            <div className="task__element epic-story__element">
                              <div className="task__element-title epic-story__element-title">
                                <h1>GD-1:</h1>
                                <p>Изменить возвращаемую ошибку при срабатывание лимитов</p>
                              </div>
                              <div className="task__element-information">
                                <div className="task__element-executor epic-story__element-executor">
                                  <p>Исполнитель: </p>
                                </div>
                                <div className="task__element-status epic-story__element-status">
                                  <p>Общий статус: </p>
                                </div>
                              </div>
                            </div>
                          </button>
                        )}

                      </div>
                    </div>
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

