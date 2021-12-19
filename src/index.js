// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom styles
import './stylesheets/main.css';

import Navbar from './Components/Navbar/Navbar'; 
import { Router } from './Components/Router/Router';
import { getSessionObject } from './utils/session';
import LoginRegisterPage from './Components/Pages/LoginRegisterPage';
    const user = getSessionObject("user");
    Navbar();
    Router(); 
    /*
    if(!user){
        
        LoginRegisterPage();   

    }else if(user){
        Navbar();
        Router(); 
    }
    */

 