import '../story/boards-agile-story.scss';
import {useAppSelector} from '../../../../hooks';
import {getCurrentSprint} from '../../../../store/sprint-slice/sprint-selector.ts';
import {StatusPriority} from '../../../../const.ts';
import StoryItem from '../../sprint-story-item/sprint-story-item.tsx';

function BoardsAgileStory(): JSX.Element {
  const currentSprint = useAppSelector(getCurrentSprint);

  if (!currentSprint) {
    return <div></div>;
  }

  const getStatusLabel = (priority: string) => StatusPriority[priority as keyof typeof StatusPriority] || priority;

  return (
    <section className="boards-agile-story">
      {currentSprint.stories.map((story) => (
        <StoryItem
          key={story.simpleId}
          story={story}
          defects={currentSprint.defects}
          getStatusLabel={getStatusLabel}
        />
      ))}
    </section>
  );
}

export default BoardsAgileStory;
