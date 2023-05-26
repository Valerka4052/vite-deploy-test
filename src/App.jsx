import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'

import { FullPost, Login, Home, Registration ,AddPost} from './pages/index'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authMe } from './redux/slices/auth';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authMe())
  }, [dispatch]);

  return (

    <>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </div>
    </>
  );
}

export default App
