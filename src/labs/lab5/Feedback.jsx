import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// Блок обратной связи: форма отправки отзыва и список отзывов
export default function Feedback() {
  const [reviews, setReviews] = useState(() => {
    // Ленивое чтение из localStorage на первом рендере, чтобы избежать затирания в StrictMode
    try {
      const raw = localStorage.getItem('lab5_feedback_reviews');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: '', message: '' },
    mode: 'onBlur'
  });

  // Сохранение в localStorage при каждом изменении списка
  useEffect(() => {
    try {
      localStorage.setItem('lab5_feedback_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const onSubmit = useCallback(async (values) => {
    await new Promise(r => setTimeout(r, 200));
    setReviews((prev) => [{ id: Date.now(), ...values }, ...prev]);
    reset();
  }, [reset]);

  const list = useMemo(() => reviews, [reviews]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 12, maxWidth: 520, margin: '0 auto' }}>
        <h3 style={{ margin: 0 }}>Обратная связь</h3>
        <label>
          <div>Ваше имя</div>
          <input
            type="text"
            placeholder="Иван"
            {...register('name', {
              required: 'Введите имя',
              minLength: { value: 2, message: 'Минимум 2 символа' }
            })}
          />
          {errors.name && <div style={{ color: 'tomato', fontSize: 12 }}>{errors.name.message}</div>}
        </label>

        <label>
          <div>Сообщение</div>
          <textarea
            rows={4}
            placeholder="Ваш отзыв..."
            {...register('message', {
              required: 'Введите сообщение',
              minLength: { value: 5, message: 'Минимум 5 символов' }
            })}
          />
          {errors.message && <div style={{ color: 'tomato', fontSize: 12 }}>{errors.message.message}</div>}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправляем...' : 'Отправить отзыв'}
        </button>
      </form>

      <div style={{ maxWidth: 520, margin: '0 auto', width: '100%' }}>
        <h4 style={{ margin: '12px 0' }}>Список отзывов</h4>
        {list.length === 0 && <div>Пока нет отзывов</div>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {list.map(item => (
            <li key={item.id} style={{ border: '1px solid var(--card-border)', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{item.name}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{item.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
