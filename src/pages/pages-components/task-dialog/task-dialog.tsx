import SendMessageForm from '../send-message-form/send-message-sorm.tsx';
import MessageList from '../message-list/message-list.tsx';
import './task-dialog.scss';

function TaskDialog(): JSX.Element {
  return (
    <div className="task-dialog">
      <section className="task-dialog__container">
        <div className="send-message__form">
          <SendMessageForm />
        </div>
        <div className="message-list">
          <MessageList />
        </div>
      </section>
    </div>
  );
}

export default TaskDialog;
