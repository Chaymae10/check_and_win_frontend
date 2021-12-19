import { RedirectUrl, Router } from "../Router/Router.js";
import {removeSessionObject} from "../../utils/session.js"
import Navbar from "../Navbar/Navbar.js";

const LogoutPage = () => {
  removeSessionObject("user");
  Navbar();
  RedirectUrl("/LoginRegisterPage"); 
  Router();
};


export default LogoutPage;