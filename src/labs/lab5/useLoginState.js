import { useContext, useMemo } from 'react';
import { AuthContext } from './AuthContext';

// возвращает булев статус авторизации на основе AuthContext
export default function useLoginState() {
  const { user } = useContext(AuthContext); // читаем текущего пользователя из контекста
  return useMemo(() => Boolean(user), [user]);
}
