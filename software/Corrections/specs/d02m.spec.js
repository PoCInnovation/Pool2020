const { copyStudentProject } = require('./utils');

copyStudentProject();

describe('ex01 - Do-Op', () => {
  const doOp = require('@student/src/do_op');

  describe('01 - Simple operations', () => {
    it('should compute a basic add', done => {
      doOp(1, '+', 1, (err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res).toBe(2);
        done();
      });
    });

    it('should compute a basic sub', done => {
      doOp(1, '-', 1, (err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res).toBe(0);
        done();
      });
    });

    it('should compute a basic mul', done => {
      doOp(1, '*', 2, (err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res).toBe(2);
        done();
      });
    });

    it('should compute a basic div', done => {
      doOp(4, '/', 2, (err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res).toBe(2);
        done();
      });
    });

    it('should compute a basic mod', done => {
      doOp(4, '%', 3, (err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect(res).toBe(1);
        done();
      });
    });
  });

  describe('02 - Error handling', () => {
    it('should handle a bad first argument', done => {
      doOp('3', '+', 3, (err, res) => {
        expect(err).not.toBeNull();
        expect(res).toBeUndefined();
        expect(err.message).toBe('Bad number');
        done();
      });
    });

    it('should handle a bad operator', done => {
      doOp(3, 'v', 3, (err, res) => {
        expect(err).not.toBeNull();
        expect(res).toBeUndefined();
        expect(err.message).toBe('Bad operator');
        done();
      });
    });

    it('should handle a bad third argument', done => {
      doOp(3, '+', '3', (err, res) => {
        expect(err).not.toBeNull();
        expect(res).toBeUndefined();
        expect(err.message).toBe('Bad number');
        done();
      });
    });

    it('should handle division by 0', done => {
      doOp(3, '/', 0, (err, res) => {
        expect(err).not.toBeNull();
        expect(res).toBeUndefined();
        expect(err.message).toBe('Division by 0');
        done();
      });
    });

    it('should handle modulo by 0', done => {
      doOp(3, '%', 0, (err, res) => {
        expect(err).not.toBeNull();
        expect(res).toBeUndefined();
        expect(err.message).toBe('Division by 0');
        done();
      });
    });
  });
});

describe('ex02 - Robot Factory', () => {
  const robotFactory = require('@student/src/robot_factory');

  describe('01 - Head creation', () => {
    it('should add an head to an empty robot', done => {
      robotFactory.createHead({}, 'circle', 'red', (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'red',
          },
        });
        done();
      });
    });

    it('should add an head to a filled robot', done => {
      robotFactory.createHead({
        body: {
          armor: 'diamond',
        },
      }, 'circle', 'red', (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'red',
          },
          body: {
            armor: 'diamond',
          },
        });
        done();
      });
    });

    it('should handle a robot with already a head', done => {
      robotFactory.createHead({
        head: {
          shape: 'square',
          color: 'green',
        }
      }, 'circle', 'red', (err, robot) => {
        expect(err).not.toBeNull();
        expect(robot).toBeUndefined();
        expect(err.message).toBe('Head already present');
        done();
      });
    });
  });

  describe('02 - Body creation', () => {
    it('should add an body to an empty robot', done => {
      robotFactory.createBody({}, 'netherite', (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          body: {
            armor: 'netherite',
          },
        });
        done();
      });
    });

    it('should add an body to a filled robot', done => {
      robotFactory.createBody({
        head: {
          shape: 'circle',
          color: 'purple',
        },
      }, 'wood', (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'purple',
          },
          body: {
            armor: 'wood',
          },
        });
        done();
      });
    });

    it('should handle a robot with already a body', done => {
      robotFactory.createBody({
        body: {
          armor: 'gold',
        },
      }, 'stone', (err, robot) => {
        expect(err).not.toBeNull();
        expect(robot).toBeUndefined();
        expect(err.message).toBe('Body already present');
        done();
      });
    });
  });

  describe('03 - Maillot de Bain creation', () => {
    it('should add a maillot de bain to an empty robot', done => {
      robotFactory.createMaillotDeBain({
        body: {
          armor: 'netherite',
        },
      }, 'blue', (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          body: {
            armor: 'netherite',
            maillotDeBain: {
              color: 'blue',
            },
          },
        });
        done();
      });
    });

    it('should handle an empty robot', done => {
      robotFactory.createMaillotDeBain({}, 'red', (err, robot) => {
        expect(err).not.toBeNull();
        expect(robot).toBeUndefined();
        expect(err.message).toBe('Body must be present');
        done();
      });
    });

    it('should handle a robot with already a maillot de bain', done => {
      robotFactory.createMaillotDeBain({
        body: {
          armor: 'gold',
          maillotDeBain: {
            color: 'green',
          },
        },
      }, 'white', (err, robot) => {
        expect(err).not.toBeNull();
        expect(robot).toBeUndefined();
        expect(err.message).toBe('Maillot de Bain already present');
        done();
      });
    });
  });
  
  describe('04 - Conveyor belt', () => {
    it('should create a one part robot', done => {
      robotFactory.conveyorBelt({}, [
        (robot, cb) => robotFactory.createHead(robot, 'circle', 'red', cb),
      ], (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'red',
          },
        });
        done();
      });
    });

    it('should create a two parts robot', done => {
      robotFactory.conveyorBelt({}, [
        (robot, cb) => robotFactory.createHead(robot, 'circle', 'red', cb),
        (robot, cb) => robotFactory.createBody(robot, 'diamond', cb),
      ], (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'red',
          },
          body: {
            armor: 'diamond',
          },
        });
        done();
      });
    });

    it('should create a three parts robot', done => {
      robotFactory.conveyorBelt({}, [
        (robot, cb) => robotFactory.createHead(robot, 'circle', 'red', cb),
        (robot, cb) => robotFactory.createBody(robot, 'diamond', cb),
        (robot, cb) => robotFactory.createMaillotDeBain(robot, 'green', cb),
      ], (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({
          head: {
            shape: 'circle',
            color: 'red',
          },
          body: {
            armor: 'diamond',
            maillotDeBain: {
              color: 'green',
            },
          },
        });
        done();
      });
    });

    it('should handle a empty factory', done => {
      robotFactory.conveyorBelt({}, [], (err, robot) => {
        if (err) {
          done(err);
          return;
        }

        expect(robot).toMatchObject({});
        done();
      });
    });

    it('should handle a failed factory', done => {
      robotFactory.conveyorBelt({}, [
        (robot, cb) => robotFactory.createBody(robot, 'diamond', cb),
        (robot, cb) => robotFactory.createHead(robot, 'circle', 'red', cb),
        (robot, cb) => robotFactory.createBody(robot, 'diamond', cb),
        (robot, cb) => robotFactory.createMaillotDeBain(robot, 'green', cb),
      ], (err, robot) => {
        expect(err).not.toBeNull();
        expect(robot).toBeUndefined();
        expect(err.message).toMatch('Body already present');
        done();
      });
    });
  });
});

