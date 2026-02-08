import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';
import Header from './components/layout/Header';
import DefaultLayout from './components/layout/DefaultLayout';

function App() {
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const parsed = JSON.parse(auth);
      useAuthStore.setState({
        ...parsed,
        isLogin: true,
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <DefaultLayout />
    </BrowserRouter>
  );
}

export default App;
