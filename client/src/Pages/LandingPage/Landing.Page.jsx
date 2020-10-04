import { Menu } from 'antd';
import 'antd/dist/antd.css';
import './Landing.Style.scss';
import React,{ Component} from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import {Link} from 'react-router-dom';

class LandingPage extends Component{
    constructor(){
        super();
        this.state={
         
        };
    }
    componentDidMount(){

    }
    render() {
        return(
        <div className='LandingPage'>
           
             <div className='WelcomeMessage-1'>Connecting with People</div>
             <div className='WelcomeMessage-2'>made brilliant</div>
         </div>

);}
}
export default LandingPage;