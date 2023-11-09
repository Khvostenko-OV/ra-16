import { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import useFetch from './useFetch';

export default function PostEdit() {
  const { id } = useParams();
  const { state } = useLocation();
  const text = state? state.content : '';
  const [content, setContent] = useState(text);
  const { data, fetching, error, redir, request } = useFetch();
  const [redirect, setRedirect] = useState('');

  const savePost = () => { 
    if (content) { 
      request(id || '', id? 'PUT' : 'POST', {content: content}, '..'); 
    } 
  };

  useEffect(() => {
    if (id && !state) {
      request(id); 
    }
  }, [id, state]);

  useEffect(() => {
    if (data && 'post' in data) {
      setContent(data.post.content);
    }
  }, [data]);

  useEffect(() => { setRedirect(redir); }, [redir]);

  return (
    <div className="post-card">
      <h3>{id? 'Edit post' : 'Create new post'}</h3>
      {error && `${error}`}
      {redirect && <Navigate to={redirect} relative='path'/>}
      {fetching && 'Connecting...'}
      <textarea className='text' rows='3' value={content} onChange={evt => setContent(evt.target.value)}></textarea>
      <div className="link-btn" onClick={savePost}>{id? 'Save changes' : 'Publicate'}</div>
      <div className="close-btn" onClick={() => setRedirect(`..`)}>X</div>
    </div>
  )
}
