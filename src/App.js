import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PostList from './PostList';
import PostRetrieve from './PostRetrieve';
import PostEdit from './PostEdit';
import Page404 from './Page404';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className='body'>
        <Routes>
          <Route path="/" exact element={<Navigate to='posts'/>}/>
          <Route path="/posts" element={<PostList/>}/>
          <Route path="/posts/:id" element={<PostRetrieve/>}/>
          <Route path="/posts/:id/edit" element={<PostEdit/>}/>
          <Route path="/posts/new" element={<PostEdit/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </div>
    </Router>
  );
}
