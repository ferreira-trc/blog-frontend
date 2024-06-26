import logo from './logo.svg';
import './App.css';
import './css/post.css'
import './css/header.css'
import './css/login.css'
import './css/postForm.css'
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Header } from './components/header/Header';
import { Register } from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PostForm } from './components/post/PostForm';


function App() {
  return (
    <>

      <BrowserRouter>
        <Header/>

        <Routes>
          <Route element= {<Login/>} path='/login'/>
          <Route element= {<LandingPage/>} path='/allpost'/>
          <Route element= {<PostForm/>} path='/newpost'/>
          <Route/>
        </Routes>
      
      </BrowserRouter>
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Header/> 
      <LandingPage/> */}
    </>
  );
}

export default App;
