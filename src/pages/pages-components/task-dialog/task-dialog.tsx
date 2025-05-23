import SendMessageForm from '../send-message-form/send-message-sorm.tsx';
import MessageList from '../message-list/message-list.tsx';
import './task-dialog.scss';
import {useState} from 'react';

interface TaskDialogProps {
  taskSimpleId: string;
}

function TaskDialog({taskSimpleId}: TaskDialogProps): JSX.Element {
  const [editingComment, setEditingComment] = useState<{
    id: string;
    content: string;
  } | null>(null);

  const handleEditComment = (comment: {id: string; content: string}) => {
    setEditingComment(comment);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  const handleUpdateSuccess = () => {
    setEditingComment(null);
  };

  return (
    <div className="task-dialog">
      <section className="task-dialog__container">
        <div className="send-message__form">
          <SendMessageForm
            taskSimpleId={taskSimpleId}
            editingComment={editingComment}
            onCancelEdit={handleCancelEdit}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
        <div className="message-list">
          <MessageList
            taskSimpleId={taskSimpleId}
            onEditComment={handleEditComment}
          />
        </div>
      </section>
    </div>
  );
}

export default TaskDialog;
