import useProviders from '../../providers';

const useHomeActions = () => {
  const { useHomeProvider } = useProviders();
  const { getJoke } = useHomeProvider();

  const actGetJoke = async (
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void
  ) => {
    try {
      const response = await getJoke();

      if (response.status === 200) {
        onSuccess && onSuccess(response.data);
      }
    } catch (e: any) {
      onError && onError(e);
    }
  };

  return {
    actGetJoke,
  };
};

export default useHomeActions;

