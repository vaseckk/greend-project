import {useEffect, useRef, useState} from 'react';

function UseDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // isOpen - это начальное состояние, которое не изменяется,
  // SetIsOpen - это переменная, в которую запишется изменённое состояние блока
  const dropdownRef = useRef<HTMLDivElement | null>(null); //Ссылка на элемент, с которым будем работать

  const toggleDropdown = () => setIsOpen((prev) => !prev); //Для изменения состояние кнопки
  const closeDropdown = () => setIsOpen(false); //Для закрывание вне блока

  const handleClickOutside = (evt: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(evt.target as Node)) {
      //Где current - это указатель на данный элемент, contains - нативный метод js, который смотрит
      // содержит ли DOM узел данный элемент, evt.target указывает на конкретный элемент, на который был
      //выполнен клик(допустим если кликнули внутри дпродауна, то evt.target будет указывать на кнопку,
      // а если нет, то на другой внешний элемент)
      closeDropdown();//если клик произошёл вне дропдауна, то вызывается эта функция, чтобы закрыть дропдаун
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
