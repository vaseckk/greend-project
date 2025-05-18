import {UserNameData} from '../../../types/types.ts';
import useDropdownButton from '../../../hooks/use-dropdown-button/use-dropdown-button.ts';
import {ChangeEvent, useEffect, useState} from 'react';

type UserSelectProps = {
  users: UserNameData[];
  placeholder: string;
  onSelect: (userId: string) => void;
  initialValue?: string;
};

export default function UsersSelectSubtask({ users, placeholder, onSelect, initialValue = '' }: UserSelectProps) {
  const dropdown = useDropdownButton();
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserNameData[]>([]);

  useEffect(() => {
    if (initialValue && users.length > 0) {
      const user = users.find((u) => u.id === initialValue);
      if (user) {
        setSearchValue(`${user.firstName} ${user.lastName}`);
      }
    }
  }, [initialValue, users]);

  useEffect(() => {
    if (searchValue) {
      setFilteredUsers(
        users.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredUsers([]);
    }
  }, [searchValue, users]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dropdown.toggleDropdown();
  };

  const handleUserSelect = (user: UserNameData) => {
    setSearchValue(`${user.firstName} ${user.lastName}`);
    onSelect(user.id);
    dropdown.closeDropdown();
  };

  return (
    <div className="task-basic_type-choose-wrapper">
      <button
        type="button"
        className="task-basic_type-choose"
        onClick={dropdown.toggleDropdown}
      >
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
        />
      </button>
      {dropdown.isOpen && filteredUsers.length > 0 && (
        <div className="choose-user-dropdown">
          <ul>
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user)}
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

