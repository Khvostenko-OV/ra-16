import { useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState(undefined);
  const [fetching, setFetching] = useState(false);
  const [redir, setRedirect] = useState('');
  const [error, setError] = useState('');

  const request = async (path='', method='GET', body={}, link='') => {
    setFetching(true);
    try {
      const opt = method === 'GET'? {} : { method: method };
      if (method === 'POST' || method === 'PUT') {
        opt.headers = { 'Content-Type': 'application/json' };
        opt.body = JSON.stringify(body);
      }
      const response = await fetch(process.env.REACT_APP_BACKEND + path, opt);
      if (!response.ok) { throw new Error(response.statusText); }
      if (response.status !== 204) {
        const json = await response.json();
        setData(json); 
      }
      setError('');
      setRedirect(link);
    } catch (e) { setError(e);
    } finally { setFetching(false); }
  };

  return {data, fetching, error, redir, request};
}
