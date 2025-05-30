import '../header/header.scss';
import useDropdown from '../../../hooks/use-dropdown.tsx';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getNotificationsSelector} from '../../../store/notifications-slice/notifications-selector.ts';
import {formatDate} from '../../../const.ts';
import {useEffect} from 'react';
import {getNotifications} from '../../../store/api-actions.ts';

function Header(): JSX.Element {
  {/*const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.breadcrumbs);*/}
  const dropdownNotifications = useDropdown();
  const dropdownProfile = useDropdown();
  const notifications = useAppSelector(getNotificationsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <header className="header-container">
      <div className="header-parameters">
        {/*<nav className="breadcrumbs">
          {breadcrumbs.map((item, index) => (
            <span key={item.id} className="breadcrumbs__item">
              <Link to={item.link} className="breadcrumbs__link">
                {item.name}
              </Link>
              {index < breadcrumbs.length - 1 && <span className="breadcrumbs__separator">-</span>}
            </span>
          ))}
        </nav>*/}

        <nav className="breadcrumbs-plug" ref={dropdownNotifications.dropdownRef}>
          <span className="breadcrumbs-item">
            <a href="" className="breadcrumbs-link">
              <p>
                Доски Agile
              </p>
            </a>
            <img src="/img/indicator.png" alt="изображение индикатора"/>
          </span>
        </nav>

        <article className="header-button-container" ref={dropdownProfile.dropdownRef}>
          <button
            className='notifications-button'
            onClick={dropdownNotifications.toggleDropdown}
          >
            <img src="/img/notifications.png" alt="Уведомления" />
          </button>



          <button className="profile-button" onClick={dropdownProfile.toggleDropdown}>
            <img src="/img/account_circle_5.png" alt=''/>
          </button>
        </article>

      </div>
      {dropdownNotifications.isOpen && (
        <div className='dropdown_notifications'>
          {notifications.length === 0 ? (
            <div className="empty-notifications">Нет уведомлений</div>
          ) : (
            <div className="empty-notifications">
              <div className="empty-notifications_scrool">
                {notifications.map((notification) => (
                  <div
                    key={`${notification.creationDateTime}-${notification.text}`}
                    className='notifications_dropdown_container'
                  >
                    <div className="notifications__date">
                      {formatDate(notification.creationDateTime)}
                    </div>
                    <div className="notifications__text">
                      {notification.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {dropdownProfile.isOpen && (
        <div className='dropdown_notifications'>
          {notifications.length === 0 ? (
            <div className="empty-notifications">Нет уведомлений</div>
          ) : (
            <div className="empty-notifications">
              <div className="empty-notifications_scrool">
                {notifications.map((notification) => (
                  <div
                    key={`${notification.creationDateTime}-${notification.text}`}
                    className='notifications_dropdown_container'
                  >
                    <div className="notifications__date">
                      {formatDate(notification.creationDateTime)}
                    </div>
                    <div className="notifications__text">
                      {notification.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
