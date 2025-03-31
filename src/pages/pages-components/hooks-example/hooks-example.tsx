import './hooks-example.scss';
import {useEffect, useState} from 'react';

type Color = 'green' | 'yellow' | 'red';

interface HooksExample {
  colors: Color[];
}

function HooksExample({colors}: HooksExample): JSX.Element {
  const [activeColor, setActiveColor] = useState<Color>(() => {
    const savedColor = localStorage.getItem('trafficLightColor') as Color | null;
    return savedColor || 'red';
  });

  const [isPaused, setIsPaused] = useState(false);

  const [isEmergency, setIsEmergency] = useState(false);
  const [isFlashingOn, setIsFlashingOn] = useState(false);

  useEffect(() => {
    let emergencyId: NodeJS.Timeout;

    if (isEmergency) {
      emergencyId = setInterval(() => {
        setIsFlashingOn((prev) => !prev);
      }, 500);
    }

    return () => clearInterval(emergencyId);
  }, [isEmergency, isPaused]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setActiveColor((prev) => {
          const nextIndex = (colors.indexOf(prev) + 1) % colors.length;
          return colors[nextIndex];
        });
      }, 3000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  useEffect(() => {
    localStorage.setItem('trafficLightColor', activeColor);
  }, [activeColor]);

  const handleNext = () => {
    setActiveColor((prev) => {
      const nextIndex = (colors.indexOf(prev) + 1) % colors.length;
      return colors[nextIndex];
    });
  };

  return (
    <div className="traffic-light">
      <div className={`
    traffic-light__section
    ${isEmergency
      ? (isFlashingOn ? 'traffic-light__section--emergency' : 'traffic-light__section--off')
      : (activeColor === 'red' ? 'traffic-light__section--active' : 'traffic-light__section--off')
    }
  `}
      />

      {/* Жёлтый */}
      <div className={`
    traffic-light__section
    ${!isEmergency && activeColor === 'yellow'
      ? 'traffic-light__section--active'
      : 'traffic-light__section--off'
    }
  `}
      />

      {/* Зелёный */}
      <div className={`
    traffic-light__section
    ${!isEmergency && activeColor === 'green'
      ? 'traffic-light__section--active'
      : 'traffic-light__section--off'
    }
  `}
      />

      <div className="traffic-light__controls">
        <button
          className="traffic-light__button"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Продолжить' : 'Пауза'}
        </button>
        <button
          className="traffic-light__button"
          onClick={handleNext}
          disabled={!isPaused}
        >
          Вперёд
        </button>
        <button
          className="emergency-mode" onClick={() => {
            setIsPaused(true);
            setIsEmergency(!isEmergency);
          }}
        >
          Экстренный режим
        </button>
      </div>
    </div>
  );
}

export default HooksExample;
