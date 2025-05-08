import {ChangeEvent, useEffect, useState} from 'react';
import './tags.scss';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import {MAX_LENGTH_SHOW_TAGS, MIN_LENGTH_SHOW_TAGS} from '../../../const.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getTags} from '../../../store/tags-slice/tags-selector.ts';
import {createTag, deleteTag} from '../../../store/api-actions.ts';
import {getCurrentProject} from '../../../store/project-slice/project-selector.ts';

function Tags(): JSX.Element {
  const dispatch = useAppDispatch();
  const serverTags = useAppSelector(getTags);
  const currentProject = useAppSelector(getCurrentProject);

  const dropdownTags = useDropdownButton();

  const [isFormVisible, setIsFormVisible] = useState(false); // Видимость формы
  const [inputValue, setInputValue] = useState(''); // Текст в поле ввода
  const [existingTags] = useState<string[]>(['react', 'hooks', 'typescript', 'hi']);
  const visibleLengthTags = serverTags.length > MAX_LENGTH_SHOW_TAGS;
  const [showAllTags, setShowAllTags] = useState(false);

  const handleAddTag = () => {
    if (!currentProject) {
      return;
    }

    if (inputValue.trim() && !serverTags.some((tag) => tag.name === inputValue)) {
      dispatch(createTag({
        name: inputValue,
        projectId: currentProject.id // Используем ID текущего проекта
      }));
      setInputValue('');
    }
  };

  const handleTagSelect = (tag: string) => {
    setInputValue(tag);
  };

  const handleRemoveTag = (tagId: string) => {
    dispatch(deleteTag(tagId));
  };

  useEffect(() => {
    if (serverTags.length <= MAX_LENGTH_SHOW_TAGS) {
      setShowAllTags(false);
    }
  }, [serverTags.length]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z_-]/g, '');
    setInputValue(filteredValue);
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
    inputElement?.addEventListener('keydown', handleKeyPress as EventListener);

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyPress as EventListener);
    };
  }, [inputValue, handleAddTag]);

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
            {serverTags.slice(MIN_LENGTH_SHOW_TAGS, MAX_LENGTH_SHOW_TAGS).map((tag) => (
              <div key={tag.id}
                className={`project_details_value tags-list ${isFormVisible ? 'shifted ' : ''} ${showAllTags ? 'shiftedAllTags' : ''}`}
              >
                <div className='tags-list_value'>
                  {tag.name}
                </div>
                {isFormVisible ? <img src="../img/close.png" alt="" onClick={() => handleRemoveTag(tag.id)}/> : ''}
              </div>
            ))}

            {showAllTags && serverTags.slice(MAX_LENGTH_SHOW_TAGS).map((tag) => (
              <div key={tag.id}
                className={`project_details_value tags-list ${isFormVisible ? 'shifted' : ''} tags-list-additional ${showAllTags ? 'shiftedAllTags' : ''}`}
              >
                <div className='tags-list_value'>{tag.name}</div>
                {isFormVisible && <img src="../img/close.png" alt="" onClick={() => handleRemoveTag(tag.id)}/>}
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
