import './time-tracker-table.scss';

function TimeTrackerTable(): JSX.Element {
  return (
    <div className="table-parametres">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>
              <div className="title">
                <span className="table_text">Понедельник</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Вторник</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Среда</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Четверг</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Пятница</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Суббота</span>
              </div>
            </th>
            <th>
              <div className="title">
                <span className="table_text">Воскресенье</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='table_content'>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimeTrackerTable;
