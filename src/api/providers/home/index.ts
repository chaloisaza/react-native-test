import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useHomeProvider = () => {

  const getJoke = async () => {
    const request = axios({
      method: 'get',
      url: 'https://api.chucknorris.io/jokes/random',
    });
    return trackPromise(request);
  };

  return {
    getJoke,
  };
};

export default useHomeProvider;

