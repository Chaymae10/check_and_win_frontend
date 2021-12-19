import winIcone from "./../../img/win.png";


const ScorePage = async () =>{
  let page = document.querySelector("#myPage");
  const body = document.querySelector("body");
  body.style.backgroundColor = "rgb(254, 193, 29)";
  page.style.backgroundColor = "rgb(254, 193, 29)";
  page.innerHTML = "";
  const container = document.createElement("div");
  container.className="container-scores mt-5";
    try{
      const response  = await fetch('/api/scores/top');
      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      
      const scores = await response.json();
      let image = document.createElement("img");
      image.src = `${winIcone}`;
      image.style.width = "780px";
      image.className="text-center";
      container.appendChild(image);
     
      const scoresTable = document.createElement("table");
      scoresTable.className="table table-light table-striped table-hover w-150";
      const thead = document.createElement("thead");
      const header = document.createElement("tr");
      thead.appendChild(header);
      const header0 = document.createElement("th");
      header0.innerText = "";
      const header1 = document.createElement("th");
      header1.className = "th fs-3";
      header1.innerText = "Username";
      const header2 = document.createElement("th");
      header2.className = "th fs-3";
      header2.innerText = "Meilleur score";
      header.appendChild(header0);
      header.appendChild(header1);
      header.appendChild(header2);
      scoresTable.appendChild(thead);
      const tbody = document.createElement("tbody");
      scores.sort((a, b) => b.maxScore - a.maxScore).splice(0,5).forEach((user,index) => {
        const line = document.createElement("tr");
        const indexCell = document.createElement("td");
        indexCell.className = "th fs-3"
        indexCell.innerText = "#"+(index+1);
        line.appendChild(indexCell);
        const usernameCell = document.createElement("td");
        usernameCell.innerText = user.username;
        usernameCell.className = "td fs-3"
        line.appendChild(usernameCell);
        const scoreCell = document.createElement("td");
        scoreCell.className = "td fs-4" 
        scoreCell.innerText = user.maxScore;
        line.appendChild(scoreCell);
        tbody.appendChild(line);
      });
      scoresTable.appendChild(tbody);
      //scoresTableDiv.appendChild(scoresTable);
      container.appendChild(scoresTable);
      page.appendChild(container);
    }catch(error){
        throw new Error("Another bug :)"+Error);
    }
};



export default ScorePage;
