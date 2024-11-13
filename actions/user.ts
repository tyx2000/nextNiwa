'use server';

import fetcher from '@/request/fetcher';
import api from '@/request/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  const uid = formData.get('uid');
  const { data, error } = await fetcher(api.login + `?uid=${uid}`, {
    method: 'GET',
  });
  if (data && !error) {
    const cookie = await cookies();
    cookie.set({
      name: 'temp_token',
      value: uid as string,
      httpOnly: true,
      path: '/',
    });
    redirect('/search');
  }
};
