import Header from '../components/layout/Header';
import AuthBootstrap from './AuthBootstrap';
import SSEBootstrap from './SSEBootstrap';
import DefaultLayout from '../components/layout/DefaultLayout';

function AppShell() {
  return (
    <>
      <AuthBootstrap />
      <SSEBootstrap />
      <Header />
      <DefaultLayout />
    </>
  );
}

export default AppShell;
