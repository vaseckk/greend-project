import './login.scss';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {FormEvent, useState} from 'react';
import {loginAction, sendCodeAction, verifyCodeAction} from '../../../store/api-actions.ts';
import {toast} from 'react-toastify';
import {AppRoute, AuthorizationStatus, CodeStatus} from '../../../const.ts';
import {useNavigate} from 'react-router-dom';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus, codeStatus} = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [telegramId, setTelegramId] = useState('');

  const isLoading =
    authStatus === AuthorizationStatus.Loading ||
    codeStatus === CodeStatus.Sending ||
    codeStatus === CodeStatus.Verifying;

  const handleSendCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(sendCodeAction({
      username,
      telegramId
    })).unwrap()
      .then(() => {
        toast.success('Код отправлен в Telegram');
      });
  };

  const handleVerifyCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(verifyCodeAction({
      username,
      code,
      telegramId
    })).unwrap()
      .then(() => {
        toast.success('Код подтвержден!');
      });
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginAction({ username, password }))
      .unwrap()
      .then(() => {
        toast.success('Авторизация успешна!');
        navigate(AppRoute.BoardsAgile);
      })
      .catch(() => {
        toast.error('Ошибка авторизации');
      });
  };

  // Форма подтверждения кода
  const verificationForm = (
    <div className="login-page">
      <Helmet>
        <title>Greend: Подтверждение кода</title>
      </Helmet>
      <header className="login-header">
        <h1 className="login-header-title">GreenD</h1>
        <span className="login-header-information">Подтвердите код из Telegram</span>
      </header>
      <main className="page__main--login" data-testid="login-element">
        <div className="page__login-container">
          <section className="login">
            <form className="login__form" onSubmit={handleVerifyCodeSubmit}>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Логин</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="username-input"
                />
              </div>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Telegram ID</label>
                <input
                  className="login__input"
                  type="text"
                  name="telegramId"
                  placeholder="Ваш Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="telegram-input"
                />
              </div>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Код подтверждения</label>
                <input
                  className="login__input"
                  type="text"
                  name="code"
                  placeholder="Введите 5-значный код"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={5}
                  pattern="\d{5}"
                  title="Введите 5 цифр"
                  disabled={isLoading}
                  data-testid="code-input"
                />
              </div>
              <button
                className="form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Проверка...' : 'Подтвердить'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );

  // Форма входа
  const loginForm = (
    <div className="login-page">
      <Helmet>
        <title>Greend: Вход в систему</title>
      </Helmet>
      <header className="login-header">
        <h1 className="login-header-title">GreenD</h1>
        <span className="login-header-information">Вход в систему</span>
      </header>
      <main className="page__main--login" data-testid="login-element">
        <div className="page__login-container">
          <section className="login">
            <form className="login__form" onSubmit={handleLoginSubmit}>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Логин</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="username-input"
                />
              </div>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Пароль</label>
                <input
                  className="login__input"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="password-input"
                />
              </div>
              <button
                className="form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );

  // Форма отправки кода
  const sendCodeForm = (
    <div className="login-page">
      <Helmet>
        <title>Greend: Отправка кода</title>
      </Helmet>
      <header className="login-header">
        <h1 className="login-header-title">GreenD</h1>
        <span className="login-header-information">Отправка кода подтверждения</span>
      </header>
      <main className="page__main--login" data-testid="login-element">
        <div className="page__login-container">
          <section className="login">
            <form className="login__form" onSubmit={handleSendCodeSubmit}>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Логин</label>
                <input
                  className="login__input"
                  type="text"
                  name="username"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="username-input"
                />
              </div>
              <div className="login__input-wrapper">
                <label className="visually-hidden">Telegram ID</label>
                <input
                  className="login__input"
                  type="text"
                  name="telegramId"
                  placeholder="Ваш Telegram ID"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="telegram-input"
                />
              </div>
              <button
                className="form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Отправка...' : 'Отправить код'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );

  // Условия отображения форм
  const showVerificationForm =
    codeStatus === CodeStatus.Sent ||
    codeStatus === CodeStatus.Verifying ||
    codeStatus === CodeStatus.Verified;

  const showLoginForm = authStatus === AuthorizationStatus.Auth;
  const showSendCodeForm = !showVerificationForm && !showLoginForm;

  return (
    <>
      {showVerificationForm && verificationForm}
      {showLoginForm && loginForm}
      {showSendCodeForm && sendCodeForm}
    </>
  );
}

export default Login;
