import v1Router from "./routes/v1";
import express from "express";

const app = express();

// Add middleware to parse JSON
app.use(express.json());

app.use("/api/v1", v1Router);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});