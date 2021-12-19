import { RedirectUrl } from "./../Router/Router";
import { setSessionObject } from "../../utils/session";
import logo from "../../img/logoWebsite.png";
import Navbar from "../Navbar/Navbar";

const LoginRegisterPage = () => {
  // change the background color and put it in yellow when you arrive on the loginRegisterPage
  const body = document.querySelector("body");
  const page = document.getElementById("myPage");
  body.style.backgroundColor = "white";
  page.style.backgroundColor = "white";

  page.innerHTML = "";
  let content = `<img id=logo class="mx-auto d-block img-fluide mb-5 mt-5" src="${logo}"><div class="container" id="container">
	<div class="form-container sign-up-container">
		<form id="registerForm">
			<h1>Créer votre compte</h1>
			<input type="text" id="usernameRegister" placeholder="Nom d'utilisateur" required="required"/>
			<input type="password" id="passwordRegister" placeholder="Mot de passe " required="required"/>
			<button>s'inscrire</button>
            <div id="alertRegister"></div>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form id="loginForm">
			<h1>Se connecter</h1>
			<input type="text" id="usernameLogin" placeholder="Nom d'utilisateur" required="required"/>
			<input type="password" id="passwordLogin" placeholder="Mot de passe" required="required"/>
			<button>se connecter</button>
            <div id="alertLogin"></div>
		</form>
	</div>
	<div class="overlay-container">
	    <div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Bonjour ! </h1>
				<p>Si vous avez un compte Veuillez entrer vos données et commencer a jouer</p>
				<button class="ghost" id="signIn">Se connecter</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Bonjour!</h1>
				<p>Veuillez entrer votre données et créer votre compte pour jouer</p>
				<button class="ghost" id="signUp">S'inscrire</button>
			</div>
		</div>
	</div>
</div>`;

  page.innerHTML = content;
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  loginForm.addEventListener("submit", onSubmitLogin);
  registerForm.addEventListener("submit", onSubmitRegister);

  async function onSubmitLogin(e) {
    e.preventDefault();
    const userLogin = document.getElementById("usernameLogin").value;
    const pswLogin = document.getElementById("passwordLogin").value;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          username: userLogin,
          password: pswLogin,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("/api/auths/login", options);
      if (!response.ok) {
        showErrorLogin();
      }
      const userData = await response.json();
      if (!userData) {
        showErrorLogin();
      }
      setSessionObject("user", userData);
      Navbar();
      RedirectUrl("/");
    } catch (error) {
      console.error("login::error", error);
    }
  }
  async function onSubmitRegister(e) {
    e.preventDefault();

    const usernameRegister = document.getElementById("usernameRegister").value;
    const passwordRegister = document.getElementById("passwordRegister").value;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          username: usernameRegister,
          password: passwordRegister,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch("/api/auths/register", options);
      if (!response.ok) {
        showErrorRegister();
      }
      const userData = await response.json();
      console.log(userData);
      if (!userData) {
        showErrorRegister();
      }
      setSessionObject("user", userData);
      Navbar();
      RedirectUrl("/");
    } catch (error) {
      console.error("RegisterForm :: error", error);
    }
  }
};

function showErrorLogin() {
  console.log("alert");
  const alertDiv = document.getElementById("alertLogin");
  alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Votre nom d'utilisateur/mot de passe est incorrect
                            </div>`;
  throw new Error("fetch error");
}
function showErrorRegister() {
  console.log("alert");
  const alertDiv = document.getElementById("alertRegister");
  alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Ce nom d'utilisateur existe déjà
                            </div>`;
  throw new Error("fetch error");
}
export default LoginRegisterPage;
