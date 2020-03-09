const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.status(200).send('world');
});

router.get('/repeat-my-fixed', (req, res) => {
  if (process.env.FIXED_MESSAGE) {
    res.status(200).send(process.env.FIXED_MESSAGE);
  } else {
    res.status(404).send('No Message Defined');
  }
});

router.get('/repeat-my-query', (req, res) => {
  if (req.query.message) {
    res.status(200).send(req.query.message);
  } else {
    res.status(400).send('Bad Request');
  }
});

router.post('/repeat-my-body', (req, res) => {
  if (req.body) {
    res.status(200).send(req.body);
  } else {
    res.status(400).send('Bad Request');
  }
});

router.get('/repeat-my-header', (req, res) => {
  if (req.header('X-Message')) {
    res.status(200).send(req.header('X-Message'));
  } else {
    res.status(400).send('Bad Request');
  }
});

router.get('/repeat-my-cookie', (req, res) => {
  if (req.cookies.message) {
    res.status(200).send(req.cookies.message);
  } else {
    res.status(400).send('Bad Request');
  }
});

router.get('/repeat-my-param/:message', (req, res) => {
  if (req.params.message) {
    res.status(200).send(req.params.message);
  } else {
    res.status(400).send('Bad Request');
  }
});

router.get('/repeat-all-my-queries', (req, res) => {
  res.status(200).send(Object.entries(req.query).map(([key, value]) => ({
    key,
    value,
  })));
});

module.exports = router;