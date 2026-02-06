import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import NotiPage from './pages/notification/NotiPage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';
import LoginPage from './pages/auth/LoginPage';

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
      <main>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/notify" element={<NotiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
