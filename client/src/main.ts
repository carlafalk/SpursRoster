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
      contentContainerDiv.appendChild(playerCardDiv);
      playerCardDiv.appendChild(infoDiv);
      playerCardDiv.appendChild(buttonsDiv);
      buttonsDiv.appendChild(putBtn);
      buttonsDiv.appendChild(deleteBtn);
      infoDiv.appendChild(numberDiv);
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(positionDiv);
      infoDiv.appendChild(nationalityDiv);

      nameDiv.innerHTML = teamRoster[i].name;
      numberDiv.innerHTML = teamRoster[i].number;
      nationalityDiv.innerHTML = teamRoster[i].nationality;
      positionDiv.innerHTML = teamRoster[i].position;
    }
  }
}

const numberForm = document.getElementById("numberForm") as HTMLInputElement;
const nameForm = document.getElementById("nameForm") as HTMLInputElement;
const positionForm = document.getElementById("positionForm") as HTMLInputElement;
const nationalityForm = document.getElementById("nationalityForm") as HTMLInputElement;
const imageForm = document.getElementById("imageForm") as HTMLInputElement;

let player: spursPlayer = {
  id: "asd",
  number: numberForm.value,
  name: nameForm.value,
  position: positionForm.value,
  nationality: nationalityForm.value,
  imageURL: imageForm.value,
};

createPlayerCards();
