
const HttpError = require('../models/http-error');
const uuid = require('uuid');

let DUMMY_MOVIES = [
    {
        id: 'm1',
        title: 'El Rey león',
        creator: 'u1'
    },
    {
        id: 'm2',
        title: 'Star Wars',
        creator: 'u2'
    },
    {
        id: 'm3',
        title: 'Matrix',
        creator: 'u3'
    },
    {
        id: 'm4',
        title: 'Rocky',
        creator: 'u4'
    },
    {
        id: 'm5',
        title: 'Mario Bros',
        creator: 'u5'
    },
    {
        id: 'm6',
        title: 'Crazy about Mary',
        creator: 'u6'
    },
    {
        id: 'm7',
        title: 'La Pasión de Cristo',
        creator: 'u7'
    }
];

const getAllMovies = (req, res, next)=>{
    res.json({movies : DUMMY_MOVIES});
};

const getMoviesById = (req, res, next) => {    
    const movie = DUMMY_MOVIES.find(p => {
        return p.id === req.params.pid;
    });
    if (!movie){        
        const error = new Error('Lugar no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({movie});
    }    
};

const getMoviesByUsers = (req, res, next)=>{
    const movies = DUMMY_MOVIES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!movies){
        const error = new HttpError('La película en mención, no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({movies});
};

const saveMovie = (req, res, next)=>{
    const {title, creator} = req.body;
    const createdMovie = {
        id: uuid.v4(),
        title,
        creator
    };
    DUMMY_MOVIES.push(createdMovie);
    res.status(201).json({movie:createdMovie});
    res.json({movies});
};
//updateMovies = Patch
const updateMovie = (req,res,next)=>{
    const {title} = req.body;
    const movieId= req.params.pid;
    console.log(movieId);
    const updatedMovie = {... DUMMY_MOVIES.find(p=>p.id === movieId)};
    const moviesIndex = DUMMY_MOVIES.findIndex(p=>p.id === movieId);
    updatedMovie.title = title;
    DUMMY_MOVIES [moviesIndex] = updatedMovie;
    res.status(200).json({movie : updatedMovie});    
};

const deleteMovie = (req, res, next) => {
    const movieId = req.params.pid;
    DUMMY_MOVIES = DUMMY_MOVIES.filter (p => p.id !== movieId)
    res.status(200).json({message: 'Pelicula Borradoa'});
};

exports.getAllMovies = getAllMovies;
exports.getMoviesById = getMoviesById;
exports.getMoviesByUsers = getMoviesByUsers;
exports.saveMovie = saveMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;