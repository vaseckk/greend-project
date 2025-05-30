import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {useAppDispatch} from '../../hooks';
import {useEffect, useState} from 'react';
import {getAccessToken} from '../../services/token.ts';
import {checkAuthAction} from '../../store/api-actions.ts';
import {LoadingScreen} from '../../pages/pages-components/loading-screen/loading-screen.tsx';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element{
  const {children, authorizationStatus} = props;

  const dispatch = useAppDispatch();
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

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
