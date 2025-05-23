import {ChangeEvent, useEffect, useState} from 'react';
import './tags.scss';
import {MAX_LENGTH_SHOW_TAGS} from '../../../const.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {createTag, deleteTag} from '../../../store/api-actions.ts';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';
import {KeyboardEvent} from 'react';

function Tags(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(getProjectInfo);
  const projectTags = currentProject?.tags || [];

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  const visibleLengthTags = projectTags.length > MAX_LENGTH_SHOW_TAGS;
  const displayedTags = showAllTags ? projectTags : projectTags.slice(0, MAX_LENGTH_SHOW_TAGS);

  const handleAddTag = () => {
    if (!currentProject || !inputValue.trim()) {
      return;
    }

    // Проверяем, есть ли уже такой тег
    const tagExists = projectTags.some((tag) =>
      tag.name.toLowerCase() === inputValue.trim().toLowerCase()
    );

    if (!tagExists) {
      dispatch(createTag({
        name: inputValue.trim(),
        projectId: currentProject.id
      }));
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    dispatch(deleteTag(tagId));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z_-]/g, '');
    setInputValue(filteredValue);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleConfirmSelection = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    if (projectTags.length <= MAX_LENGTH_SHOW_TAGS) {
      setShowAllTags(false);
    }
  }, [projectTags.length]);

  return (
    <div className="tags-content">
      <p className='project_details_key tags'>Теги:</p>
      <div className="project_details-form-block">
        {isFormVisible ? (
          <div className="form-block">
            <div className="form-block__input">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите название тега (английские буквы)"
                className="tags__input"
                autoFocus
              />
              <button
                className="tags__button_add"
                onClick={handleAddTag}
                disabled={!inputValue.trim()}
              >
                <img src='../img/add.png' alt="Добавить тег"/>
              </button>
              <button
                className="tags_button_check"
                onClick={handleConfirmSelection}
              >
                <img src='../img/check.png' alt="Подтвердить"/>
              </button>
            </div>
          </div>
        ) : (
          <div className='tags_main'>
            <div className="tags_show_tags">
              {displayedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="project_details_value tags-list"
                >
                  <div className='tags-list_value'>{tag.name}</div>
                  {isFormVisible && (
                    <img
                      src="../img/close.png"
                      alt="Удалить тег"
                      onClick={() => handleRemoveTag(tag.id)}
                    />
                  )}
                </div>
              ))}
            </div>

            {visibleLengthTags && (
              <button
                className="tags__button_more"
                onClick={() => setShowAllTags(!showAllTags)}
              >
                {showAllTags ? 'Скрыть' : '...'}
              </button>
            )}

            <button
              className="tags-add"
              onClick={() => setIsFormVisible(true)}
            >
              <img src='../img/add.png' alt="Добавить тег"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tags;
