const express = require('express');
const server = express();

const projectDb = require('../data/helpers/projectModel');

// Projects
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get users.'
    });
  }
});

server.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await projectDb.get(id);
    projects === undefined
      ? res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' })
      : res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get users.'
    });
  }
});

server.post('/api/projects', async (req, res) => {
  try {
    const project = await req.body;
    console.log('from project', req.body);
    const projectId = await projectDb.insert(project);
    res.status(201).json(projectId);
  } catch (error) {
    console.log('eror from post =', error);
    res.status(400).json({
      errorMessage:
        'There was an error while saving the project to the database.'
    });
  }
});

// server.put('/api/projects/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const changes = req.body;
//     console.log('req body from put..', req.body);
//     const count = await projectDb.update(id, changes);
//     res.status(200).json({ message: `${count} post has been updated.` });
//   } catch (error) {
//     console.log('error from put', error);
//     res
//       .status(500)
//       .json({ message: 'The user information could not be modified.' });
//   }
// });

server.delete('/api/projects/delete/:id', async (req, res) => {
  try {
    const count = await projectDb.remove(req.params.id);
    if (count === 0) {
      res.status(404).json({
        message: 'The user with this ID does not exist.'
      });
    } else {
      res.status(200).json({ message: 'The user has been removed.' });
    }
  } catch (error) {
    console.log('err is', error);
    res.status(500).json({ message: 'The user could not be removed.' });
  }
});

module.exports = server;
