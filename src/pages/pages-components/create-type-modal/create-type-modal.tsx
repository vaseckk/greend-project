import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

export const CreationTypeModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Что вы хотите создать?</h2>
        <div className="modal-buttons">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(AppRoute.CreateProject);
            }}
          >
            Новый проект
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(AppRoute.CreateTask);
            }}
          >
            Подзадачу проекта
          </button>
        </div>
      </div>
    </div>
  );
};
