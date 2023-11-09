import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useFetch from './useFetch';

export default function PostList() {
  const { data, fetching, error, request } = useFetch();
  const [posts, setPosts] = useState([]);
  const [redirect, setRedirect] = useState('');

  const dateTime = (ms) => {
    const date = new Date(ms);
    return date.toLocaleString();
  }

  useEffect(() => { request(); }, []);

  useEffect(() => {
    if (data && data instanceof Array) {
      setPosts(data.reverse());
    }
  }, [data]);
     
  return (
    <div className='post-list'>
      {error && `${error}`}
      {redirect && <Navigate to={redirect}/>}
      {fetching && 'Loading posts...'}
      {!fetching && !error && 
        <div className='post-item'>
          <div className='link-btn' onClick={() => setRedirect('new')}>New post</div>
        </div>
      }
      {posts.map(post => 
        <div key={post.id} className='post-item' onClick={() => setRedirect(`${post.id}`)}>
          <pre>{post.content}</pre>
          <span className='date'>{dateTime(post.created)}</span>
        </div>
      )}
    </div>
  )
}
