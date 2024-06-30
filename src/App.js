import logo from './logo.svg';
import './App.css';
import './css/post.css'
import './css/comment.css'
import './css/header.css'
import './css/login.css'
import './css/register.css'
import './css/postForm.css'
import './css/myProfile.css'
import './css/home.css'
import './css/admin.css'
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Header } from './components/header/Header';
import { Register } from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PostForm } from './components/post/PostForm';
import { MyProfile } from './pages/MyProfile';
import { Home } from './pages/Home'
import { EditPost } from './components/post/EditPost';
import { Admin } from './pages/Admin';
import { Logout } from './pages/Logout';



function App() {
  return (
    <>
    
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route element= {<LandingPage/>} path='/'/>
          <Route element= {<Login/>} path='/login'/>
          <Route element= {<LandingPage/>} path='/allpost'/>
          <Route element= {<PostForm/>} path='/newpost'/>
          <Route element= {<MyProfile/>} path='/myprofile'/>
          <Route element= {<Home/>} path='/home'/>
          <Route element= {<EditPost/>} path='/editpost/:id'/>
          <Route element= {<Admin/>} path='/admin'/>
          <Route element= {<Register/>} path='/register'/>
          <Route element= {<Logout/>} path='/logout'/>
        </Routes>
      
      </BrowserRouter>      

    

    </>
  );
}

export default App;
