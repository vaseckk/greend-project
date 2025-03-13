import '../sidebar/sidebar.scss';
import {useState} from 'react';
import {navItems} from '../../../const.ts';

function Sidebar(): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={isHovered ? 'sidebar-active' : 'sidebar-noActive'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={isHovered ? 'sidebar-header' : 'sidebar-header-noActive'}>
        <h3>gd</h3>
      </div>
      <nav className={isHovered ? 'sidebar-body' : 'sidebar-body-noActive'}>
        <ul className={isHovered ? 'sidebar-wrapper' : 'sidebar-wrapper-noActive'}>
          {navItems.map((item) => (
            <li key={item.text} className={isHovered ? 'sidebar__item' : 'sidebar__item-noActive'}>
              <div className="sidebar__item_border">
                <img src={item.icon} alt={item.text}/>
                <a className={isHovered ? 'sidebar__link' : 'sidebar__link-noActive'}>{item.text}</a>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className={isHovered ? 'sidebar-footer' : 'sidebar-footer-noActive'}>
        <div className={isHovered ? 'sidebar-wrapper-footer' : 'sidebar-wrapper-footer-noActive'}>
          <button className={isHovered ? 'sidebar-button_setting' : 'sidebar-button_setting-noActive'}>
            <span className={isHovered ? 'sidebar-button-container_setting' : 'sidebar-button-container_setting-noActive'}>
              {isHovered && <p>Настроить</p>}
              <img src="/img/linear_scale.png" alt="" />
            </span>
          </button>
          <button className={isHovered ? 'sidebar-button_new_task' : 'sidebar-button_new_task-noActive'}>
            <span className={isHovered ? 'sidebar-button-container_new_task' : 'sidebar-button-container_new_task-noActive'}>
              {isHovered && <p>Новая задача</p>}
              <img src="/img/add_ad.png" alt="" />
            </span>
          </button>
          <button className={isHovered ? 'sidebar-button_out' : 'sidebar-button_out-noActive'}>
            <span className={isHovered ? 'sidebar-button-container_out' : 'sidebar-button-container_out-noActive'}>
              {isHovered && <p>Выход</p>}
              <img src="/img/input.png" alt="" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
