const express = require('express');
const server = express();

const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');
const configureMiddleware = require('../config/middleware');

configureMiddleware(server);

// Projects
server.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get projects.'
    });
  }
});

server.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await projectDb.get(id);
    projects === undefined
      ? res.status(404).json({
          message: 'The project with the specified ID does not exist.'
        })
      : res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get users.'
    });
  }
});

server.get('/api/projects/getactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await projectDb.getProjectActions(id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get projects.'
    });
  }
});

server.post('/api/projects', async (req, res) => {
  try {
    const project = req.body;
    if (project.name.length > 128) {
      res.status(422).json({ message: 'The name is too long!' });
    } else {
      const projectId = await projectDb.insert(project);
      res.status(201).json(projectId);
    }
  } catch (error) {
    res.status(400).json({
      errorMessage:
        'There was an error while saving the project to the database.'
    });
  }
});

server.put('/api/projects/:id', async (req, res) => {
  try {
    const changes = req.body;
    if (changes.name.length > 128) {
      res.status(422).json({ message: 'The name is too long!' });
    } else {
      const { id } = req.params;
      const count = await projectDb.update(id, changes);
      res.status(200).json({ message: `The post has been updated.` });
    }
  } catch (error) {
    console.log('error from put', error);
    res
      .status(500)
      .json({ message: 'The user information could not be modified.' });
  }
});

server.delete('/api/projects/:id', async (req, res) => {
  try {
    const count = await projectDb.remove(req.params.id);
    if (count === 0) {
      res.status(404).json({
        message: 'The project with this ID does not exist.'
      });
    } else {
      res.status(200).json({ message: 'The project has been removed.' });
    }
  } catch (error) {
    console.log('err is', error);
    res.status(500).json({ message: 'The project could not be removed.' });
  }
});

// Actions
server.get('/api/actions', async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get actions.'
    });
  }
});

server.get('/api/actions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await actionDb.get(id);
    actions === undefined
      ? res.status(404).json({
          message: 'The action with the specified ID does not exist.'
        })
      : res.status(200).json(actions);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get actions.'
    });
  }
});

server.post('/api/actions', async (req, res) => {
  try {
    const actions = req.body;
    if (actions.description.length > 128) {
      res.status(422).json({ message: 'The description is too long!' });
    } else {
      const actionInfo = await actionDb.insert(actions);
      res.status(201).json(actionInfo);
    }
  } catch (error) {
    res.status(400).json({
      errorMessage: 'There was an error while saving the post to the database.'
    });
  }
});

server.put('/api/actions/:id', async (req, res) => {
  try {
    const changes = req.body;
    if (changes.description.length > 128) {
      res.status(422).json({ message: 'The description is too long!' });
    } else {
      const { id } = req.params;
      const count = await actionDb.update(id, changes);
      res.status(201).json(count);
    }
  } catch (error) {
    res.status(400).json({
      errorMessage:
        'There was an error while updating the action to the database.'
    });
  }
});

server.delete('/api/actions/:id', async (req, res) => {
  try {
    const count = await actionDb.remove(req.params.id);
    if (count === 0) {
      res.status(404).json({
        message: 'The action with this ID does not exist.'
      });
    } else {
      res.status(200).json({ message: 'The action has been removed.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The action could not be removed.' });
  }
});

module.exports = server;
