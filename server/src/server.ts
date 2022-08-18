import Express from "express";
import {
  deleteAllPlayers,
  getAllPlayers,
  getPlayerByNumber,
  savePlayer,
  updatePlayerInfo,
  validatePlayer,
} from "./apiController";

const app = Express();
const port: number = 3000;

app.use(Express.json());

app.get("/", getAllPlayers);
app.get("/:number", getPlayerByNumber);
app.post("/", validatePlayer, savePlayer);
app.delete("/", deleteAllPlayers);
app.put("/:number", validatePlayer, updatePlayerInfo);

app.listen(port, () =>
  console.log(`currently running on https://localhost:${port}`)
);
