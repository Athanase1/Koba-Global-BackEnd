import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import routeCommande from "./routes/commande.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
const allowedOrigins = [
    "http://localhost:5173",
    "https://athanase1.github.io",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/commande", routeCommande)
app.listen(PORT, () => console.log(`serveur démarré sur port ${PORT}`));
