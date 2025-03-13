import useDropdown from '../../../../hooks/use-dropdown.tsx';
import './boards-agile-dropdown.scss';

function BADropdown(): JSX.Element {
  const dropdownSpint = useDropdown();
  const dropdownProject = useDropdown();

  return (
    <div className="dropdown">
      <div className="dropdown-container" ref={dropdownSpint.dropdownRef}>
        <button
          type="button"
          className="dropdown-button"
          onClick={dropdownSpint.toggleDropdown}
        >
          Спринт 30
        </button>
        {dropdownSpint.isOpen && (
          <div className="dropdown-content">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
            </ul>
          </div>
        )}
      </div>

      <div className="dropdown-container" ref={dropdownProject.dropdownRef}>
        <button
          type="button"
          className="dropdown-button"
          onClick={dropdownProject.toggleDropdown}
        >
          Спринт 30
        </button>
        {dropdownProject.isOpen && (
          <div className="dropdown-content">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BADropdown;
