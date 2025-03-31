import {ChangeEvent, useEffect, useState} from 'react';
import './tags.scss';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import {MAX_LENGTH_SHOW_TAGS, MIN_LENGTH_SHOW_TAGS} from '../../../const.ts';

function Tags(): JSX.Element {
  const dropdownTags = useDropdownButton();

  const [isFormVisible, setIsFormVisible] = useState(false); // Видимость формы
  const [tags, setTags] = useState<string[]>(() => {
    const savedTags = typeof window !== 'undefined' ? localStorage.getItem('tags') : null;
    return savedTags ? JSON.parse(savedTags) as string[] : [];
  }); // Список тегов
  const [inputValue, setInputValue] = useState(''); // Текст в поле ввода
  const [existingTags] = useState<string[]>(['react', 'hooks', 'typescript', 'hi']);
  const visibleLengthTags = tags.length > MAX_LENGTH_SHOW_TAGS;
  const [showAllTags, setShowAllTags] = useState(false);

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleTagSelect = (tag: string) => {
    setInputValue(tag);
  };

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    const handleKeyPress = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key.toLowerCase() === 'enter' && inputValue.trim()) {
        keyboardEvent.preventDefault();
        handleAddTag();
      }
    };

    const inputElement = document.querySelector('.tags__input');
    inputElement?.addEventListener('keydown', handleKeyPress);

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue, handleAddTag]);

  useEffect(() => {
    if (tags.length <= MAX_LENGTH_SHOW_TAGS) {
      setShowAllTags(false); // Сбрасываем флаг, если тегов меньше или равно 4
    }
  }, [tags.length]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Оставляем только английские буквы (большие и маленькие)
    const filteredValue = value.replace(/[^a-zA-Z_-]/g, '');
    setInputValue(filteredValue);
  };

  return (
    <div className="tags-content">
      <p className='project_details_key tags'>Теги:</p>
      <div className="project_details-form-block">
        {isFormVisible && (
          <div className="form-block">
            <div className="form-block__input" ref={dropdownTags.dropdownRef}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Добавьте тег на английском языке"
                className="tags__input"
              />
              <button className='tags__input_img' onClick={dropdownTags.toggleDropdown} >
                <img src='../img/chevron_right_example.png' alt=""/>
              </button>
              <button className="tags__button_add"
                onClick={handleAddTag}
              >
                <img src='../img/add.png' alt=""/>
              </button>
              <button className="tags_button_check"
                onClick={() => setIsFormVisible(!isFormVisible)}
              >
                <img src='../img/check.png'
                  alt=""
                />
              </button>
            </div>
            {dropdownTags.isOpen && (
              <article className="tags_block__existing">
                {existingTags
                  .filter((tag) => tag.includes(inputValue))
                  .map((tag) => (
                    <div key={tag} className='tags__existing' onClick={() => handleTagSelect(tag)}>
                      <p>{tag}</p>
                    </div>
                  ))}
              </article>
            )}
          </div>
        )}

        <div className='tags_main'>
          <div className={`tags_show_tags ${showAllTags ? 'showAllTags' : ''}`}>
            {tags.slice(MIN_LENGTH_SHOW_TAGS, MAX_LENGTH_SHOW_TAGS).map((tag) => (
              <div key={tag}
                className={`project_details_value tags-list ${isFormVisible ? 'shifted ' : ''} ${showAllTags ? 'shiftedAllTags' : ''}`}
              >
                <div className='tags-list_value'>
                  {tag}
                </div>
                {isFormVisible ? <img src="../img/close.png" alt="" onClick={() => handleRemoveTag(tag)}/> : ''}
              </div>
            ))}

            {showAllTags && tags.slice(MAX_LENGTH_SHOW_TAGS).map((tag) => (
              <div key={tag}
                className={`project_details_value tags-list ${isFormVisible ? 'shifted' : ''} tags-list-additional ${showAllTags ? 'shiftedAllTags' : ''}`}
              >
                <div className='tags-list_value'>{tag}</div>
                {isFormVisible && <img src="../img/close.png" alt="" onClick={() => handleRemoveTag(tag)}/>}
              </div>
            ))}

          </div>


          {visibleLengthTags && (
            <button className="tags__button_more" onClick={() => setShowAllTags(!showAllTags)}>
              <p>{showAllTags ? '×' : '...'}</p>
            </button>
          )}

          {isFormVisible ? '' :
            <button className="tags-add"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              <img src='../img/add.png' alt=""/>
            </button>}
        </div>
      </div>
    </div>
  );
}

export default Tags;
