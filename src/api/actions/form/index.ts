import useProviders from '../../providers';
import { FormData } from '../../../types/form';

const useFormActions = () => {
  const { useFormProvider } = useProviders();
  const { sendForm } = useFormProvider();

  const actSendForm = async (
    params: FormData,
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void
  ) => {
    try {
      const response = await sendForm(params);

      if (response.status === 200) {
        onSuccess && onSuccess(response.data);
      }
    } catch (e: any) {
      onError && onError(e);
    }
  };

  return {
    actSendForm,
  };
};

export default useFormActions;

