import axios from 'axios';

export const uploadNatImage = async (props: FormData) =>
  axios.post('http://192.168.1.116:3000/api/upload', props, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
