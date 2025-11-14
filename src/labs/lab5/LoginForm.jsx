import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Форма авторизации: валидация через react-hook-form и вход через AuthContext
export default function LoginForm() {
  const { login } = useContext(AuthContext);

  // Инициализация формы и базовой валидации
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur'
  });

  // Обработчик submit: ищем пользователя и валидируем пароль
  const onSubmit = useCallback(async (values) => {
    await new Promise(r => setTimeout(r, 300));
    try {
      const raw = localStorage.getItem('lab5_users'); // читаем список пользователей
      const users = raw ? JSON.parse(raw) : [];
      const found = Array.isArray(users) ? users.find(u => u.email === values.email) : null; // ищем по email
      if (!found) {
        setError('email', { type: 'manual', message: 'Пользователь не найден' }); // подсветка ошибки email
        return;
      }
      if (found.password !== values.password) {
        setError('password', { type: 'manual', message: 'Неверный пароль' }); // подсветка ошибки пароля
        return;
      }
      login(values.email); // успешный вход
    } catch {
      setError('email', { type: 'manual', message: 'Ошибка входа. Повторите попытку' }); 
    }
  }, [login, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360, margin: '0 auto', display: 'grid', gap: 12 }}>
      <h3 style={{ margin: 0 }}>Авторизация</h3>

      <label>
        <div>Email</div>
        <input
          type="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'Введите email',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' }
          })}
        />
        {errors.email && <div style={{ color: 'tomato', fontSize: 12 }}>{errors.email.message}</div>}
      </label>

      <label>
        <div>Пароль</div>
        <input
          type="password"
          placeholder="•••••••"
          {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' }
          })}
        />
        {errors.password && <div style={{ color: 'tomato', fontSize: 12 }}>{errors.password.message}</div>}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Входим...' : 'Войти'}
      </button>
    </form>
  );
}
