import { SpursPlayer, SpursPlayerCreate, SpursPlayerUpdate } from "./playerModel";
import "./style.css";

window.addEventListener("DOMContentLoaded", main);

function main() {
  createPlayerCards();
  const form = document.getElementById("form");
  form?.addEventListener("submit", addPlayer);
  const searchForm = document.getElementById("searcForm");
  searchForm?.addEventListener("submit", getPlayerByNumber);
  const editForm = document.getElementById("editForm");
  editForm?.addEventListener("submit", updatePlayerInfo);
}
async function getPlayerByNumber(e: SubmitEvent) {
  e.preventDefault();
  const numberInput = document.getElementById("getPlayerByNumberInput") as HTMLInputElement;
  const seacrhButton = document.getElementById("confirmSearchButton");
  const showPlayerModalName = document.getElementById("ShowPlayerModalName");
  const showPlayerModalNumber = document.getElementById("ShowPlayerModalNumber");
  const showPlayerModalPosition = document.getElementById("ShowPlayerModalPosition");
  const showPlayerModalNationality = document.getElementById("ShowPlayerModalNationality");
  const showPlayerModalImage = document.getElementById("showPlayerModalImage");

  const response = await fetch(`/api/${numberInput.value}`);
  const player: SpursPlayer = await response.json();

  seacrhButton?.setAttribute("data-toggle", "modal");
  seacrhButton?.setAttribute("data-target", "#getPlayerByNumberModal");

  if (showPlayerModalName && showPlayerModalNumber && showPlayerModalPosition && showPlayerModalNationality && showPlayerModalImage) {
    showPlayerModalName.innerHTML = player.name;
    showPlayerModalNumber.innerHTML = `number:${player.number}`;
    showPlayerModalPosition.innerHTML = `position:${player.position}`;
    showPlayerModalNationality.innerHTML = `nationality:${player.nationality}`;

    showPlayerModalImage.setAttribute("src", `${player.imageURL}`);
  }
}

async function fetchData() {
  const response = await fetch("/api");
  let roster: SpursPlayer[] = await response.json();

  return roster;
}

async function updatePlayerInfo(e: SubmitEvent) {
  e.preventDefault();

  const editNumberInput = document.getElementById("editNumberInput") as HTMLInputElement;
  const editNameInput = document.getElementById("editNameInput") as HTMLInputElement;
  const editPositionInput = document.getElementById("editPositionInput") as HTMLInputElement;
  const editNationalityInput = document.getElementById("editNationalityInput") as HTMLInputElement;
  const editImageInput = document.getElementById("editImageInput") as HTMLInputElement;

  let player: SpursPlayerUpdate = {
    number: editNumberInput.value,
    name: editNameInput.value,
    position: editPositionInput.value,
    nationality: editNationalityInput.value,
    imageURL: editImageInput.value,
  };
  const response = await fetch(`/api/${editNumberInput.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  await response.json();
  location.reload();
}

async function addPlayer(e: SubmitEvent) {
  const numberInput = document.getElementById("numberInput") as HTMLInputElement;
  const nameInput = document.getElementById("nameInput") as HTMLInputElement;
  const positionInput = document.getElementById("positionInput") as HTMLInputElement;
  const nationalityInput = document.getElementById("nationalityInput") as HTMLInputElement;
  const imageInput = document.getElementById("imageInput") as HTMLInputElement;
  e.preventDefault();

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
  await response.json();
  location.reload();
}

function loadForm(player: SpursPlayer) {
  const editNumberInput = document.getElementById("editNumberInput") as HTMLInputElement;
  const editNameInput = document.getElementById("editNameInput") as HTMLInputElement;
  const editPositionInput = document.getElementById("editPositionInput") as HTMLInputElement;
  const editNationalityInput = document.getElementById("editNationalityInput") as HTMLInputElement;
  const editImageInput = document.getElementById("editImageInput") as HTMLInputElement;

  editNumberInput.value = player.number;
  editNameInput.value = player.name;
  editPositionInput.value = player.position;
  editNationalityInput.value = player.nationality;
  editImageInput.value = player.imageURL;
}

async function createPlayerCards() {
  const teamRoster = await fetchData();

  const contentContainerDiv = document.getElementById("content-container");

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

      //EVENTLISTENERS
      deleteBtn.addEventListener("click", async () => {
        await fetch(`/api/${teamRoster[i].number}`, {
          method: "DELETE",
        });
        location.reload();
      });

      putBtn.addEventListener("click", () => {
        loadForm(teamRoster[i]);
      });

      //SET ATTRIBUTES
      putBtn.setAttribute("data-toggle", "modal");
      putBtn.setAttribute("data-target", "#edit-modal");

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

      //SET INNERHTML
      nameDiv.innerHTML = teamRoster[i].name;
      numberDiv.innerHTML = teamRoster[i].number;
      nationalityDiv.innerHTML = teamRoster[i].nationality;
      positionDiv.innerHTML = teamRoster[i].position;
    }
  }
}
