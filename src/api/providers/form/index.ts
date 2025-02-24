import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { FormData } from '../../../types/form';

const useformProvider = () => {

  const sendForm = async (params: FormData) => {
    const request = axios({
      method: 'post',
      url: 'http://localhost:3000/form',
      params,
    });
    return trackPromise(request);
  };

  return {
    sendForm,
  };
};

export default useformProvider;

