import './time-tracker-table.scss';
import {TimeSheetProjectData} from '../../../types/types.ts';
import { format, startOfWeek, addDays } from 'date-fns';
import {ru} from 'date-fns/locale';
import {deleteLogs, updateLogs} from '../../../store/api-actions.ts';
import {useAppDispatch} from '../../../hooks';
import {useState} from 'react';
import {TIME_SHEET_UNITS} from '../../../const.ts';
import TimeLogsForm from '../logs-form/logs-form.tsx';

interface TimeTrackerTableProps {
  tasks: TimeSheetProjectData[];
  weekStart: string;
  weekEnd: string;
  onTaskDeleted?: () => void;
}

function TimeTrackerTable({tasks, weekStart, onTaskDeleted}: TimeTrackerTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TimeSheetProjectData | null>(null);

  const generateWeekDates = (start: string) => {
    const startDate = new Date(start);
    const monday = startOfWeek(startDate, { weekStartsOn: 1 });
    const dates = [];

    for (let i = 0; i < 7; i++) {
      dates.push(addDays(monday, i));
    }

    return dates;
  }

  const weekDates = generateWeekDates(weekStart);

  const getTaskForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return tasks.filter(task => task.date === dateStr);
  };

  const formatTime = (task: TimeSheetProjectData) => {
    const {amount, timeUnit} = task.timeEstimation;
    return `${amount} ${timeUnit === 'HOURS' ? 'ч.' : 'мин.'}`;
  }

  const handleEdit = (task: TimeSheetProjectData) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateLog = async (data: {
    comment: string;
    timeEstimation: { amount: number; timeUnit: typeof TIME_SHEET_UNITS[number] };
    date: string;
  }) => {
    if (!currentTask) return;

    try {
      await dispatch(updateLogs({
        projectId: currentTask.projectId,
        simpleId: currentTask.taskSimpleId,
        id: currentTask.id,
        data: {
          comment: data.comment,
          timeEstimation: {
            amount: data.timeEstimation.amount,
            timeUnit: data.timeEstimation.timeUnit,
          },
          date: data.date,
        }
      })).unwrap();

      setIsEditModalOpen(false);
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } catch (error) {
      console.error('Ошибка при обновлении таймшита:', error);
    }
  };

  const handleDelete = async (id: string, taskSimpleId: string, projectId: string) => {
    if (!id || !taskSimpleId || !projectId) {
      return;
    }
    try {
      await dispatch(deleteLogs({
        projectId: projectId,
        simpleId: taskSimpleId,
        id: id
      })).unwrap();

      // Вызываем callback для обновления данных
      if (onTaskDeleted) {
        onTaskDeleted();
      }
    } catch (error) {
      console.error('Ошибка при удалении таймшита:', error);
    }
  };

  return (
    <div className="table-parametres">
      <table className="table">
        <thead>
        <tr className="table-header">
          {weekDates.map(date => (
            <th key={date.toString()}>
              <div className="title">
                  <span className="table_text">
                    <div>{format(date, 'EEEE', {locale: ru})}</div>
                    <div>{format(date, 'dd.MM')}</div>
                  </span>
              </div>
            </th>
          ))}
        </tr>
        </thead>
        <tbody className='table-body'>
        <tr className='table_content'>
          {weekDates.map(date => {
            const dateTasks = getTaskForDate(date);
            return (
              <th key={date.toString()}>
                <div className="day-tasks">
                  {dateTasks.length > 0 ? (
                    dateTasks.map(task => (
                      <div key={task.id} className="task-item">
                        <div className="task-item_container">
                          <div className="task_title-sheet">
                            <div className="task-name">{task.taskSimpleId}</div>
                            <div className="task-time">{formatTime(task)}</div>
                          </div>
                          {task.comment && (
                            <div className="task-comment">{task.comment}</div>
                          )}
                          <div className="task-status">Статус: {task.status}</div>
                          <div className="task-item_edit">
                            <button>
                              <img src="../img/edit.png" alt="Редактировать"  onClick={() => handleEdit(task)}/>
                            </button>

                            <button>
                              <img src="../img/delete.png" alt="Удалить" onClick={() => handleDelete(task.id, task.taskSimpleId, task.projectId)}/>
                            </button>
                          </div>

                        </div>
                        {isEditModalOpen && currentTask && (
                          <TimeLogsForm
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSubmit={() => {}} // Не используется в режиме редактирования
                            onUpdate={handleUpdateLog}
                            taskName={currentTask.taskName}
                            taskId={currentTask.taskSimpleId}
                            initialData={{
                              comment: currentTask.comment,
                              timeEstimation: currentTask.timeEstimation,
                              date: currentTask.date,
                            }}
                            isEditing={true}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-tasks">Нет задач</div>
                  )}
                </div>
              </th>
            );
          })}


        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTrackerTable;
