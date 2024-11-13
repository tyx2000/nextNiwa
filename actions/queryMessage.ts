'use server';

import fetcher from '@/request/fetcher';

const queryMessage = async () => {
  const res = await fetcher('http://localhost:8080', { method: 'GET' });
  console.log(res);
};

export default queryMessage;
