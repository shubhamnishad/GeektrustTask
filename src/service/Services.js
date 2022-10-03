import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getAll = async url => {
  let res = await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return res;
};

const post = async (url, body) => {
  console.log('BODY', body);
  let res = await axios
    .post(url, body, {
      headers: headers,
    })
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  console.log('RESPONSE', res);
  return res;
};

export {getAll, post};
