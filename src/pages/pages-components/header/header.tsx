import '../header/header.scss';

function Header(): JSX.Element {
  {/*const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.breadcrumbs);*/}

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

        <nav className="breadcrumbs-plug">
          <span className="breadcrumbs-item">
            <a href="" className="breadcrumbs-link">
              <p>
                Доски Agile
              </p>
            </a>
            <img src="/img/indicator.png" alt="изображение индикатора"/>
          </span>
        </nav>

        <article className="header-button-container">
          <button className="notifications-button">
            <img src="/img/notifications.png"/>
          </button>

          <button className="profile-button">
            <img src="/img/profile.png"/>
          </button>
        </article>
      </div>
    </header>
  );
}

export default Header;
