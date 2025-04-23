import './time-tracker-task.scss';
import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import SearchFor from '../../pages-components/search-for/search-for.tsx';
import useDropdown from '../../../hooks/use-dropdown.tsx';
import useWeeks from '../../../hooks/use-weeks/use-weeks.ts';
import {useState} from 'react';
import WeekPickerModal from '../../pages-components/week-picker-modal/week-picker-modal.tsx';
import TimeTrackerTable from '../../pages-components/time-tracker-table/time-tracker-table.tsx';
import {Helmet} from 'react-helmet-async';

function TimeTrackerTask(): JSX.Element {
  const dropdownWeeks = useDropdown();
  const weeks = useWeeks();

  const [selectedWeek, setSelectedWeek] = useState<string>('выберите неделю');

  const handleWeekSelect = (week: {number: number; start: string; end: string}) => {
    setSelectedWeek(`Неделя ${week.number} (${week.start} - ${week.end})`);
  };

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
                <article className="time-interval">
                  <div className="time-interval_container">
                    <button onClick={dropdownWeeks.toggleDropdown} className='time-interval__button_choose'>
                      {selectedWeek}
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
                    <p>Затраченно времени: 15ч.</p>
                  </div>
                </article>

                <article className="time-tracker__table">
                  <TimeTrackerTable />
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
