import useDropdown from '../../../hooks/use-dropdown.tsx';
import './seach-for.scss';

function SearchFor():JSX.Element {
  const dropdownSearch = useDropdown();

  return (
    <section className="search">
      <div className="search-button" ref={dropdownSearch.dropdownRef}>
        <div className="search-filters" onClick={dropdownSearch.toggleDropdown}>
          Поиск по
          <img src="../img/chevron-white.png" alt=""
            style={{transform: dropdownSearch.isOpen ? 'rotate(90deg)' : 'none'}}
          />
        </div>
        <div className="search__input-wrapper">
          <input
            className="search__input"
            type="text"
            name="password"
            placeholder="Введите текст поиска..."
            data-testid="password-input"
            pattern='^.*(?=.*[a-zа-яё])(?=.*\d).*$'
            title='Ничего не найдено'
            required
          />
        </div>
        {dropdownSearch.isOpen && (
          <div className="search-content">
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}

export default SearchFor;
