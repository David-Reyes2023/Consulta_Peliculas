const express = require('express');

const moviesControllers = require('../controllers/movies-controllers');

const router = express.Router();

router.get('/', moviesControllers.getAllMovies);

router.get('/:pid', moviesControllers.getMoviesById);

router.get('/users/:uid', moviesControllers.getMoviesByUsers);

router.post('/', moviesControllers.saveMovie);

router.patch('/:pid', moviesControllers.updateMovie);

router.delete('/:pid',moviesControllers.deleteMovie);

module.exports = router;
