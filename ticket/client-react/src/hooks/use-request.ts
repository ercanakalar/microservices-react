import { useState } from 'react';
import axios from 'axios';

import { DoRequestInterface } from './interfaces/do-request-interface';

export const useRequest = (props: DoRequestInterface) => {
  const { url, method, body, onSuccess } = props;

  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors([]);

      const response = await axios(url, {
        method,
        data: {
          email: body?.email,
          password: body?.password,
        },
        withCredentials: true,
        headers: {
          'content-Type': 'application/json',
          Accept: '/',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
      });

      if (onSuccess) onSuccess(response.data);

      return response.data;
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};
