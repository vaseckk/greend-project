import { useEffect, useState } from 'react';

interface Week {
  number: number;
  start: string;
  end: string;
}

export default function useWeeks() {
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const getWeeksInYear = () => {
      const weeksArray: Week[] = [];
      const year = new Date().getFullYear();

      for (let week = 1; week <= 52; week++) {
        const startDate = new Date(year, 0, 1);
        const dayOffset = startDate.getDay() === 0 ? 1 : (startDate.getDay() === 1 ? 0 : (8 - startDate.getDay()));
        startDate.setDate(startDate.getDate() + (week - 1) * 7 - dayOffset);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        const formatDate = (date: Date) => {
          return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        };

        weeksArray.push({
          number: week,
          start: formatDate(startDate),
          end: formatDate(endDate)
        });
      }

      return weeksArray;
    };

    setWeeks(getWeeksInYear());
  }, []);

  return weeks;
}
