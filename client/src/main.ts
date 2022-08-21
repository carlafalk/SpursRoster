import { spursPlayer } from "./playerModel";
import "./style.css";

async function fetchData() {
  const result = await fetch("/api");
  let roster: spursPlayer[] = await result.json();

  return roster;
}

async function createPlayerCards() {
  const teamRoster = await fetchData();

  const contentContainerDiv = document.getElementById("content-container");
  if (contentContainerDiv) {
    for (let i = 0; i < teamRoster.length; i++) {
      const playerCardDiv: HTMLDivElement = document.createElement("div");
      const infoDiv: HTMLDivElement = document.createElement("div");
      const img: HTMLImageElement = document.createElement("img");
      const nameDiv: HTMLDivElement = document.createElement("div");
      const numberDiv: HTMLDivElement = document.createElement("div");
      const nationalityDiv: HTMLDivElement = document.createElement("div");
      const positionDiv: HTMLDivElement = document.createElement("div");

      playerCardDiv.classList.add("playerCard");
      img.classList.add("img");
      nameDiv.classList.add("name");
      numberDiv.classList.add("number");
      nationalityDiv.classList.add("nationality");
      positionDiv.classList.add("position");
      infoDiv.classList.add("infoDiv");

      contentContainerDiv.appendChild(playerCardDiv);
      playerCardDiv.appendChild(img);
      playerCardDiv.appendChild(infoDiv);
      infoDiv.appendChild(numberDiv);
      infoDiv.appendChild(nationalityDiv);
      infoDiv.appendChild(positionDiv);
      infoDiv.appendChild(nameDiv);

      nameDiv.innerHTML = teamRoster[i].name;
      numberDiv.innerHTML = teamRoster[i].number;
      nationalityDiv.innerHTML = teamRoster[i].nationality;
      positionDiv.innerHTML = teamRoster[i].position;
      img.src = teamRoster[i].imageURL;
    }
  }
}

createPlayerCards();
