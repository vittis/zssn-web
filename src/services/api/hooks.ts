import { useState, useEffect, useCallback } from 'react';
import api from './index';

export type ApiResponse<T> = [{ data: T; isLoading: boolean; error: boolean }, () => Promise<any>];

/*
 *  Data fetch custom hook
 *  Inspired and improved from https://www.robinwieruch.de/react-hooks-fetch-data
 */
export function useApiRequest<T>(path: string, initialValue: T): ApiResponse<T> {
  const valueState = useState<T>(initialValue);
  const errorState = useState<boolean>(false);
  const loadingState = useState(false);

  const [value, setValue] = valueState;
  const [error, setError] = errorState;
  const [loading, setLoading] = loadingState;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(path);
      setValue(data);
      setError(false);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [path, setValue, setError, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [{ data: value, isLoading: loading, error: error }, fetchData];
}

export default useApiRequest;
