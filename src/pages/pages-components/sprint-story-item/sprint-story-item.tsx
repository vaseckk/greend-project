import {StoriesData, SubtaskData} from '../../../types/types.ts';
import useDropdown from '../../../hooks/use-dropdown.tsx';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, statuses} from '../../../const.ts';

interface StoryItemProps {
  story: StoriesData;
  defects: SubtaskData[]; // или правильный тип для defects
  getStatusLabel: (priority: string) => string;
}

function StoryItem({ story, defects, getStatusLabel }: StoryItemProps) {
  const StoryDropdown = useDropdown();

  return (
    <div className="story-container" ref={StoryDropdown.dropdownRef}>
      <div className="story" onClick={StoryDropdown.toggleDropdown}>
        <img
          src="/img/chevron.png"
          alt=""
          className={`${StoryDropdown.isOpen ? 'rotate' : ''}`}
        />
        <Link
          to={generatePath(AppRoute.Story, {id: story.simpleId})}
          className="link-story"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>{story.simpleId}: {story.name}</h1>
        </Link>
        <p>
          {story.subtasks.filter((s) => s.status === 'OPEN').length} задач открыто
        </p>
      </div>

      {StoryDropdown.isOpen && (
        <div className="story-open">
          <table className="table-story">
            <tbody>
              <tr>
                {statuses.map((status) => (
                  <th key={status}>
                    <div className="status-column">
                      {/* Subtasks */}
                      {story.subtasks
                        .filter((subtask) => subtask.status === status)
                        .map((subtask) => (
                          <Link
                            to={generatePath(AppRoute.Task, {id: subtask.simpleId})}
                            key={subtask.simpleId}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="content-story">
                              <div className="content-story-parametres">
                                <div className="table_text-story">
                                  {subtask.simpleId}: {subtask.name}
                                </div>
                                <div className="table-count-story">
                                  <span>{getStatusLabel(subtask.priority)}</span>
                                  <span className="count-time-span">
                                    <div className="count-time">2ч.</div>
                                  </span>
                                </div>
                              </div>
                            </button>
                          </Link>
                        ))}

                      {defects
                        .filter((defect) => defect.status === status && defect.simpleId.startsWith(story.simpleId))
                        .map((defect) => (
                          <Link
                            to={generatePath(AppRoute.Defect, {id: defect.simpleId})}
                            key={defect.simpleId}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="content-story defect">
                              <div className="content-story-parametres">
                                <div className="table_text-story">
                                  {defect.simpleId}: {defect.name} (Дефект)
                                </div>
                                <div className="table-count-story">
                                  <span>{getStatusLabel(defect.priority)}</span>
                                  <span>{defect.assigneeId}</span>
                                  <span className="count-time-span">
                                    <div className="count-time">2ч.</div>
                                  </span>
                                </div>
                              </div>
                            </button>
                          </Link>
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StoryItem;
