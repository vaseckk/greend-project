import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UserData } from '../../../types/types';
import { AddUserInProjects } from '../../../store/api-actions';
import {getAllUsers} from '../../../store/users-slice/users-selector.ts';
import {getCurrentProject} from '../../../store/project-slice/project-selector.ts';

interface AddUserModalProps {
  onClose: () => void;
}

function AddUserModal({ onClose }: AddUserModalProps) {
  const dispatch = useAppDispatch();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [permissionCode, setPermissionCode] = useState('MEMBER');
  // или другой код доступа

  // Предположим, что у нас есть селектор для получения всех пользователей
  const allUsers = useAppSelector(getAllUsers) || [];
  const currentProject = useAppSelector(getCurrentProject);

  const handleAddUser = () => {
    if (selectedUserId) {
      dispatch(AddUserInProjects({
        userId: selectedUserId,
        projectId: currentProject,
        permissionCode
      }))
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Ошибка при добавлении пользователя:', error);
        });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Добавить участника</h3>

        <div className="form-group">
          <label>Выберите пользователя:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Выберите --</option>
            {allUsers.map((user: UserData) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Уровень доступа:</label>
          <select
            value={permissionCode}
            onChange={(e) => setPermissionCode(e.target.value)}
          >
            <option value="MEMBER">Участник</option>
            <option value="ADMIN">Администратор</option>
            <option value="OWNER">Владелец</option>
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleAddUser} disabled={!selectedUserId}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
