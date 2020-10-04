import { Menu } from 'antd';
import 'antd/dist/antd.css';
import './Register-Login.Style.scss';
import React,{ Component,useState,useContext} from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Tabs } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import Axios from "axios";
import UserContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";
export default function  RegisterLoginPage (){
    const history = useHistory();
      const [email,setEmail]=useState();
      const [username,setUsername]=useState();
      const [password,setPassword]=useState();
      const [passwordcheck,setPasswordCheck]=useState();
      const [firstname,setFirstname]=useState();
      const [lastname,setLastname]=useState();
      const { setUserData } = useContext(UserContext);
        const {TabPane}=Tabs;
        const layout = {
            labelCol: {
              span: 8,
            },
            wrapperCol: {
              span: 8,
            },
          };
          const tailLayout = {
            wrapperCol: {
              offset: 8,
              span: 12,
            },
          };



  const  registersumbit = async () =>{
    
        try{
            const newUser={email,password,passwordcheck,username,firstname,lastname}
            await Axios.post("http://localhost:8081/users/signup", newUser)
            history.push("/");
            const accountmail = await Axios.post("http://localhost:8081/users/sendcom/", {
        email,
        username,
      });
     
        } catch(err){
         console.log(err)
        }
    };
    const  loginsumbit = async () =>{
      
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
              "http://localhost:8081/users/login",
              loginUser
            );
            setUserData({
              token: loginRes.data.token,
              user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
          } catch (err) {
            console.log(err)
          }
    };
    
        



 return(
        <div className='RegisterLoginPage'>
         
         <div className='SRspace'>
             <Tabs theme="dark" defaultActiveKey="1">
                <TabPane tab="Login" key="1">
                     <Form
                         {...layout}
                         name="basic"
                         initialValues={{
                         remember: true,
                             }}
                             onFinish={loginsumbit} 
                        
                         >
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                          {
                            type: 'email',
                          },
                         {
                         required: true,
                          message: 'Please input your email!',
                         },
                          ]}
                         >
                 <Input onChange={(e)=> setEmail(e.target.value)}/>
                 </Form.Item>

                 <Form.Item
                     label="Password"
                      name="password"
                      rules={[
                      {
                     required: true,
                     message: 'Please input your password!',
                       },
                     ]}
                      >
                 <Input.Password  onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Item>
                
                 <Form.Item {...tailLayout}>
                 <Button type="primary" htmlType="submit">
                    Submit
                 </Button>
                </Form.Item>
                </Form> 
                </TabPane>
                 <TabPane tab="Register" key="2">
                     
                     <Form
                         {...layout}
                         name="basic"
                         initialValues={{
                         remember: true,
                             }}
                             onFinish={registersumbit} 
                         >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                         {
                         required: true,
                          message: 'Please input your username!',
                         },
                          ]}
                         >
                 <Input  onChange={(e)=> setUsername(e.target.value)} />
                 </Form.Item>
                 <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            type: 'email',
                          },
                         {
                         required: true,
                          message: 'Please input your email!',
                         },
                          ]}
                         >
                 <Input  onChange={(e)=> setEmail(e.target.value)} />
                 </Form.Item>
                 <Form.Item
                        label="First Name"
                        name="Firstrame"
                        rules={[
                         {
                         required: true,
                          message: 'Please input your  first name!',
                         },
                          ]}
                         >
                 <Input  onChange={(e)=> setFirstname(e.target.value)} />
                 </Form.Item>
                 <Form.Item
                        label="Last name"
                        name="Lastname"
                        rules={[
                         {
                         required: true,
                          message: 'Please input your  Last name!',
                         },
                          ]}
                         >
                 <Input  onChange={(e)=> setLastname(e.target.value)} />
                 </Form.Item>
                 <Form.Item
                     label="Password"
                      name="password"
                      rules={[
                        {
                          min:8,
                          message: 'password is  too short!'},
                      {
                     required: true,
                     message: 'Please input your password!',
                       },
                     ]}
                      >
                 <Input.Password  onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item
                     label="PasswordCheck"
                      name="passwordCheck"
                      rules={[
                        {
                          min:8,
                          message: 'password is  too short!'},
                      {
                     required: true,
                     message: 'Please retype your password!',
                       },
                     ]}
                      >
                 <Input.Password  onChange={(e)=> setPasswordCheck(e.target.value)} />
                </Form.Item>
                
                 <Form.Item {...tailLayout}>
                 <Button type="primary" htmlType="submit">
                    Submit
                 </Button>
                </Form.Item>
                </Form> 

                </TabPane>
            </Tabs>
         </div>
            
     </div>

);}

