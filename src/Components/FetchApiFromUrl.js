import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = "http://localhost:5000/user/";

function FetchApiFromUrl(url, body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...')
    setData(null);
    setError(null);
    axios.post(BASE_URL + url, body)
      .then((res) => {
        setLoading(false);
        console.log('res---------------', res)
        res.data.content && setData(res.data.content);
        res.content && setData(res.content);
      })
      .catch((err) => {
        setLoading(false)
        setError('An error occurred. Awkward..')
      })
  }, [url])

  return { data, loading, error }
};

export default FetchApiFromUrl;