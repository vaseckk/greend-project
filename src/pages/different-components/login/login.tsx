import './login.scss';
import {Helmet} from 'react-helmet-async';

function Login(): JSX.Element {
  return (
    <div className="login-page">
      <Helmet>
        <title>Greend: Вход</title>
      </Helmet>
      <header className="login-header">
        <h1 className="login-header-title">
          GreenD
        </h1>
        <span className="login-header-information">
          вход в корпоративный task-trecker
        </span>
      </header>

      <main className="page__main--login" data-testid='login-element'>
        <div className="page__login-container">
          <section className="login">
            <form className="login__form" action="#" method="post">
              <div className="login__input-wrapper">
                <label className="visually-hidden">Логин</label>
                <input
                  className="login__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="email-input"
                  required
                />
              </div>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Пароль</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password-input"
                  pattern='^.*(?=.*[a-zа-яё])(?=.*\d).*$'
                  title='Не правильно введён пароль, попробуйте снова'
                  required
                />
              </div>
              <button className="form__submit button" type="submit">
                Войти
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
