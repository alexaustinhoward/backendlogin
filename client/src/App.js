import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import Axios from "axios";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import LandingPage from './Pages/LandingPage/Landing.Page';
import RegisterLoginPage from './Pages/Register-LoginPage/Register-Login.Page';
import {BrowserRouter, Route,Redirect,Link} from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
 import UserContext from "./Context/UserContext";
 export default function App() {

  const[userData,setUserData]= useState({
    token:undefined,
    user:undefined,
  })
useEffect(()=>{
const checkLoggedin= async()=>{
  let token= localStorage.getItem("auth-token");
  if (token===null){
    localStorage.setItem("auth-token","");
    token="";
  }
  const tokenRes=await Axios.post(
    "http://localhost:8081/users/IsTokenValid",
    null,
    { headers: { "x-auth-token": token } }
  );
  if (tokenRes.data){
    const userRes= await Axios.get("http://localhost:8081/users/",
    {headers:{"x-auth-token":token},})
    setUserData({
      token,
      user:userRes.data,
    })
  }
}
checkLoggedin();
},[]);
const logout = () => {
  setUserData({
    token: undefined,
    user: undefined,
  });
  localStorage.setItem("auth-token", "");
};
  return (
    <BrowserRouter>
    <UserContext.Provider value={{userData,setUserData}}>
    <Menu theme="dark" selectedKeys='navbar' mode="horizontal">
             <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                                            Home
                </Link> 
                </Menu.Item>
                {userData.user ? (<Menu.Item key="logout" >
                     <div onClick={logout} >
                                            Logout
                     </div>
                </Menu.Item>
                
                ):(<>
                <Menu.Item key="register" >
                     <Link to='/login' style={{ textDecoration: 'none' }}>
                                            Register
                     </Link>
                </Menu.Item>
                <Menu.Item key="login" >
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                                            Login
                     </Link>
                </Menu.Item>
                </>)}
             </Menu>

    <div className="App">
    <Route exact path='/' component={LandingPage} />
  <Route exact path='/login' component={RegisterLoginPage} />

  </div>
  </UserContext.Provider>
    </BrowserRouter>
  );
}


