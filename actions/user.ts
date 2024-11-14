'use server';

import fetcher from '@/request/fetcher';
import api from '@/request/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

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
      // httpOnly: true,
      // expires: 3600,
    });
    revalidatePath('/');
  }
};

export const chat = async (uid: string) => {
  const res = await fetcher(api.chat + `?uid=${uid}`, { method: 'GET' });
  return res;
};
