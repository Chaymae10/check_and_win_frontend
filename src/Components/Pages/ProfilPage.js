import { getSessionObject, setSessionObject } from "./../../utils/session";
import { RedirectUrl } from "../Router/Router";
import pouletto from "./../../img/pouletto.png";
import anime from "animejs";
const ProfilPage = async () => {
  const body = document.querySelector("body");
  const pageDiv = document.querySelector("#myPage");
  body.style.backgroundColor = "rgb(254, 193, 29)";
  pageDiv.style.backgroundColor = "rgb(254, 193, 29)";
  pageDiv.innerHTML = "";
  let txtHtmlForScore = " ";
  //get authentificated user data 
  const userData = getSessionObject("user");
  //get the user's max score 
  const userScore = await getMaxScore();
  let userName = userData.username;
  //Display user's score 
  let textHtmlForScore = () => {
    if (userScore.maxScore === 0) {
      txtHtmlForScore = `N'oublie pas de jouer pour avoir un score`;
    } else {
      txtHtmlForScore = `Bravo, ton meilleur score est : ${userScore.maxScore}`;
    }
    return txtHtmlForScore;
  };
  //the main content of the profil page
  let content = `
    <div class="container-profil "> 
    
   
        <div class="row">
            <img src="${pouletto}" class="col-4 pl-2">
            <div class="col mt-5 pt-5">
                 <p class="pProfilePage fs-2 helloProfile text-danger"> Coucourikou ${userName} </p>
                <div class="fs-3 pProfilePage">${textHtmlForScore()} </div>
             </div>
        </div>
        <p class="text-center fs-3 pProfilePage"> Ici tu peux modifier ton pseudo ou ton mot de passe</p>
        <div class="row">
        <div class="col text-center">
        <button id="userName" class="fs-6 pProfilePage" >Modifier le pseuso</button> 
        <div id="ChangeUserName" class="pProfilePage">
        </div>
        </div>
        <div class="col text-center ">
        <button class="fs-6 pProfilePage" id="password">Modifier le mot de passe</button>
        <div id="ChangePassword" class="pProfilePage">
        </div>        
        </div>
    </div>
    `;

  pageDiv.innerHTML = content;
  

  //welcome message
  let text = document.querySelector(".helloProfile");
  //separate every single letter of the messege  in a span tag to animate it later 
  text.innerHTML = text.innerText
    .split("")
    .map(function (char) {
      return `<span class="fs-2 text-danger pProfilePage ">${char}</span>`;
    })
    .join("");
  //Animejs to animate the  welcome message 
  anime.timeline({ loop: true }).add({
    targets: ".helloProfile",
    translateX: [60, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 2500,
    delay: function (el, i) {
      return 500 + 30 * i;
    },
  });
  //Change username
  const changeUserNameDiv = document.getElementById("ChangeUserName");
  //use the button in purpose to display the form only if the user clicks on it 
  const buttonChangeUserName = document.getElementById("userName");
  buttonChangeUserName.addEventListener("click", displayUpdateUsernameForm);
  function displayUpdateUsernameForm(e) {
    e.preventDefault();
    let changeUserNameForm = `
    <form id="changeUserNameForm">
        <input type="text" id="nUserName" required="required" placeHolder="Nouveau nom d'utilisateur">
        <input type="submit" id="submitUsername" value="Changer">
        <div id="alertUpdateUsername"></div>
    </form>
    `;
    changeUserNameDiv.innerHTML = changeUserNameForm;
    const updateUsernameForm = document.getElementById("changeUserNameForm");
    //Add an event listener to the form on submit
    updateUsernameForm.addEventListener("submit", ChangeUsername);
  }
  // on submit , a request is sent to our api to change the username
  async function ChangeUsername(e) {
    e.preventDefault();
    const nUserName = document.getElementById("nUserName").value;
    try {
      const username = getSessionObject("user").username;
      const options = {
        method: "PUT",
        body: JSON.stringify({
          username: nUserName,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(
        "/api/users/updateUsername/" + username,
        options
      );
      if (!response.ok) {
        showErrorUsername();
      }
      const user = await response.json();
      const token = getSessionObject("user").token;
      const sessionObject = {
        username: user.username,
        token: token,
      };
      setSessionObject("user", sessionObject);
      console.log("I was here " + user.username);
      RedirectUrl("/Profil");
    } catch (error) {
      console.error("UPDATE USERNAME :: error", error);
    }
  }
  //Change password 
  const changePasswordDiv = document.getElementById("ChangePassword");
  //A button to display password changing form 
  const buttonChangePassword = document.getElementById("password");
  buttonChangePassword.addEventListener("click", displayUpdatePasswordForm);
  //display a form to change the password and adding an event listener on it 
  function displayUpdatePasswordForm(e) {
    e.preventDefault();
    let changePasswordForm = `
    <form id="changePasswordForm">
        <input type="password" id="oldPassword" required="required" placeHolder="Ancien mot de passe">
        <input type="password" id="newPassword" required="required" placeHolder="Nouveau mot de passe">
        <input type="submit" id="submitPassword" value="Changer" >
        <div id="alertUpdatePwd"></div>
    </form>
    `;
    changePasswordDiv.innerHTML = changePasswordForm;
    const updatePasswordForm = document.getElementById("changePasswordForm");
    updatePasswordForm.addEventListener("submit", changePassword);
  }
  //On submit a request is sent to the api using 
  async function changePassword(e) {
    e.preventDefault();
    const nPassword = document.getElementById("newPassword").value;
    const oldPassword = document.getElementById("oldPassword").value;
    try {
      const username = getSessionObject("user").username;
      const options = {
        method: "PUT",
        body: JSON.stringify({
          oldPassword: oldPassword,
          nPassword: nPassword,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(
        "/api/users/updatePassword/" + username,
        options
      );
      if (!response.ok) {
        showErrorPwd();
      }
      const user = await response.json();
      RedirectUrl("/Profil");
    } catch (error) {
      console.error("UPDATE Password :: error", error);
    }
  }
  //fetch users score from the api 
  async function getMaxScore() {
    try {
      const username = getSessionObject("user").username;
      const response = await fetch("/api/scores/" + username);
      if (!response.ok) {
        throw new Error("fetch error getMaxScore" + error);
      }
      const score = await response.json();
      if (!score) {
        console.log("don't be here 1");
        throw new Error("fetch error getMaxScore" + error);
      }
      return score;
    } catch (error) {
      console.log("getMaxScore :: error" + error);
    }
  }
  //display an alert box and throw an error if the fetch failed 
  function showErrorPwd() {
    const alertDiv = document.getElementById("alertUpdatePwd");
    alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Le mot de passe est incorrect
                            </div>`;
    throw new Error("fetch error");
  }
  function showErrorUsername() {
    const alertDiv = document.getElementById("alertUpdateUsername");
    alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Ce nom d'utilisateur est déjà utilisé
                            </div>`;
    throw new Error("fetch error");
  }
};
export default ProfilPage;
