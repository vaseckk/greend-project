import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {store} from './store';
import {Provider} from 'react-redux';
import {checkAuthAction} from './store/api-actions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthAction());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
