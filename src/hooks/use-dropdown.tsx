import {useEffect, useRef, useState} from 'react';

function
UseDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // isOpen - это начальное состояние, которое не изменяется,
  // SetIsOpen - это переменная, в которую запишется изменённое состояние блока
  const dropdownRef = useRef<HTMLDivElement | null>(null); //Ссылка на элемент, с которым будем работать

  const toggleDropdown = () => setIsOpen((prev) => !prev); //Для изменения состояние кнопки
  const closeDropdown = () => setIsOpen(false); //Для закрывание вне блока

  const handleClickOutside = (evt: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(evt.target as Node)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    dropdownRef,
  };
}

export default UseDropdown;
