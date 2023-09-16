import { useState } from 'react';
import axios from 'axios';

export const useRequest = (props: {
  url: string;
  method: string;
  body: { email?: string | undefined; password?: string | undefined };
  onSuccess?: any;
}) => {
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
      });

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors };
};