describe('ex03 - Star Wars', () => {
  const starWars = require('@student/src/star_wars');
  jest.setTimeout(15000);

  describe('01 - Film fetching', () => {
    it('should fetch the first episode', async () => {
      const res = await starWars.fetchFilm('1');

      expect(res).toBeDefined();
      expect(res.url).toBe('https://swapi.co/api/films/1/');
    });

    it('should handle an unknown episode', async () => {
      try {
        await starWars.fetchFilm('lol');
      } catch (e) {}
    });
  });

  describe('02 - Planet fetching', () => {
    it('should fetch the first planet', async () => {
      const res = await starWars.fetchPlanet('1');

      expect(res).toBeDefined();
      expect(res.url).toBe('https://swapi.co/api/planets/1/');
    });

    it('should handle an unknown planet', async () => {
      try {
        await starWars.fetchPlanet('lol');
        fail('should not succeed');
      } catch (e) {}
    });
  });

  describe('03 - Film and Planet fetching', () => {
    it('should fetch and fill the first episode', async () => {
      const res = await starWars.fetchFilmAndPlanets('1');

      expect(res).toBeDefined();
      expect(res.url).toBe('https://swapi.co/api/films/1/');
      expect(res.planets.length).toBe(3);
      
      res.planets.sort((a, b) => a.url.localeCompare(b.url));

      expect(res.planets[0].name).toBe('Tatooine');
      expect(res.planets[1].name).toBe('Alderaan');
      expect(res.planets[2].name).toBe('Yavin IV');
    });

    it('should handle an unknown episode', async () => {
      let res = false;

      try {
        await starWars.fetchFilmAndPlanets('lol');
      } catch (e) {
        res = true;
      }

      expect(res).toBeTruthy();
    });
  });
});

describe('ex04 - Pizzayolo', () => {
  const pizzayolo = require('@student/src/pizzayolo');

  describe('01 - Pizza ordering', () => {
    it('should bake a valid order', async () => {
      const logs = [];
      console.log = (message) => logs.push(message);

      const res = await pizzayolo.orderPizza('1', ['tomato', 'mozzarella', 'mushrooms']);

      expect(res).toMatchObject({
        ingredients: ['tomato', 'mozzarella', 'mushrooms'],
        bakeTime: 1.5,
        ready: true,
      });

      expect(logs.length).toBe(1);
      expect(logs[0]).toBe('One pizza ready for Luke Skywalker!');
    });
  });

  describe('02 - Error handling', () => {
    it('should handle an order without ingredient', async () => {
      try {
        await pizzayolo.orderPizza('1', []);
        fail('should not succeed');
      } catch (e) {
        expect(e.message).toBe('Cannot bake a pizza without ingredients');
      }
    });

    it('should handle an order to an invalid person', async () => {
      try {
        await pizzayolo.orderPizza('lol', ['tomato']);
        fail('should not succeed');
      } catch (e) {
        expect(e.message).toBe('Request failed with status code 404');
      }
    });
  });
});