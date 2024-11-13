import { cookies } from 'next/headers';

interface FetchConfig extends RequestInit {
  timeout?: number;
  abortSignal?: boolean;
}

type FetchResult<T> = {
  data: T | null;
  error: Error | null;
};

const fetcher = async <T>(
  url: string,
  config: FetchConfig,
): Promise<FetchResult<T>> => {
  const { timeout = 3000, abortSignal = false, ...fetchConfig } = config;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const cookieStore = await cookies();
  const token = cookieStore.get('temp-token');
  console.log('==========', token);

  let result: T | null = null,
    error: Error | null = null;

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      signal: abortSignal ? controller.signal : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let result: T;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = (await response.blob()) as unknown as T;
    }
    return { data: result, error };
  } catch (err) {
    if (err instanceof Error) {
      error = err;
    } else {
      error = new Error('an unexpected error occurred.');
    }
    return { data: result, error };
  } finally {
    clearTimeout(id);
  }
};

export default fetcher;
