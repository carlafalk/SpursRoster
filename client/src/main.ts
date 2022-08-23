import { SpursPlayer, SpursPlayerCreate } from "./playerModel";
import "./style.css";

window.addEventListener("DOMContentLoaded", main);

function main() {
  createPlayerCards();
  const form = document.getElementById("form");
  form?.addEventListener("submit", addPlayer);
}

async function fetchData() {
  const result = await fetch("/api");
  let roster: SpursPlayer[] = await result.json();

  return roster;
}

async function addPlayer(e: SubmitEvent) {
  e.preventDefault();
  const numberInput = document.getElementById("numberForm") as HTMLInputElement;
  const nameInput = document.getElementById("nameForm") as HTMLInputElement;
  const positionInput = document.getElementById("positionForm") as HTMLInputElement;
  const nationalityInput = document.getElementById("nationalityForm") as HTMLInputElement;
  const imageInput = document.getElementById("imageForm") as HTMLInputElement;

  let player: SpursPlayerCreate = {
    number: numberInput.value,
    name: nameInput.value,
    position: positionInput.value,
    nationality: nationalityInput.value,
    imageURL: imageInput.value,
  };

  const response = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  const data = await response.json();

  console.log(data);
}

async function createPlayerCards() {
  const teamRoster = await fetchData();

  const contentContainerDiv = document.getElementById("content-container");
  // const modalBtn = document.getElementById("modal-button");

  if (contentContainerDiv) {
    for (let i = 0; i < teamRoster.length; i++) {
      //CREATING ELEMENTS
      const playerCardDiv: HTMLDivElement = document.createElement("div");
      const infoDiv: HTMLDivElement = document.createElement("div");
      const nameDiv: HTMLDivElement = document.createElement("div");
      const numberDiv: HTMLDivElement = document.createElement("div");
      const nationalityDiv: HTMLDivElement = document.createElement("div");
      const positionDiv: HTMLDivElement = document.createElement("div");
      const buttonsDiv: HTMLDivElement = document.createElement("div");
      const deleteBtn: HTMLElement = document.createElement("i");
      const putBtn: HTMLElement = document.createElement("i");

      //ADDING CLASSES
      playerCardDiv.classList.add("playerCard");
      playerCardDiv.style.backgroundImage = `url(${teamRoster[i].imageURL})`;
      nameDiv.classList.add("name");
      numberDiv.classList.add("number");
      nationalityDiv.classList.add("nationality");
      positionDiv.classList.add("position");
      infoDiv.classList.add("infoDiv");
      buttonsDiv.classList.add("button-container");
      deleteBtn.classList.add("delete-btn", "fa-solid", "fa-trash");
      putBtn.classList.add("put-btn", "fa-solid", "fa-pen-to-square");

      //SET ATTRIBUTES
      putBtn.setAttribute("data-toggle", "modal");
      putBtn.setAttribute("data-target", "#exampleModalCenter");

      //APPENDING ELEMENTS
      playerCardDiv.appendChild(infoDiv);
      playerCardDiv.appendChild(buttonsDiv);
      buttonsDiv.appendChild(putBtn);
      buttonsDiv.appendChild(deleteBtn);
      infoDiv.appendChild(numberDiv);
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(positionDiv);
      infoDiv.appendChild(nationalityDiv);
      contentContainerDiv.appendChild(playerCardDiv);

      nameDiv.innerHTML = teamRoster[i].name;
      numberDiv.innerHTML = teamRoster[i].number;
      nationalityDiv.innerHTML = teamRoster[i].nationality;
      positionDiv.innerHTML = teamRoster[i].position;
    }
  }
}
