import Express from "express";
import {
  getAllPlayers,
  savePlayer,
  deleteAllPlayers,
  getPlayerByNumber,
  updatePlayerInfo,
} from "./apiController";

const app = Express();
const port: number = 3000;

app.use(Express.json());

app.get("/", getAllPlayers);
app.get("/:number", getPlayerByNumber);
app.post("/", savePlayer);
app.delete("/", deleteAllPlayers);
app.put("/:number", updatePlayerInfo);

app.listen(port, () =>
  console.log(`currently running on https://localhost:${port}`)
);
