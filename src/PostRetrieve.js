import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useFetch from './useFetch';

export default function PostRetrieve() {
  const { id } = useParams();
  const { data, fetching, error, redir, request } = useFetch();
  const [redirect, setRedirect] = useState('');

  useEffect(() => { request(id); }, [id]);

  useEffect(() => { setRedirect(redir); }, [redir]);

  return (
    <div className="post-card">
      {error && `${error}`}
      {redirect && <Navigate to={redirect} relative='path' state={data.post}/>}
      {fetching && 'Loading post...'}
      <pre>{data && 'post' in data && `${data.post.content}`}</pre>
      <div className="link-btn" onClick={() => setRedirect('edit')}>Edit</div>
      <div className="delete-btn" onClick={() => request(id, 'DELETE', {}, '..')}>Delete</div>
      <div className="close-btn" onClick={() => setRedirect('..')}>X</div>
    </div>
  )
}
