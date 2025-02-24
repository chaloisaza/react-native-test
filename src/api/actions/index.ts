import useFormActions from './form';
import useHomeActions from './home';

const useActions = () => {
  return {
    useHomeActions,
    useFormActions,
  };
};

export default useActions;
