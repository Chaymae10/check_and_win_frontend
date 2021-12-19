import winIcone from "./../../img/win.png";
import anime from "animejs";

const ScorePage = async () => {
  let page = document.querySelector("#myPage");
  const body = document.querySelector("body");
  body.style.backgroundColor = "rgb(254, 193, 29)";
  page.style.backgroundColor = "rgb(254, 193, 29)";
  page.innerHTML = "";
  //fetch data from our api
  const res = await fetch("/api/scores/top");
  const response = await res.json();
  page.innerHTML = "";
  let htmlTable = "";
  //Atable that will contain the fetched data
  htmlTable = `
  <canvas class="fireworks"></canvas>
  <div> <img src="${winIcone}" width=780px> </div>
  <table class="table table-light table-striped table-hover mt-0 w-50">

  <thead>
  <tr>
    <th class="th">  </th>
    <th class="fs-3 th">Peudo</th>
    <th class="fs-3 th ">Score</th>
  </tr>
</thead>
<tbody>
  `;
//insert response items into the table lines 
  response
    .sort((a, b) => b.maxScore - a.maxScore)
    .splice(0, 5)
    .forEach((item, index) => {
      htmlTable += `<tr class="fs-4">
                            <td class="th fs-3">
                              <strong>${index + 1}</strong>                
                            </td>
                            <td class="fs-3">
                              ${item.username}               
                            </td>
                              <td class="fs-3">
                                    ${item.maxScore}             
                              </td>
                              </tr>`;
    });
  htmlTable += `</tbody> </table>`;
 
  page.innerHTML += htmlTable;
};

export default ScorePage;
