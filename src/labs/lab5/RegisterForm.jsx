import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

// Форма регистрации: валидация через react-hook-form и callback onRegistered
export default function RegisterForm({ onRegistered }) {
  // Инициализация формы: поля и базовая валидация
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setError, reset } = useForm({
    defaultValues: { email: '', password: '', confirm: '' },
    mode: 'onBlur'
  });

  const password = watch('password'); // значение пароля для проверки подтверждения

  const onSubmit = useCallback(async (values) => {
    await new Promise(r => setTimeout(r, 300));
    try {
      const raw = localStorage.getItem('lab5_users'); // читаем текущих пользователей
      const users = raw ? JSON.parse(raw) : [];
      const exists = Array.isArray(users) && users.some(u => u.email === values.email); // проверка дубликата email
      if (exists) {
        setError('email', { type: 'manual', message: 'Этот email уже зарегистрирован' }); // подсветка ошибки
        return;
      }
      const next = Array.isArray(users) ? users : [];
      next.push({ email: values.email, password: values.password }); // добавляем нового пользователя
      localStorage.setItem('lab5_users', JSON.stringify(next)); // сохраняем в localStorage
      reset(); // сбрасываем форму
      onRegistered?.({ email: values.email }); // сообщаем родителю для автологина
    } catch {
      setError('email', { type: 'manual', message: 'Ошибка сохранения. Повторите попытку' });
    }
  }, [onRegistered, setError, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360, margin: '0 auto', display: 'grid', gap: 12 }}>
      <h3 style={{ margin: 0 }}>Регистрация</h3>

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

      <label>
        <div>Подтверждение пароля</div>
        <input
          type="password"
          placeholder="•••••••"
          {...register('confirm', {
            required: 'Подтвердите пароль',
            validate: (v) => v === password || 'Пароли не совпадают'
          })}
        />
        {errors.confirm && <div style={{ color: 'tomato', fontSize: 12 }}>{errors.confirm.message}</div>}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
