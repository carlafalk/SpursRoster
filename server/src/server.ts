import Express from "express";
import { getAllPlayers, savePlayer } from "./apiController";

const app = Express();
const port: number = 3000;

app.use(Express.json());

app.get("/", getAllPlayers);
app.post("/", savePlayer);

app.listen(port, () =>
  console.log(`currently running on https://localhost:${port}`)
);
