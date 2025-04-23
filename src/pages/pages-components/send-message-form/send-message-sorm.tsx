import './send-message-form.scss';
import {useEffect, useRef, KeyboardEvent} from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';

function SendMessageForm(): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdwonShowEmojiPicker = useDropdownButton();

  const adjustTextareaRef = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

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
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault(); // Предотвращаем стандартное поведение (например, отправку формы)
      const textarea = e.currentTarget;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      // Вставляем перенос строки
      textarea.value = `${textarea.value.substring(0, startPos)}\n${textarea.value.substring(endPos)}`;

      // Перемещаем курсор после вставленного переноса
      textarea.selectionStart = startPos + 1;
      textarea.selectionEnd = startPos + 1;
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if(!textareaRef.current) {
      return;
    }
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    textarea.value = `${textarea.value.substring(0, startPos)}\n${textarea.value.substring(endPos)}`;

    textarea.selectionStart = startPos + emojiData.emoji.length;
    textarea.selectionEnd = endPos + emojiData.emoji.length;

    adjustTextareaRef();
  };

  return (
    <div className="form_container" ref={dropdwonShowEmojiPicker.dropdownRef}>
      <form action="" className="send-message__form">
        <textarea
          ref={textareaRef}
          className="send-message__input"
          placeholder='Написать сообщение...'
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          type="button"
          className="emoji-button"
          onClick={dropdwonShowEmojiPicker.toggleDropdown}
        >
          <img
            className="send-message__img-emoji"
            src="../img/emoji.png"
            alt="Emoji"
          />
        </button>
        <img className='send-message__img' src="../img/send.png" alt=""/>
      </form>

      {dropdwonShowEmojiPicker.isOpen && (
        <div className="emoji-picker-wrapper">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width="calc((1vw + 1vh) * 13)"
            height="calc((1vw + 1vh) * 12)"
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}

export default SendMessageForm;
