const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get projects.'
    });
  }
});

router.get('/:id', async (req, res) => {
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

router.get('/getactions/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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
    res
      .status(500)
      .json({ message: 'The user information could not be modified.' });
  }
});

router.delete('/:id', async (req, res) => {
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
    res.status(500).json({ message: 'The project could not be removed.' });
  }
});

module.exports = router;
