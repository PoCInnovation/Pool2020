const express = require('express');
const joi = require('@hapi/joi');

const palindromesSchema = joi.array().items(joi.string().not().empty());
const router = express.Router();

const validate = (schema, location = 'body') => {
  return (req, res, next) => {
    const valid = schema.validate(req[location]);

    if (valid.error || valid.errors) {
      res.status(400).send('Bad Request');
      return;
    }

    next();
  };
}

router.post('/are-these-palindromes', validate(palindromesSchema), (req, res) => {
  res.status(200).send(req.body.map((word) => {
    const reversed = word.split('').reverse().join('');

    return {
      input: word,
      result: word === reversed,
    };
  }));
});

module.exports = router;