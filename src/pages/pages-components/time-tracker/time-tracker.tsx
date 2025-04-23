import './time-tracker.scss';
import {useEffect, useState} from 'react';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';

interface TimeTrackerProps {
  totalHours: number;
}

function TimeTracker({ totalHours }: TimeTrackerProps): JSX.Element {
  const [startTime] = useState<Date>(new Date()); // Время начала задачи
  const [spentHours, setSpentHours] = useState<number>(0);
  const [remainingHours, setRemainingHours] = useState<number>(totalHours);
  const dropdownTimeTracker = useDropdownButton();

  const progressWidth = (remainingHours / totalHours) * 100;

  // Эффект для обновления времени каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diffInMs = now.getTime() - startTime.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      const newSpentHours = Math.min(diffInHours, totalHours);
      const newRemainingHours = totalHours - newSpentHours;

      setSpentHours(parseFloat(newSpentHours.toFixed(1)));
      setRemainingHours(parseFloat(newRemainingHours.toFixed(1)));
    }, 50); // Обновление каждую минуту

    return () => clearInterval(timer);
  }, [startTime, totalHours]);

  return (
    <section className="time-tracker__section" ref={dropdownTimeTracker.dropdownRef}>
      <div className="project_details_title project_description"
        onClick={dropdownTimeTracker.toggleDropdown}
      >
        <img src="../img/chevron_right.png" alt=""
          style={{transform: dropdownTimeTracker.isOpen ? 'rotate(90deg)' : 'none'}}
        />
        <p>Отслеживание времени</p>
      </div>
      {dropdownTimeTracker.isOpen && (
        <ul className="time-tracker">
          <div className="time-block">
            <div className="time-label">Ожидается:</div>
            <div className="time-scrolling_content_expected">
              <div
                className="time-scrolling_expected"
              >
              </div>
            </div>
            <div className="time-value">{totalHours}ч.</div>
          </div>

          <div className="time-block">
            <div className="time-label">Осталось:</div>
            <div className="time-scrolling_content_remained">
              <div
                className="time-scrolling_remained"
                style={{width: `${progressWidth}%`}}
              >
              </div>
            </div>
            <div className='time-value'>
              {remainingHours}ч.
            </div>
          </div>

          <div className="time-block">
            <div className="time-label">Потрачено:</div>
            <div className="time-scrolling_content_spent">
              <div
                className="time-scrolling_spent"
                style={{width: `${progressWidth}%`}}
              >
              </div>
            </div>
            <div className="time-value">{spentHours}ч.</div>
          </div>
        </ul>
      )}
    </section>
  );
}

export default TimeTracker;
