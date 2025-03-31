import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import './task.scss';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import Tags from '../../pages-components/tags/tags.tsx';

function Task(): JSX.Element {
  const dropdownDetails = useDropdownButton();
  const dropdownDescription = useDropdownButton();

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
              <SearchFor/>
            </div>

            <div className="task">
              <section className="task-section">
                <div className="task-parametres">
                  <article className="project_title">
                    <div className="project_title_parametres">
                      <h1 className="project_title_name">Проект Greend:</h1>
                      <p className="project_title_description">Разработка платформ для онлайн обучения</p>
                    </div>
                    <div className="project_title_creator">
                      <p>Создал(а) Васина Анастасия Александровна</p>
                    </div>
                  </article>

                  <section className="task-content">
                    <div className="task-content_parametres">

                      <section className="task-basic">
                        <div className="task-basic_parametres">
                          <article className="project_details" ref={dropdownDetails.dropdownRef}>
                            <div className="project_details_title project_details"
                              onClick={dropdownDetails.toggleDropdown}
                            >
                              <img src="../img/chevron_right.png" alt=""
                                style={{transform: dropdownDetails.isOpen ? 'rotate(90deg)' : 'none'}}
                              />
                              <p>Детали</p>
                            </div>
                            {dropdownDetails.isOpen && (
                              <div className="project_details_content project_details">
                                <ul>
                                  <li>
                                    <p className="project_details_key project_details">Сложность:</p>
                                    <p className="project_details_value project_details">лёгкая</p>
                                  </li>
                                  <li>
                                    <p className="project_details_key project_details">Спринт:</p>
                                    <p className="project_details_value project_details"> спринт 34
                                    </p>
                                  </li>
                                  <section className='tags-section'>
                                    <Tags />
                                  </section>
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
                                    <p className="project_details_value project_description">Наша платформа активно
                                      растет, и
                                      текущая архитектура начинает показывать признаки перегрузки. Количество
                                      пользователей
                                      выросло
                                      до 1 млн активных пользователей в день, и прогнозируется, что это число достигнет
                                      10 млн в
                                      ближайшие 12 месяцев. Текущая система не справляется с нагрузкой: наблюдаются
                                      задержки в
                                      обработке
                                      запросов, частые сбои сервисов и высокая нагрузка на базу данных. Это приводит к
                                      ухудшению
                                      пользовательского
                                      опыта и потере клиентов.
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </article>
                        </div>
                      </section>

                      <section className="task-additional">
                        ghhdfghdfhg
                      </section>

                    </div>
                  </section>
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
