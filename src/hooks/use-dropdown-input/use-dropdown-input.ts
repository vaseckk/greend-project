import useDropdown from '../use-dropdown.tsx';
import {ChangeEvent, useEffect, useState} from 'react';

export const useDropdownInput = <T extends string>(initialItems: T[]) => {
  const {isOpen, toggleDropdown, closeDropdown, dropdownRef} = useDropdown();
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(initialItems);
  const [allItems] = useState<T[]>(initialItems);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if(!isOpen && value) {
      toggleDropdown();
    }
  };

  const handleItemSelect = (item: T) => {
    setInputValue(item);
    closeDropdown();
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(
        allItems.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue, allItems]);

  return {
    inputValue,
    items: filteredItems,
    isOpen,
    dropdownRef,
    handleInputChange,
    handleItemSelect,
    toggleDropdown,
    closeDropdown,
  };
};
