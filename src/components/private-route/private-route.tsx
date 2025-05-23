import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthStatus} from '../../store/auth-slice/auth-selector.ts';
import {useEffect, useState} from 'react';
import {getAccessToken} from '../../services/token.ts';
import {checkAuthAction} from '../../store/api-actions.ts';
import {LoadingScreen} from '../../pages/pages-components/loading-screen/loading-screen.tsx';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // Проверяем только если есть токен
        if (getAccessToken()) {
          await dispatch(checkAuthAction()).unwrap();
        }
      } catch {
        // Ошибка уже обработана в checkAuthAction
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  return authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} replace />;
}

export default PrivateRoute;
