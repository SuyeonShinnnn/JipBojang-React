import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth';

function AuthBootstrap() {
  const setState = useAuthStore.setState;

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) return;

    const parsed = JSON.parse(auth);

    setState({
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      user: parsed.user,
      isLogin: true,
    });
  }, []);

  return null;
}

export default AuthBootstrap;
