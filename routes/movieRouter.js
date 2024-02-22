import express from "express";
import {
  addMovies,
  getMoviesById,
  deleteMoviesbyId,
  editMovieById,
  getMovies,
} from "../helper.js";
import { auth } from "../middleWare/auth.js";

const router = express.Router();

//POST method
router.post("/", auth, async (req, res) => {
  const newMovie = req.body;
  console.log(newMovie);
  const create = await addMovies(newMovie);
  res.send(create);
});

//  Movies/id
router.get("/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const movie = await getMoviesById(movieId);
  // const movie = movies.find((mv) => mv.id == movieId)
  movie ? res.send(movie) : res.status(404).send({ message: "No Movie Found" });
});

//Delete Book
router.delete("/:movieId", auth, async (req, res) => {
  const { movieId } = req.params;
  const movie = await deleteMoviesbyId(movieId);
  // const movie = movies.find((mv) => mv.id == movieId)
  res.send(movie);
});

//Update movie
router.put("/:movieId", auth, async (req, res) => {
  const { movieId } = req.params;
  const updatedMovie = req.body;
  // console.log(newMovie);
  const edit = await editMovieById(movieId, updatedMovie);
  res.send(edit);
});

//to get language,rating
router.get("/", auth, async (req, res) => {
  const { language, rating } = req.query;
  // let filteredMovies = movies;
  // // const movie = movies.filter((mv) => mv.language == language);
  // console.log(req.query);

  // if(language){
  //   filteredMovies = filteredMovies.filter((mv) => mv.language == language)
  // }
  // if(rating){
  //   filteredMovies = filteredMovies.filter((mv) => mv.rating == rating)
  // }
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const movie = await getMovies(req);
  res.send(movie);
});

export const movieRouter = router;
