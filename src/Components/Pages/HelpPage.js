
import pouletto from "./../../img/pouletto.png"

const HelpPage = () => {
    const body = document.querySelector("body");
    const pageDiv = document.querySelector("#myPage");
    body.style.backgroundColor = "rgb(254, 193, 29)";
    pageDiv.style.backgroundColor = "rgb(254, 193, 29)";
    pageDiv.innerHTML = "";
    //the main content of the Help pAGE 
    let htmlText = `<div class="container">
    <div class="row">
      	<img src="${pouletto}" class="col-3">
      <div class="col pt-5 pHelpPage fs-3"> Coucourikou, je suis ton ami Pouletto, je vais t'aider à comprendre comment jouer. N’oublie pas 
        de bien te concentrer pour être parmi les meilleurs joueurs.
    </div>
    </div>
    <div class="pHelpPage fs-4 pt-5"> 1. Quand tu arrives sur le site, tu as un menu pour choisir le niveau de difficulté <br> 
    -le niveau facile : 12 cartes <br>
    -le niveau moyen : 24 cartes <br>
    -le niveau difficile : 36 cartes</div>
    <div class="pHelpPage fs-4"> 2. Les cartes vont apparaitre pendant quelques secondes, <strong> Concentre toi bien </strong> </div>
    <div class="pHelpPage fs-4 mb-4"> 3. Appuis sur les cartes, pour choisir la paire des cartes qui se ressemblent <br>
    -Si tu trouves la même paire de cartes : tu gagnes 10 points <br>
      -Si tu te trompes : tu perds une vie. <strong>Attention tu n'as que 5 vies </strong>
    </div>
    <cite class="citeHelpPage fs-2">Amuse toi bien, A bientôt</cite>
    
    
    </div> `;
    pageDiv.innerHTML+= htmlText;
  
  

}
export default HelpPage ; 