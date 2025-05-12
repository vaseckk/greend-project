import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UserProjectsControllerData} from '../../../types/types';
import { AddUserInProjects } from '../../../store/api-actions';
import {getAllUsers} from '../../../store/users-slice/users-selector.ts';

interface AddUserModalProps {
  onClose: () => void;
  projectId: string;
  currentUsers: UserProjectsControllerData[];
}

function AddUserModal({ onClose, projectId, currentUsers }: AddUserModalProps) {
  const dispatch = useAppDispatch();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [permissionCode, setPermissionCode] = useState('MEMBER');
  const allUsers = useAppSelector(getAllUsers) || [];

  const availableUsers = allUsers.filter(
    (user) => !currentUsers.some((projectUser) => projectUser.userId === user.id)
  );

  const handleAddUser = () => {
    if (selectedUserId && projectId) {
      dispatch(
        AddUserInProjects({
          userId: selectedUserId,
          projectId,
          permissionCode,
        })
      )
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch(() => {});
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
            {availableUsers.map((user) => (
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
          <button
            onClick={handleAddUser}
            disabled={!selectedUserId}
            className={!selectedUserId ? 'disabled' : ''}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUserModal;
