const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());
const cors = require("cors");
app.use(cors());

const { initializeDatabase } = require("./db/db.connection");
const { Moviess } = require("./models/movie.models");

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Moviess.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies", async (req, res) => {
  const { movieTitle, director, genre } = req.body;
  try {
    const movieData = new Moviess({ movieTitle, director, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const deleteMovies = await Moviess.findByIdAndDelete(movieId);

    if (!deleteMovies) {
      return res.status(404).json({ message: "Movie Not Found" });
    } else {
      res.status(200).json({
        message: "Movie deleted successfully",
        movie: deleteMovies,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
