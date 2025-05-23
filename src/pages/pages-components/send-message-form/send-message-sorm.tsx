import './send-message-form.scss';
import {useEffect, useRef, KeyboardEvent, useState, ChangeEvent, FormEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';
import {createComments, updateComment} from '../../../store/api-actions.ts';

interface SendMessageFormProps {
  taskSimpleId: string;
  editingComment: {id: string; content: string} | null;
  onCancelEdit: () => void;
  onUpdateSuccess: () => void;
}

function SendMessageForm({taskSimpleId, editingComment, onCancelEdit, onUpdateSuccess}: SendMessageFormProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(getProjectInfo);

  const [commentData, setCommentData] = useState({
    content: ''
  });

  const adjustTextareaRef = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setCommentData({
      ...commentData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentProject?.id || !taskSimpleId || !commentData.content.trim()) {
      return;
    }

    if (editingComment) {
      dispatch(updateComment({
        projectId: currentProject.id,
        simpleId: taskSimpleId,
        id: editingComment.id,
        data: {content: commentData.content}
      })).then(() => {
        setCommentData({content: ''});
        onUpdateSuccess();
      });
    } else {
      // Создание нового комментария
      dispatch(createComments({
        projectId: currentProject.id,
        simpleId: taskSimpleId,
        commentData: {
          ...commentData,
        }
      })).then(() => {
        setCommentData({content: ''});
      });
    }
  };

  useEffect(() => {
    if (editingComment) {
      setCommentData({content: editingComment.content});
      adjustTextareaRef();
    }
  }, [editingComment]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.addEventListener('input', adjustTextareaRef);
      return () => {
        textarea.removeEventListener('input', adjustTextareaRef);
      };
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Обрабатываем только Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      const newValue =
        `${commentData.content.substring(0, startPos)}\n${commentData.content.substring(endPos)}`;

      setCommentData({
        ...commentData,
        content: newValue
      });

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = startPos + 1;
          textareaRef.current.selectionEnd = startPos + 1;
        }
      }, 0);
    }
  };

  return (
    <div className="form_container">
      <form className="send-message__form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="send-message__input"
          value={commentData.content}
          name='content'
          placeholder={editingComment ? 'Редактирование сообщения...' : 'Написать сообщение...'}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          rows={1}
        />
        {editingComment ? (
          <div className="edit-actions">
            <button
              type="button"
              className="cancel-edit"
              onClick={onCancelEdit}
            >
              Отмена
            </button>
            <button type="submit" className="send-message__button">
              <img className='send-message__img' src="../img/save.png" alt="Сохранить"/>
            </button>
          </div>
        ) : (
          <button type="submit" className="send-message__button">
            <img className='send-message__img' src="../img/send.png" alt="Отправить"/>
          </button>
        )}
      </form>
    </div>
  );
}

export default SendMessageForm;
