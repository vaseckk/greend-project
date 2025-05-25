import '../table/boards-agile-table.scss';
import {useAppSelector} from '../../../../hooks';
import {getCurrentSprint} from '../../../../store/sprint-slice/sprint-selector.ts';
import {Statuses} from '../../../../types/types.ts';
import {statuses, statusLabels} from '../../../../const.ts';

function BoardsAgileTable(): JSX.Element {
  const currentSprint = useAppSelector(getCurrentSprint);

  const countTaskByStatus = (status: Statuses)=> {
    if(!currentSprint){
      return 0;
    }

    let count = 0;

    currentSprint.stories.forEach((story) => {
      story.subtasks.forEach((subtask) => {
        if (subtask.status === status) {
          count++;
        }
      });
    });

    currentSprint.defects.forEach((defect) => {
      if (defect.status === status) {
        count++;
      }
    });

    return count;
  };

  return (
    <div className="table-parametres">
      <table className="table">
        <thead>
          <tr>
            {statuses.map((status) => (
              <th key={status}>
                <div className="content">
                  <span className="table_text">{statusLabels[status]}</span>
                  <span className="table_count">{countTaskByStatus(status)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default BoardsAgileTable;
