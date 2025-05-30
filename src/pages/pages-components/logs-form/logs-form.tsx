import {ChangeEvent, FormEvent, useState} from 'react';
import {TimeEstimationSheetData} from '../../../types/types.ts';
import {TIME_SHEET_UNITS} from '../../../const.ts';

interface TimeLoggingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    comment: string;
    timeEstimation: { amount: number; timeUnit: typeof TIME_SHEET_UNITS[number] };
    date: string;
  }) => void;
  taskName: string;
  taskId: string;
  initialData?: {  // Добавляем опциональные начальные данные
    comment: string;
    timeEstimation: TimeEstimationSheetData;
    date: string;
  };
  isEditing?: boolean; // Флаг режима редактирования
  onUpdate?: (data: {  // Callback для обновления
    comment: string;
    timeEstimation: { amount: number; timeUnit: typeof TIME_SHEET_UNITS[number] };
    date: string;
  }) => void;
}

function TimeLogsForm({
  isOpen,
  onClose,
  onSubmit,
  taskName,
  taskId,
  initialData,
  isEditing = false,
  onUpdate,
}: TimeLoggingModalProps) {
  const [timeEstimations, setTimeEstimations] = useState<TimeEstimationSheetData>({
    amount: 0,
    timeUnit: 'HOURS',
  });

  const [logsData, setLogsData] = useState({
    comment: initialData?.comment || '',
    timeEstimation: {
      timeUnit: initialData?.timeEstimation.timeUnit || TIME_SHEET_UNITS[1],
      amount: initialData?.timeEstimation.amount || 0,
    },
    date: initialData?.date || '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLogsData({
      ...logsData,
      [name]: value,
    });
  };

  const handleTimeEstimationChange = (field: keyof TimeEstimationSheetData, value: string | number) => {
    setTimeEstimations((prev) => ({
      ...prev,
      [field]: field === 'amount' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submitData = {
      comment: logsData.comment,
      timeEstimation: {
        amount: Number(timeEstimations.amount) || 0,
        timeUnit: timeEstimations.timeUnit,
      },
      date: logsData.date,
    };

    if (isEditing && onUpdate) {
      onUpdate(submitData);
    } else {
      onSubmit(submitData);
    }
  };

  if (!isOpen) return null;

  return (
    <form className="logs-modal-overlay" onSubmit={handleSubmit}>
      <div className="logs-modal">
        <div className="close-logs-modal">
          <p>Добавьте рабочие часы</p>
          <img
            src="../img/close.png"
            alt=""
            onClick={() => {
              onClose();
              setLogsData({
                comment: '',
                timeEstimation: { amount: 0, timeUnit: 'HOURS' },
                date: '',
              });
              setTimeEstimations({ amount: 0, timeUnit: 'HOURS' });
            }}
          />
        </div>
        <div className="logs-modal_container">
          <div className="logs-modal-content">
            <div className="logs_task">
              <p>Задача</p>
              <div className="logs_task-name">
                {taskId}: {taskName}
              </div>
            </div>

            <article className="logs_time-estimation">
              <p>Укажите затраченное время</p>
              <div className="logs_time-estimation__container">
                <div className="logs_time-estimation__item">
                  <div className="logs_time-estimation__input-container">
                    <input
                      type="number"
                      placeholder="Количество"
                      value={timeEstimations.amount}
                      onChange={(e) => handleTimeEstimationChange('amount', e.target.value)}
                      min="0"
                      step="1"
                    />

                    <select
                      value={timeEstimations.timeUnit}
                      onChange={(e) => handleTimeEstimationChange('timeUnit', e.target.value)}
                    >
                      {TIME_SHEET_UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit.toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </article>

            <div className="logs_time-end_container">
              <p>Дата окончания</p>
              <div className="logs_time-end">
                <input
                  type="date"
                  name="date"
                  value={logsData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="logs_comment">
              <p>Комментарий</p>
              <div className="logs_comment_container">
                <textarea
                  name="comment"
                  value={logsData.comment}
                  onChange={handleInputChange}
                  rows={15}
                ></textarea>
              </div>
            </div>
            <div className="save-logs_container">
              <button type="submit" className="save-logs">
                Сохранить логи
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TimeLogsForm;
