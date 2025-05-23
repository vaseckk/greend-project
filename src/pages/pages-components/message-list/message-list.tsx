import './message-list.scss';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getAlComments} from '../../../store/comments-slice/comment-selector.ts';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';
import {deleteComments} from '../../../store/api-actions.ts';

interface MessageListProps {
  taskSimpleId: string;
  onEditComment: (comment: {id: string; content: string}) => void;
}

function MessageList({taskSimpleId, onEditComment}: MessageListProps): JSX.Element {
  const allComments = useAppSelector(getAlComments);
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(getProjectInfo);

  const handleDelete = (commentId: string) => {
    if (!currentProject?.id) {
      return;
    }
    dispatch(deleteComments({
      projectId: currentProject?.id,
      simpleId: taskSimpleId,
      id: commentId
    }));
  };

  return (
    <div className="message-list__container">
      {allComments.length > 0 ? (
        <section className="message-list">
          {allComments.map((comment) => (
            <div key={comment.id}>
              <div className="message-list_time">
                <p>{comment.created}</p>
              </div>

              <article className="message-list__description">
                <p>
                  {comment.content}
                </p>
                <div className="message-actions">
                  <button
                    className="message-delete"
                    onClick={() => handleDelete(comment.id)}
                  >
                    <img src="../img/delete.png" alt="Удалить"/>
                  </button>
                  <button
                    className="message-edit"
                    onClick={() => onEditComment({id: comment.id, content: comment.content})}
                  >
                    <img src="../img/edit.png" alt="Редактировать"/>
                  </button>
                </div>
              </article>

              <div className="message-list_sender">
                <p>
                  {comment.authorName}
                </p>
              </div>
            </div>
          ))}

        </section>
      ) : (
        <div className="empty-message">Оставьте первый комментарий!</div>
      )}

    </div>
  );
}

export default MessageList;
