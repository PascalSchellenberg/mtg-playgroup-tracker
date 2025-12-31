import express from "express";
import cors from "cors";
import deckRoutes from "./routes/deckRoutes"
const app = express();

app.use(express.json());
app.use(cors());
app.get("/health", (_, res) => {
    res.json({status: "ok"})
});


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`)
});

app.use("/decks", deckRoutes);