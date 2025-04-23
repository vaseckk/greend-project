import './week-picker-modal.scss'; // Создайте этот файл для стилей

interface WeekPickerModalProps {
  weeks: {
    number: number;
    start: string;
    end: string;
  }[];
  onSelect: (week: {number: number; start: string; end: string}) => void;
  onClose: () => void;
}

function WeekPickerModal({ weeks, onSelect, onClose }: WeekPickerModalProps) {
  return (
    <div className="week-modal-overlay" onClick={onClose}>
      <div className="week-modal" onClick={(e) => e.stopPropagation()}>
        <div className="week-modal_container">
          <div className="week-modal-content">
            <h3>Выберите неделю {new Date().getFullYear()} года</h3>
            <div className="weeks-list">
              {weeks.map((week) => (
                <div
                  key={week.number}
                  className="week-item"
                  onClick={() => {
                    onSelect(week);
                    onClose();
                  }}
                >
                  неделя {week.number} ({week.start} - {week.end})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekPickerModal;
