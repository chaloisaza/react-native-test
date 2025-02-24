
import { useState, useCallback } from 'react';
import useActions from '../api/actions';
import { ChuckNorrisJoke } from '../types/api';

const useHomeController = () => {

  // actions
  const { useHomeActions } = useActions();
  const { actGetJoke } = useHomeActions();

  // states
  const [joke, setJoke] = useState<string>('Get a new joke by clicking the button below.');
  const [error, setError] = useState<string | null>(null);

  // functions
  const fetchJoke = useCallback(async (): Promise<void> => {
    const onSuccess = (data: ChuckNorrisJoke) => setJoke(data.value);

    const onError = (err: any) => {
      setError('Failed to fetch joke. Please try again.');
      console.error('Error fetching joke:', err);
    };

    await actGetJoke(onSuccess, onError);
  }, [actGetJoke]);

  return {
    fetchJoke,
    error,
    joke,
  };
};

export default useHomeController;
