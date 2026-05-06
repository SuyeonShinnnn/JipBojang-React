import { create } from 'zustand';
import axiosInstance from '../apis/axiosInstance';
import type { AxiosError } from 'axios';

export interface User {
  id: string;
  userId: string;
  email: string;
  nickname: string;
  username: string;
  profile_image: string;
  roles: string[];
  provider: 'LOCAL' | 'KAKAO' | '';
  kakaoId: string;
  createdAt?: string;
  isagent: number | boolean;
}

export interface LoginPayload {
  id: string;
  password: string;
}

export interface KakaoLoginPayload {
  accessToken: string;
  refreshToken: string;
  user: any;
}

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
  isLogin: boolean;

  login: (payload: LoginPayload) => Promise<void>;
  kakaoLogin: (payload: KakaoLoginPayload) => void;
  logout: () => void;
  verifyAuth: () => Promise<void>;
  updateUser: (user: Partial<User> & { is_agent?: boolean }) => void;
  getToken: () => string;
}

const initUser: User = {
  id: '',
  userId: '',
  email: '',
  nickname: '',
  username: '',
  profile_image: '',
  roles: [],
  provider: '',
  kakaoId: '',
  createdAt: '',
  isagent: 0,
};

const initState = {
  accessToken: '',
  refreshToken: '',
  user: initUser,
  isLogin: false,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...initState,

  // 일반 로그인
  login: async ({ id, password }) => {
    try {
      const { data } = await axiosInstance.post('/users/login', {
        id,
        password,
      });

      const user: User = {
        id: data.user.id,
        userId: data.user.userId,
        email: data.user.email,
        username: data.user.username,
        nickname: data.user.nickname,
        profile_image: data.user.profile_image,
        roles: data.user.roles || [],
        provider: 'LOCAL',
        kakaoId: data.user.kakaoId || '',
        isagent: data.user.is_agent ? 1 : 0,
        createdAt: data.user.createdAt,
      };

      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user,
        isLogin: true,
      });

      localStorage.setItem(
        'auth',
        JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user,
        }),
      );
    } catch (err) {
      const error = err as AxiosError<any>;
      throw new Error(
        error.response?.data?.message || '로그인에 실패했습니다.',
      );
    }
  },

  //  카카오 로그인
  kakaoLogin: ({ accessToken, refreshToken, user }) => {
    const mappedUser: User = {
      id: user.id || '',
      userId: user.userId,
      email: user.email,
      username: user.username,
      nickname: user.nickname,
      profile_image: user.profile_image,
      roles: user.roles || [],
      provider: 'KAKAO',
      kakaoId: user.kakaoId || '',
      isagent: user.is_agent ? 1 : 0,
      createdAt: user.createdAt,
    };

    set({
      accessToken,
      refreshToken,
      user: mappedUser,
      isLogin: true,
    });

    localStorage.setItem(
      'auth',
      JSON.stringify({ accessToken, refreshToken, user: mappedUser }),
    );
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('auth');
    set({ ...initState });
  },

  verifyAuth: async () => {
    try {
      await axiosInstance.get('/api/users/me');
    } catch {
      get().logout();
    }
  },

  updateUser: (newUser) => {
    const current = get().user;

    const updated = {
      ...current,
      ...newUser,
      isagent:
        newUser.is_agent !== undefined
          ? newUser.is_agent
            ? 1
            : 0
          : current.isagent,
    };

    set({ user: updated });

    localStorage.setItem(
      'auth',
      JSON.stringify({
        accessToken: get().accessToken,
        refreshToken: get().refreshToken,
        user: updated,
      }),
    );
  },

  getToken: () => get().accessToken,
}));
