import { HelmetProvider } from 'react-helmet-async';
import ExampleSidebar from '../../pages/pages-components/example-sidebar/example-sidebar.tsx';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ExampleSidebar />
    </HelmetProvider>
  );
}

export default App;
