const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');

router.get('/', async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(400).json({
      errorMessage: 'Unable to get actions.'
    });
  }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;
