import { RedirectUrl, Router } from "../Router/Router.js";
import {removeSessionObject} from "../../utils/session.js"
import Navbar from "../Navbar/Navbar.js";

const LogoutPage = () => {
  //delete user's data from the localStorage
  removeSessionObject("user");
  //Call the navbar and refirect to the loginRegisterPage 
  Navbar();
  RedirectUrl("/LoginRegisterPage"); 
  Router();
};


export default LogoutPage;