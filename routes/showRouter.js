import express from "express";
import {
  addShows,
  getShowsById,
  deleteShowsbyId,
  editShowById,
  getShows,
} from "../helper.js";
import { auth } from "../middleWare/auth.js";

const router = express.Router();

//POST method
router.post("/", auth, async (req, res) => {
  const newShow = req.body;
  // const id = Math.floor(Math.random() * 10000 + 1);
  //  newShow.id = id;
  console.log(newShow);
  const create = await addShows(newShow); 
  res.send(create);
});

// Movies/id
router.get("/:showId", auth, async (req, res) => {
  const { showId } = req.params;
  const show = await getShowsById(showId);
  // const movie = movies.find((mv) => mv.id == movieId)
  show ? res.send(show) : res.status(404).send({ message: "No Show Found" });
});

//Delete Book
router.delete("/:showId", auth, async (req, res) => {
  const { showId } = req.params;
  const show = await deleteShowsbyId(showId);
  // const movie = movies.find((mv) => mv.id == movieId)
  res.send(show);
});

//Update movie
router.put("/:showId", auth, async (req, res) => {
  const { showId } = req.params;
  const updatedShow = req.body;
  // console.log(newMovie);
  const edit = await editShowById(showId, updatedShow);
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
  const show = await getShows(req);
  res.send(show);
});

export const showRouter = router;
