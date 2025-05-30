import { useEffect, useState } from 'react';
import { format, startOfWeek, addDays, isWithinInterval  } from 'date-fns';

interface Week {
  number: number;
  start: string; // Формат "yyyy-MM-dd"
  end: string;   // Формат "yyyy-MM-dd"
  displayStart: string; // Для отображения "dd.MM"
  displayEnd: string;   // Для отображения "dd.MM"
  isCurrent: boolean;   // Флаг текущей недели
}

export default function useWeeks() {
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const getWeeksInYear = () => {
      const weeksArray: Week[] = [];
      const year = new Date().getFullYear();
      const now = new Date();

      // Находим первый понедельник года
      let currentDate = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 1 });

      for (let week = 1; week <= 52; week++) {
        const startDate = new Date(currentDate);
        const endDate = addDays(startDate, 6);

        const isCurrentWeek = isWithinInterval(now, {
          start: startDate,
          end: endDate
        });

        weeksArray.push({
          number: week,
          start: format(startDate, 'yyyy-MM-dd'),
          end: format(endDate, 'yyyy-MM-dd'),
          displayStart: format(startDate, 'dd.MM'),
          displayEnd: format(endDate, 'dd.MM'),
          isCurrent: isCurrentWeek
        });

        // Переходим к следующей неделе
        currentDate = addDays(endDate, 1);
      }

      return weeksArray;
    };

    setWeeks(getWeeksInYear());
  }, []);

  return weeks;
}
