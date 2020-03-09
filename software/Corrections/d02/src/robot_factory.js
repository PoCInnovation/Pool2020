const conveyorBelt = (previous, nexts, done) => {
  if (nexts.length === 0) {
    done(null, previous);
    return;
  }

  nexts[0](previous, (err, res) => {
    if (err) {
      done(err);
      return;
    }

    nexts.shift();
    conveyorBelt(res, nexts, done);
  });
};

const createHead = (robot, shape, color, cb) => {
  if (robot.head) {
    cb(new Error('Head already present'));
    return;
  }

  robot.head = {
    shape,
    color,
  };

  cb(null, robot);
};

const createBody = (robot, armor, cb) => {
  if (robot.body) {
    cb(new Error('Body already present'));
    return;
  }

  robot.body = {
    armor,
  };

  cb(null, robot);
};

const createMaillotDeBain = (robot, color, cb) => {
  if (!robot.body) {
    cb(new Error('Body must be present'));
    return;
  }

  if (robot.body.maillotDeBain) {
    cb(new Error('Maillot de Bain already present'));
    return;
  }

  robot.body.maillotDeBain = {
    color,
  };

  cb(null, robot);
};

module.exports = {
  conveyorBelt,
  createHead,
  createBody,
  createMaillotDeBain,
};
