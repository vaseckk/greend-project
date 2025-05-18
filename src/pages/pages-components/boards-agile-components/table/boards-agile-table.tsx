import '../table/boards-agile-table.scss';

function BoardsAgileTable(): JSX.Element {
  return (
    <div className="table-parametres">
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="content">
                <span className="table_text">Открыта</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">Готова к реализации</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">В работе</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">На ревью</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">Ревью пройдено</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">На тестировании</span>
                <span className="table_count">123</span>
              </div>
            </th>
            <th>
              <div className="content">
                <span className="table_text">Завершена</span>
                <span className="table_count">123</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default BoardsAgileTable;
