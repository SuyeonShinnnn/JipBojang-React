import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';
import Header from './components/layout/Header';
import DefaultLayout from './components/layout/DefaultLayout';
import { useNotificationStore } from './stores/notification';
import { connectNotificationSSE } from './apis/notificationSSE';

function App() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );
  const userId = useAuthStore((state) => state.user?.userId);

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

  useEffect(() => {
    if (!userId) return;
    const sse = connectNotificationSSE(userId, (data) =>
      addNotification(data.message),
    );

    return () => {
      sse.close();
    };
  }, [userId]);

  return (
    <BrowserRouter>
      <Header />
      <DefaultLayout />
    </BrowserRouter>
  );
}

export default App;
