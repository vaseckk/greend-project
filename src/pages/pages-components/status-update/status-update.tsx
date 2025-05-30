{/*import {statusLabels} from '../../../const.ts';
import {useDropdownInput} from '../../../hooks/use-dropdown-input/use-dropdown-input.ts';
import {FormEvent, useMemo} from 'react';

type StatusSelectFormProps = {
  options: typeof statusLabels;
  currentStatus?: string;
  onSubmit: (statusCode: string) => void;
};

export function StatusSelectForm({
  options,
  currentStatus,
  onSubmit,
}: StatusSelectFormProps) {
  const dropdownStatus = useDropdownInput(options.map((option) => option.value));

  const selectedStatus = useMemo(
    () => options.find((option) => option.value === dropdownStatus.inputValue),
    [dropdownStatus.inputValue, options]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedStatus?.code) return;
    onSubmit(selectedStatus.code);
  };

  return (
    <form onSubmit={handleSubmit} className="status-choose">
      <div ref={dropdownStatus.dropdownRef} className="status-choose__dropdown">
        <div className="status-container">
          <input
            type="text"
            value={dropdownStatus.inputValue}
            onChange={dropdownStatus.handleInputChange}
            onClick={dropdownStatus.toggleDropdown}
            placeholder="Выберите статус"
            className="status-input"
          />
          <button
            type="button"
            className="chevron-status"
            onClick={dropdownStatus.toggleDropdown}
          >
            <img src="../img/chevron.png" alt="" />
          </button>

          <button
            type="submit"
            className="save-status-button"
            disabled={
              !selectedStatus?.code || selectedStatus.code === currentStatus
            }
          >
            <img src="../img/check.png" alt="" />
          </button>
        </div>
        {dropdownStatus.isOpen && (
          <div className="choose-status">
            <ul>
              {dropdownStatus.items.map((item) => {
                const option = options.find((opt) => opt.value === item);
                return (
                  <li
                    key={option?.code || item}
                    onClick={() => dropdownStatus.handleItemSelect(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
}
 */}
