import {describe} from 'vitest';
import {createMemoryHistory, MemoryHistory} from 'history';
import App from './app.tsx';
import '@testing-library/jest-dom';
import {makeFakeStore} from '../../utils/mocks/mocks.ts';
import {withHistory, withStore} from '../../utils/mocks-components/mocks-component.tsx';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const.ts';
import {render, screen} from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const {withStoreComponent} = withStore(<App />, makeFakeStore());
    const withHistoryComponents = withHistory(withStoreComponent, mockHistory);
    const mainPageTestId = 'main-element';
    mockHistory.push(AppRoute.Main);

    render(withHistoryComponents);

    expect(screen.getByTestId(mainPageTestId)).toBeInTheDocument();
  });

  it('Should render "OfferExtended" when user navigates to "/offer"', () => {
    const fakeStore = makeFakeStore();
    const offerPageTestId = 'offer-element';
    const { withStoreComponent } = withStore(<App />, fakeStore);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    const fakeOfferId = fakeStore[NameSpace.Offer].data?.id;
    mockHistory.push(`/offer/${fakeOfferId}`);

    render(withHistoryComponent);

    expect(screen.getByTestId(offerPageTestId)).toBeInTheDocument();
  });

  it('Should render "Favorites" when user navigates to "/favorites" and is authorized', () => {
    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.Auth,
      },
    });
    const favoritesPageTestId = 'favorites-element';
    const { withStoreComponent } = withStore(<App />, fakeStoreWithAuthorizedStatus);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Favorites);

    render(withHistoryComponent);

    expect(screen.getByTestId(favoritesPageTestId)).toBeInTheDocument();
  });

  it('Should render "Login" when user navigates to "/favorites" and is not authorized', () => {
    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.NoAuth,
      },
    });
    const loginPageTestId = 'login-element';
    const { withStoreComponent } = withStore(<App />, fakeStoreWithAuthorizedStatus);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Favorites);

    render(withHistoryComponent);

    expect(screen.getByTestId(loginPageTestId)).toBeInTheDocument();
  });

  it('Should render "Login" when user navigates to "/login" and is not authorized', () => {
    const fakeStoreWithAuthorizedStatus = makeFakeStore({
      [NameSpace.Auth]: {
        ...makeFakeStore()[NameSpace.Auth],
        status: AuthorizationStatus.NoAuth,
      },
    });
    const loginPageTestId = 'login-element';
    const { withStoreComponent } = withStore(<App />, fakeStoreWithAuthorizedStatus);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push(AppRoute.Login);

    render(withHistoryComponent);

    expect(screen.getByTestId(loginPageTestId)).toBeInTheDocument();
  });

  it('Should render "NotFoundPage" when user navigates to route that does not exist', () => {
    const fakeStore = makeFakeStore();
    const notFoundPageTestId = 'not-found-element';
    const { withStoreComponent } = withStore(<App />, fakeStore);
    const withHistoryComponent = withHistory(withStoreComponent, mockHistory);
    mockHistory.push('/route that does not exist');

    render(withHistoryComponent);

    expect(screen.getByTestId(notFoundPageTestId)).toBeInTheDocument();
  });
});
