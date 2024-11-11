import { useCallback, useState } from 'react';

interface FetchConfig extends RequestInit {
  timeout?: number;
  abortSignal?: boolean;
}

type FetchResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

const useFetch = <T>(url: string, config: FetchConfig = {}): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const { timeout = 3000, abortSignal = false, ...fetchConfig } = config;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      setLoading(true);
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

      setData(result);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('an unexpected error occurred.'));
      }
      setData(null);
    } finally {
      setLoading(false);
      clearTimeout(id);
    }
  }, [url, config]);

  return { data, error, loading };
};
