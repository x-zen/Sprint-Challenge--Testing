const express = require('express');
const knexConfig = require('./knexfile.js')
const db = require('knex')(knexConfig.development);

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/games', async (req,res) => {
  const {title, genre, releaseYear} = req.body;

  if (!title || !genre) {
    res.status(422).json({ message: "Must include title and genre!" })
  } else {
    try {
      const newGame = await db('games').insert({title,genre,releaseYear});

      res.status(200).json(newGame);

    }
    catch(error) {
      console.log(error);
    }
  };
});

server.get('/games', async (req,res) => {

  try {
    const gamesList = await db('games').select('*');

    console.log(gamesList);
    res.status(200).json(gamesList);
  } catch(error) {
   console.log(error);
  }
});

module.exports = server;
