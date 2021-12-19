import img1 from "./../../img/img1.jpg";
import img2 from "./../../img/img2.jpg";
import img3 from "./../../img/img3.jpg";
import img4 from "./../../img/img4.jpg";
import img5 from "./../../img/img5.jpg";
import img6 from "./../../img/img6.jpg";
import img7 from "./../../img/img7.jpg";
import img8 from "./../../img/img8.jpg";
import img9 from "./../../img/img9.jpg";
import img10 from "./../../img/img10.jpg";
import img11 from "./../../img/img11.jpg";
import img12 from "./../../img/img12.jpg";
import img13 from "./../../img/img13.jpg";
import img14 from "./../../img/img14.jpg";
import img15 from "./../../img/img15.jpg";
import img16 from "./../../img/img16.jpg";
import img17 from "./../../img/img17.jpg";
import img18 from "./../../img/img18.jpg";
import backImage from "./../../img/backImage.jpg";
import gameOversound from "./../../sound/gameOverSound.mp3";
import winSound from "./../../sound/winSound.mp3";
import turnCardSound from "./../../sound/turnCardSound.mp3";
import sameCardsSound from "./../../sound/sameCardsSound.mp3";
import differentCardsSound from "./../../sound/differentCardsSound.mp3";

import { RedirectUrl } from "../Router/Router";
import { getSessionObject } from "./../../utils/session";

