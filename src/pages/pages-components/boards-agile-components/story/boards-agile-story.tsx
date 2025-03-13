import '../story/boards-agile-story.scss';
import useDropdown from '../../../../hooks/use-dropdown.tsx';

function BoardsAgileStory(): JSX.Element {
  const Story = useDropdown();

  return (
    <section className="boards-agile-story" ref={Story.dropdownRef}>
      <div className="story" onClick={Story.toggleDropdown}>
        <img src="/img/chevron.png" alt="" className=""/>
        <h1>GD-2: Проработать ошибки при аутентификации</h1>
        <p>2 задачи открыты</p>
      </div>
      {Story.isOpen && (
        <div className="story-open">
          <table className="table-story">
            <tr>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
              <th>
                <button className="content-story">
                  <div className="content-story-parametres">
                    <div className="table_text-story">GD-2: Описать существующие ошибки</div>
                    <div className="table-count-story">
                      <span>High</span>
                      <span> Оксана В.</span>
                      <span className="count-time-span">
                        <div className="count-time">2ч.</div>
                      </span>
                    </div>
                  </div>
                </button>
              </th>
            </tr>
          </table>
        </div>
      )}


    </section>
  );
}

export default BoardsAgileStory;
