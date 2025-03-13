import { useRef, useState } from 'react';

function UseDropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ссылка на элемент, с которым будем работать

  const toggleDropdown = () => setIsOpen((prev) => !prev); // Для изменения состояния дропдауна
  const closeDropdown = () => setIsOpen(false); // Ручное закрытие дропдауна

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    dropdownRef,
  };
}

export default UseDropdownButton;
