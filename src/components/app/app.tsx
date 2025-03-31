import { HelmetProvider } from 'react-helmet-async';
import Task from '../../pages/different-components/task/task.tsx';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Task/>
    </HelmetProvider>
  );
}

export default App;
