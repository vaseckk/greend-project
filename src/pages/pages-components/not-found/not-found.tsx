import './not-found.scss';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

function NotFound(): JSX.Element {
  return (
    <div className="not-found">
      <section className="not-found_container">
        <p>Страницы с данной адресной строкой не существует. <br/>
          Просмотрите правильность пути, или же перейдите на страницу входа по кнопке ниже
        </p>
        <Link to={AppRoute.Login}>
          <button>
            Перейти на страницу входа
          </button>
        </Link>
      </section>
    </div>
  );
}

export default NotFound;
