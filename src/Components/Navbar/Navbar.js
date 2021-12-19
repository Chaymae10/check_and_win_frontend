import logo from "../../img/logoWebsite.png";
import { getSessionObject } from "../../utils/session";
const Navbar = () => {
  const navbarWrapper = document.getElementById("navbarWrapper");
  let navbar = " ";
  const user = getSessionObject("user");
  if (!user) {
    navbar = " ";
  } else if (user) {
    navbar = `
      <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col" id="col-logo">
      <a class="navbar-brand" href="/" data-uri="/">
      <img src="${logo}" alt="" width="40%" height="20%" class="d-inline-block align-text-top">
      </a>
      </div>
      <div class="col-auto me-auto">
      <nav class="navbar navbar-expand-lg navbar-light  ">
      <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" data-uri="/">Jeu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active " href="#" data-uri="/Scores">Meilleurs scores</a>
          </li>
          <li class="nav-item">
           <a class="nav-link active" href="#" data-uri="/Aide">Aide</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#" data-uri="/Logout">Se déconnecter</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </nav>
  <div class="col " id="profilSym">
  <div class="d-flex flex-row-reverse">
  <a class="navbar-brand" href="Profil" data-uri="/Profil">
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="black" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg>
</a>
</div>
</div>
  </div>
  </div>
    `;
  }

  navbarWrapper.innerHTML = navbar;
};
export default Navbar;