const HomePage = async () => {
  const user = getSessionObject("user");
  if (!user) {
    RedirectUrl("/LoginRegisterPage");
  } else if (user) {
    // change the background color and put it in yellow when you arrive on the game
    const body = document.querySelector("body");
    const pageDiv = document.querySelector("#myPage");
    body.style.backgroundColor = "rgb(254, 193, 29)";
    pageDiv.style.backgroundColor = "rgb(254, 193, 29)";

    function Mygame() {
      let scoreValue = 0;
      let starCount = 5;
      let counterShowCards = 6;
      let timeOfplay = 41;
      let maxScore = 60;
      let level = 0;
      let nbimages = 6;
      let timer;
      let cards;
      let timerCount;

      let content = `
      <section id="game">
      <audio id="gameOverSound" src="${gameOversound}"></audio>
      <audio id="winSound" src="${winSound}"></audio>
      <audio id="turnCardSound" src="${turnCardSound}"></audio>
      <audio id="sameCardsSound" src="${sameCardsSound}"></audio>
      <audio id="differentCardsSound" src="${differentCardsSound}"></audio>

      
      <!---------------------------------Form "noveau de diffeculte"--------------------------------->
      <div class="overlay-text visible" id="divForm">
      <form id="difficultyForm">

      <div class="mb-3">
        <label  class="form-label" id="difficulty">Niveau de difficulté</label>
        <select  class="form-select" id="formSelect">
          <option id="easy">Facile (12 cartes) </option>
          <option id="medium">Moyen (24 cartes) </option>
          <option id="hard">Difficile (36 cartes) </option>
        </select>
      </div>

      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-danger btn-lg btn-outline-warning text-dark border border-dark " type="button" id="start">Start</button>
      </div>
      </form>
    </div>
    <!---------------------------------Form "noveau de diffeculte"--------------------------------->

    
    <!---------------------------------Navbar Player--------------------------------->
      <div id ="navbarPlayer" class="mb-3 mt-3 row p-1 mb-2 bg-light text-dark border rounded-pill">
        <div class="col text-start">
         <p class="fs-4"> Score :<span id="scoreSpan" class="fs-4">${scoreValue} </span> </p>
        </div>
        <div class="col text-center" >
          <p class="fs-4 text-cv"> Timer : <span class="fs-4" id="sectionTimer"> </span>  </p>
        </div>
      
     
        <div class ='vies text-end col-4 mt-3 row'>
          <p class="fs-4 col-3 text-end"> Vies: </p>
          <ul id="star-rating" class="star-rating col text-start">
           <li class="star"><i class="fa fa-star"></i></li>
            <li class="star"><i class="fa fa-star"></i></li>
            <li class="star"><i class="fa fa-star"></i></li>
            <li class="star"><i class="fa fa-star"></i></li>
            <li class="star"><i class="fa fa-star"></i></li>
          </ul>  
        </div>
      </div>
      <!---------------------------------Navbar Player--------------------------------->


      <!---------------------------------Memory Game--------------------------------->
      <div id="sectionMemoryGame" class="rounded">
      
      </div>
      <!---------------------------------Memory Game--------------------------------->
        </section>
      `;
      pageDiv.innerHTML = content;

      //access to HTML elements

      let sectionMemoryGame = document.getElementById("sectionMemoryGame");
      let sectionTimer = document.getElementById("sectionTimer");
      let scoreSpan = document.getElementById("scoreSpan");
      let star = document
        .getElementById("star-rating")
        .querySelectorAll(".star");
      let formSelect = document.getElementById("formSelect");
      let start = document.getElementById("start");
      let game = document.getElementById("game");
      let navbarPlayer = document.getElementById("navbarPlayer");
      const difficultyForm = document.getElementById("difficultyForm");
      difficultyForm.style.backgroundColor = "rgba(0, 0, 0, 0)";

      let images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
      ];

      let getImages = (nbimages) => {
        let imgs = [];
        for (let i = 0; i < nbimages; i++) {
          imgs.push({ source: images[i], id: i + 1 });
          imgs.push({ source: images[i], id: i + 1 });
        }
        return imgs;
      };

      start.addEventListener("click", function () {
        level = formSelect.selectedIndex;
        if (level == 1) {
          //level medium
          counterShowCards = 11;
          timeOfplay = 71;
          maxScore = 120;
          nbimages = 12;
        } else if (level == 2) {
          //level hard
          counterShowCards = 16;
          timeOfplay = 101;
          maxScore = 180;
          nbimages = 18;
        }
/***************************************************************************************
*    Title: How to Code a Card Matching Game
*    Author: Web Dev Simplified
*    Date: 20/10/2018
*    Code version: 1.1
*    Availability:https://www.youtube.com/watch?v=28VfzEiJgy4
* => for remove level form
*
***************************************************************************************/
        //Remove level form
        document.querySelector(".overlay-text").classList.remove("visible");
        //start the game
        displayRandomCards();
        startOfTheGame();
        turneCardsOnClick();
      });

      //display cards in a random way

      let displayRandomCards = () => {
        let imagesRandom = getImages(nbimages).sort(() => Math.random() - 0.6);

        //redefinition of the style according to each level to display all the cards on the same screen
        if (level == 1) {
          sectionMemoryGame.style.width = "130vh";
          sectionMemoryGame.style.height = "80vh";
          game.style.width = "70%";
          navbarPlayer.style.width = "140vh";
        } else if (level == 2) {
          sectionMemoryGame.style.width = "150vh";
          sectionMemoryGame.style.height = "80vh";
          game.style.width = "80%";
          navbarPlayer.style.width = "160vh";
        }
        imagesRandom.forEach((image) => {
          sectionMemoryGame.innerHTML += `
                      <div class="memory-card memory-card${level}" id=${image.id}">  
                        <img id="front-face" src="${image.source}"  />
                        <img id="back-face" src="${backImage}" />
                      </div>`;
        });
        cards = document.querySelectorAll(".memory-card");
      };

      // this function allows you to display the cards before the game for a certain period of time
      // defined according to the chosen level

      let startOfTheGame = () => {
        let faces = document.querySelectorAll("#front-face");
        let backs = document.querySelectorAll("#back-face");

        function countDown() {
          counterShowCards--;
          if (counterShowCards >= 0) {
            // display the cards and prevent them from being clickable
            sectionTimer.innerHTML = counterShowCards;
            faces.forEach((card) => {
              card.style.transform = "rotateY(0deg)";
            });
            backs.forEach((card) => {
              card.style.transform = "rotateY(180deg)";
            });
            cards.forEach((card) => {
              card.style.pointerEvents = "none";
            });
          }
          if (counterShowCards === 0) {
            //hide the images and give permission for them to be clickable
            faces.forEach((card) => {
              card.style.transform = "rotateY(180deg)";
            });
            backs.forEach((card) => {
              card.style.transform = "rotateY(0deg)";
            });
            cards.forEach((card) => {
              card.style.pointerEvents = "auto";
            });
            clearInterval(timerCount);
            TimerPlayingGame(); //the time of the game starts
          }
        }
        timerCount = setInterval(countDown, 1000);
      };

      //this function allows you to rotate the cards in the event of a click during the game
/***************************************************************************************
*    Title: Memory Card Game - JavaScript Tutorial
*    Author: marina-ferreira
*    Date:   29/08/ 2018
*    Code version: 1.1
*    Availability: https://www.youtube.com/watch?v=ZniVgo8U7ek&t=954s
* => for turn cards when the user click
*
***************************************************************************************/

      function turneCardsOnClick() {
        cards.forEach((card) =>
          card.addEventListener("click", (e) => {
            // if we have two turned cards we can't turn the third one
            if (turnTwoCards) return;
            let audio = document.getElementById("turnCardSound");
            audio.play();
            //to run the cards, manage in css with the .flip class
            card.classList.toggle("flip");
            checkImages(e);
          })
        );
      }

      let TimerPlayingGame = () => {
        function countDown() {
          if (window.location.pathname !== "/") {
            clearInterval(timer);
          }
          if (timeOfplay > 0 && starCount > 0) {
            timeOfplay--;
            sectionTimer.innerHTML = timeOfplay;
          }
          if (timeOfplay === 0 && scoreValue < maxScore) {
            gameOver();
            clearInterval(timer);
          }
          if (scoreValue === maxScore && timeOfplay > 0 && starCount > 0) {
            win();
            clearInterval(timer);
          }
        }
        timer = setInterval(countDown, 1000);
      };

      //we use this variable to verify that we have exactly two cards spinning and to prevent the user from spinning a third
      let turnTwoCards = false;

      //we use this variable to verify that we have exactly 2 turned cards to be able to compare them
      let imagesTurned;
      const checkImages = (e) => {
        const imageClicked = e.target;
        imageClicked.classList.add("turned"); //we add the turned class to count the number of turned cards
        imagesTurned = document.querySelectorAll(".turned");

        // here if a card is opposite => we prevent it from facing => it becomes non-clickable
        imageClicked.style.pointerEvents = "none";

        if (imagesTurned.length === 2) {
          if (
            imagesTurned[0].getAttribute("id") ===
            imagesTurned[1].getAttribute("id")
          ) {
            //matching cards
            sameCards();
          } else {
            //cards not match
            differentCards();
          }
        }
      };
/***************************************************************************************
*    Title: Memory Card Game - JavaScript Tutorial
*    Author: marina-ferreira
*    Date:   29/08/ 2018
*    Code version: 1.1
*    Availability: https://www.youtube.com/watch?v=ZniVgo8U7ek&t=954s
* => for same cards and different cards
*
***************************************************************************************/


      let sameCards = () => {
        let audio = document.getElementById("sameCardsSound");
        setTimeout(() => {
          audio.play();
        }, 300);

        imagesTurned.forEach((image) => {
          image.classList.remove("turned"); // we reduce the number of turned cards
          image.style.pointerEvents = "none";
        });
        scoreValue += 10;
        scoreSpan.innerHTML = scoreValue;
      };

      let differentCards = () => {
        let audio = document.getElementById("differentCardsSound");
        setTimeout(() => {
          audio.play();
        }, 500);

        imagesTurned.forEach((image) => {
          turnTwoCards = true;
          image.classList.remove("turned");
          image.style.pointerEvents = "auto"; // we make it possible for the cards to become clickable again

          setTimeout(() => {
            image.classList.remove("flip"); //to rotate them if they are not the same
            turnTwoCards = false;
          }, 1200);
        });

        //we increase the number of stars
        star[starCount - 1].firstElementChild.classList.remove("fa-star");
        starCount--;
        if (starCount == 0) {
          gameOver();
        }
      };

      //this function allows to display a pop-up to end the game if the user loses
      // the user has the option of pressing "replay" to restart the game
      let gameOver = () => {
        updateScore();
        let audio = document.getElementById("gameOverSound");
        setTimeout(() => {
          audio.play();
        }, 500);
        cards.forEach((card) => {
          card.style.pointerEvents = "none";
        });

        Swal.fire({
          title: "Game Over",
          allowOutsideClick: false,
          confirmButtonText: "Rejouer",
          customClass: {
            confirmButton:
              "btn btn-outline-light border border-dark text-dark text-center fs-6 confirmButton mt-4 mb-4",
            title: "text-center fs-1 titleGameOver",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Mygame();
          }
        });
      };

      //this function allows to display a pop up to end the game if the user finds all the cards
      //the user has the option of pressing "replay" to restart the game

      let win = () => {
        updateScore();
        let audio = document.getElementById("winSound");
        setTimeout(() => {
          audio.play();
        }, 500);
        cards.forEach((card) => {
          card.style.pointerEvents = "none";
        });

        Swal.fire({
          title: "Bravo à toi",
          allowOutsideClick: false,
          confirmButtonText: "Rejouer",
          customClass: {
            confirmButton:
              "btn btn-outline-light border border-dark text-dark text-center fs-6 confirmButton mt-4 mb-4",
            title: "text-center fs-1 titleGameOver",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Mygame();
          }
        });
      };

      //update the player's score if it is bigger than the previous one to always keep his best score
      async function updateScore() {
        try {
          const options = {
            method: "POST",
            body: JSON.stringify({
              username: user.username,
              score: scoreValue,
            }),
            headers: {
              "Content-type": "application/json",
            },
          };
          const response = await fetch("/api/scores/updateMaxScore", options);
          const score = await response.json();
          console.log(score);
        } catch (error) {
          console.error("error  : ", error);
        }
      }
    }

    Mygame();
  }
};

export default HomePage;
