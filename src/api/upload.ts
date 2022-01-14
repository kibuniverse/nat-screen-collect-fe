import axios from 'axios';

export const uploadNatImage = async (props: FormData) =>
  axios
    .post('http://localhost:3000/api/upload', props, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    // eslint-disable-next-line promise/prefer-await-to-then
    .then(res => res.data);
