import { client } from "./index.js";
import bcrypt from "bcrypt";

//Movies
export async function getMovies(req) {
  return await client
    .db("IoFactory-Imdb")
    .collection("movies")
    .find(req.query)
    .toArray();
}

export async function addMovies(newMovie) {
  return await client
    .db("IoFactory-Imdb")
    .collection("movies")
    .insertOne(newMovie);
}

export async function getMoviesById(movieId) {
  return await client
    .db("IoFactory-Imdb")
    .collection("movies")
    .findOne({ id: movieId });
}

export async function deleteMoviesbyId(movieId) {
  return await client
    .db("IoFactory-Imdb")
    .collection("movies")
    .deleteOne({ id: movieId });
}

export async function editMovieById(movieId, updatedMovie) {
  return await client
    .db("IoFactory-Imdb")
    .collection("movies")
    .updateOne({ id: movieId }, { $set: updatedMovie });
}

//TVShows
export async function getShows(req) {
  return await client
    .db("IoFactory-Imdb")
    .collection("shows")
    .find(req.query)
    .toArray();
}

export async function addShows(newShow) {
  return await client
    .db("IoFactory-Imdb")
    .collection("shows")
    .insertOne(newShow);
}

export async function getShowsById(showId) {
  return await client
    .db("IoFactory-Imdb")
    .collection("shows")
    .findOne({ id: showId });
}

export async function deleteShowsbyId(showId) {
  return await client
    .db("IoFactory-Imdb")
    .collection("shows")
    .deleteOne({ id: showId });
}

export async function editShowById(showId, updatedShow) {
  return await client
    .db("IoFactory-Imdb")
    .collection("shows")
    .updateOne({ id: showId }, { $set: updatedShow });
}

//users
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no of rounds)
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}
// console.log(genPassword("password"));

export async function createUser(email, hashedPassword) {
  return await client
    .db("IoFactory-Imdb")
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
}

export async function getUserByEmail(email) {
  return await client
    .db("IoFactory-Imdb")
    .collection("users")
    .findOne({ email: email });
}
