import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header'

import { FullPost, Login, Home, Registration ,AddPost} from './pages/index'
function App() {
  return (

    <>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </div>
    </>
  );
}

export default App
