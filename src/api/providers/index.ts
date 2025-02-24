import useHomeProvider from './home';
import useFormProvider from './form';

const useProviders = () => {
  return {
    useFormProvider,
    useHomeProvider,
  };
};

export default useProviders;
