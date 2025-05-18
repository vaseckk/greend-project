import {useState, useCallback, useMemo, useEffect} from 'react';
import { getUsersAutocomplete } from '../../../store/api-actions.ts';
import { getUsersAutocompleteList } from '../../../store/users-slice/users-selector.ts';
import { AddUserInProjects } from '../../../store/api-actions.ts';
import {getAddedUsers} from '../../../store/add-user-slice/add-user-selector.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getProjectInfo} from '../../../store/project-slice/project-selector.ts';
import './add-user-modal.scss';

function AddUserModal(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const usersAutocomplete = useAppSelector(getUsersAutocompleteList);
  const addedUsers = useAppSelector(getAddedUsers);
  const dispatch = useAppDispatch();
  const project = useAppSelector(getProjectInfo);

  const filteredUsers = useMemo(() => usersAutocomplete.filter((user) =>
    `${user.lastName} ${user.firstName}`.toLowerCase().includes(searchQuery.toLowerCase())
  ), [usersAutocomplete, searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const timer = setTimeout(() => {
        dispatch(getUsersAutocomplete(searchQuery));
        setIsDropdownOpen(true);
      }, 300); // Задержка 300мс

      return () => clearTimeout(timer);
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchQuery, dispatch]);

  const handleAddUser = useCallback(async (userId: string) => {
    if (project?.id) {
      try {
        await dispatch(AddUserInProjects({
          userId,
          projectId: project.id,
        })).unwrap(); // unwrap для обработки возможных ошибок

        // После успешного добавления
        setSearchQuery('');
        setIsDropdownOpen(false);

        // Можно добавить уведомление об успешном добавлении
      } catch (error) {
        // Можно добавить уведомление об ошибке
      }
    }
  }, [dispatch, project]);

  return (
    <div className="add-user-dropdown">
      <input
        type="text"
        placeholder="Поиск пользователей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.length > 1 && setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        className="add-user-search"
      />

      {isDropdownOpen && filteredUsers.length > 0 && (
        <div className="user-search-results">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-search-item">
              <img
                src="../img/account_circle.png"
                alt="иконка аккаунта"
                className="user-avatar"
              />
              <span className="user-name">
                {user.lastName} {user.firstName}
              </span>
              {!addedUsers.some((added) => added.userId === user.id) && (
                <button
                  onClick={() => handleAddUser(user.id)}
                  className="add-user-button"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddUserModal;

