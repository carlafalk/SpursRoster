import Express from "express";
import { deleteAllPlayers, deletePlayerByNumber, getAllPlayers, getPlayerByNumber, savePlayer, updatePlayerInfo } from "./apiController";
import { errorHandler, validatePlayer } from "./middlewares";

const app = Express();
const port: number = 3000;

app.use(Express.json());

app.get("/api/", getAllPlayers);
app.get("/api/:number", getPlayerByNumber);
app.post("/api/", validatePlayer, savePlayer);
app.delete("/api/", deleteAllPlayers);
app.delete("/api/:number", deletePlayerByNumber);
app.put("/api/:number", validatePlayer, updatePlayerInfo);

// app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`currently running on https://localhost:${port}`));
