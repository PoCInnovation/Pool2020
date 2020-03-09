const fs = require('fs');
const { join } = require('path');
const request = require('request-promise');
const { isPortUsed, startAndWaitReady } = require('./utils.js');
const { PROJECT_PATH } = process.env;

expect.extend({
  toBeBadRequest(received) {
    if (received.statusCode === 400 && received.response.body === 'Bad Request') {
      return {
        pass: true,
        message: () => 'Request expected to be a Bad Request'
      };
    }

    return {
      pass: false,
      message: () => `Received a ${received.message} response`,
    };
  },
  toBeNotFound(received) {
    if (received.statusCode === 404 && received.response.body === 'No Message Defined') {
      return {
        pass: true,
        message: () => 'Request expected to be a No Message Defined'
      };
    }

    return {
      pass: false,
      message: () => `Received a ${received.message} response`,
    };
  },
});

describe('ex01 - Basic NodeJS application', () => {
  describe('01 - Application architecture', () => {
    it('should be a package.json file', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should be a package-lock.json file', async () => {
      const path = join(PROJECT_PATH, 'package-lock.json');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should not be a node_modules folder', async () => {
      const path = join(PROJECT_PATH, 'node_modules');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });
  });

  describe('02 - Application information', () => {
    it('should be a main entry', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.main).toEqual('src/index.js');
    });

    it('should be a start script', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.start).toEqual('node src/index.js');
    });
  });
});

describe('ex02 - ESLint', () => {
  describe('01 - ESLint installation', () => {
    it('should be installed in the right scope', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.devDependencies.eslint).toBeDefined();
      expect(packageJson.dependencies.eslint).toBeUndefined();
    });
  });

  describe('02 - ESLint configuration', () => {
    it('should have a .eslintrc.js file', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should extends AirBnB\'s', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      const eslintJs = require(path.includes('/') ? path : `./${path}`);
      expect(eslintJs.extends).toBeDefined();
      expect(eslintJs.extends.includes('airbnb-base')).toBeTruthy();
    });

    it('should use es6 features', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      const eslintJs = require(path.includes('/') ? path : `./${path}`);
      expect(eslintJs.env).toBeDefined();
      expect(eslintJs.env.es6).toBeTruthy();
    });

    it('should be marked to run in node', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      const eslintJs = require(path.includes('/') ? path : `./${path}`);
      expect(eslintJs.env).toBeDefined();
      expect(eslintJs.env.node).toBeTruthy();
    });

    it('should not be marked to run in browser', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      const eslintJs = require(path.includes('/') ? path : `./${path}`);
      expect(eslintJs.env).toBeDefined();
      expect(eslintJs.env.browser === undefined || eslintJs.env.browser === false).toBeTruthy();
    });

    it('should not be a sourceType entry', async () => {
      const path = join(PROJECT_PATH, '.eslintrc.js');
      const eslintJs = require(path.includes('/') ? path : `./${path}`);

      if (eslintJs.parserOptions) {
        expect(eslintJs.parserOptions.sourceType).toBeUndefined();
      }
    });
  });

  describe('03 - Application scripts', () => {
    it('should be a lint script', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.scripts.lint).toEqual('eslint');
    });

    it('should be a lint:format script', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.scripts['lint:format']).toEqual('eslint --fix');
    });
  });
});

describe('ex03 - Hello World', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH);
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - Server presence', () => {
    it('should be running', () => {
      expect(subProcess).toBeDefined();
    });

    it('should listen the 8080 port', async () => {
      await expect(isPortUsed(8080)).resolves.toBeTruthy();
    });
  });

  describe('02 - Route GET \'/hello\'', () => {
    it('should respond world', async () => {
      const res = await request('http://localhost:8080/hello');
      expect(res).toEqual('world');
    });
  });
});

describe('ex04 - Abusing good things', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH, {
      FIXED_MESSAGE: 'For better and for worse',
    });
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - Route GET \'/repeat-my-fixed\'', () => {
    it('should respond a fixed value', async () => {
      await expect(request('http://localhost:8080/repeat-my-fixed'))
        .resolves.toEqual('For better and for worse');
    });
  });

  describe('02 - Route GET \'/repeat-my-query\'', () => {
    it('should respond a valid query', async () => {
      await expect(request('http://localhost:8080/repeat-my-query?message=hello'))
        .resolves.toEqual('hello');
    });

    it('should handle no query', async () => {
      await expect(request('http://localhost:8080/repeat-my-query'))
        .rejects.toBeBadRequest();
    });

    it('should handle a query with a different name', async () => {
      await expect(request('http://localhost:8080/repeat-my-query?notthemessage=hello'))
        .rejects.toBeBadRequest();
    });
  });

  describe('03 - Route POST \'/repeat-my-body\'', () => {
    it('should respond a valid query', async () => {
      await expect(request('http://localhost:8080/repeat-my-body', {
        method: 'POST',
        body: 'world',
        headers: {
          'Content-Type': 'text/plain',
        },
      })).resolves.toEqual('world');
    });

    it('should handle no body', async () => {
      await expect(request('http://localhost:8080/repeat-my-body', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
      })).rejects.toBeBadRequest();
    });
  });

  describe('04 - Route GET \'/repeat-my-header\'', () => {
    it('should respond a valid header', async () => {
      await expect(request('http://localhost:8080/repeat-my-header', {
        headers: {
          'X-Message': 'hello',
        },
      })).resolves.toEqual('hello');
    });

    it('should respond a valid header (uppercase)', async () => {
      await expect(request('http://localhost:8080/repeat-my-header', {
        headers: {
          'X-MESSAGE': 'graou',
        },
      })).resolves.toEqual('graou');
    });

    it('should handle no header', async () => {
      await expect(request('http://localhost:8080/repeat-my-header'))
        .rejects.toBeBadRequest();
    });
  });

  describe('05 - Route GET \'/repeat-my-cookie\'', () => {
    it('should respond a valid cookie', async () => {
      const jar = request.jar();
      const cookie = request.cookie('message=pocpocpoc');
      jar.setCookie(cookie, 'http://localhost:8080');

      await expect(request('http://localhost:8080/repeat-my-cookie', {
        jar,
      })).resolves.toEqual('pocpocpoc');
    });

    it('should handle no cookie', async () => {
      await expect(request('http://localhost:8080/repeat-my-cookie'))
        .rejects.toBeBadRequest();
    });
  });

  describe('06 - Route GET \'/repeat-my-param/:message\'', () => {
    it('should respond a valid param', async () => {
      await expect(request('http://localhost:8080/repeat-my-param/lol'))
        .resolves.toEqual('lol');
    });
  });
});

describe('ex05 - Configuration is the word', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH);
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - DotEnv installation', () => {
    it('should be installed in the right scope', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.dependencies.dotenv).toBeDefined();
      expect(packageJson.devDependencies.dotenv).toBeUndefined();
    });
  });

  describe('02 - Basic security', () => {
    it('should be a env.example file', async () => {
      const path = join(PROJECT_PATH, 'env.example');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should not be a .env file', async () => {
      const path = join(PROJECT_PATH, '.env');
      await expect(fs.promises.access(path)).rejects.toThrow();
    });
  });

  describe('03 - Port listening', () => {
    it('should listen a given port', async () => {
      subProcess.kill('SIGINT');
      subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH, {
        PORT: 8081,
      });

      await expect(isPortUsed(8081)).resolves.toBeTruthy();
    });

    it('should listen a default port', async () => {
      await expect(isPortUsed(8080)).resolves.toBeTruthy();
    });
  });

  describe('04 - Fixed message', () => {
    it('should respond a given message', async () => {
      subProcess.kill('SIGINT');
      subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH, {
        FIXED_MESSAGE: 'Awesome',
      });

      await expect(request('http://localhost:8080/repeat-my-fixed'))
        .resolves.toEqual('Awesome');
    });

    it('should handle no message', async () => {
      await expect(request('http://localhost:8080/repeat-my-fixed'))
        .rejects.toBeNotFound();
    });
  });
});

describe('ex06 - To test is to doubt', () => {
  describe('01 - Jest installation', () => {
    it('should be installed in the right scope', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.devDependencies.jest).toBeDefined();
      expect(packageJson.dependencies.jest).toBeUndefined();
    });
  });

  describe('02 - Jest configuration', () => {
    it('should be a jest.config.js file', async () => {
      const path = join(PROJECT_PATH, 'jest.config.js');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should not be a coverage folder', async () => {
      const path = join(PROJECT_PATH, 'coverage');
      await expect(fs.promises.access(path)).rejects.toThrow();
    });
  });
});

describe('ex07 - Who use plain text?', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH);
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - Route GET \'/repeat-all-my-queries\'', () => {
    it('should handle one query', async () => {
      const res = await request('http://localhost:8080/repeat-all-my-queries?lol=cat');
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([
        {
          key: "lol",
          value: "cat",
        },
      ]);
    });

    it('should handle multiple queries', async () => {
      const res = await request('http://localhost:8080/repeat-all-my-queries?lol=cat&cat=lol');
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([
        {
          key: "lol",
          value: "cat",
        },
        {
          key: "cat",
          value: "lol",
        },
      ]);
    });

    it('should handle no query', async () => {
      const res = await request('http://localhost:8080/repeat-all-my-queries');
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([]);
    });
  });
});

describe('ex08 - JSON everywhere', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH);
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - Route POST \'/are-these-palindromes\'', () => {
    it('should handle one word', async () => {
      const res = await request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify(['meow']),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([
        {
          input: 'meow',
          result: false,
        },
      ]);
    });

    it('should handle multiple words', async () => {
      const res = await request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify(['meow', 'lol']),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([
        {
          input: 'meow',
          result: false,
        },
        {
          input: 'lol',
          result: true,
        },
      ]);
    });

    it('should handle no word', async () => {
      const res = await request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify([]),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([]);
    });

    it('should handle one sentence', async () => {
      const res = await request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify(['hello world this is me']),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resJson = JSON.parse(res);

      expect(resJson).toMatchObject([
        {
          input: 'hello world this is me',
          result: false,
        },
      ]);
    });

    it('should handle a bad JSON body', async () => {
      await expect(request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: '',
        headers: {
          'Content-Type': 'text/plain',
        },
      })).rejects.toBeBadRequest();
    });
  });
});

describe('ex09 - Never trust the user', () => {
  let subProcess;

  beforeEach(async () => {
    subProcess = await startAndWaitReady('npm', ['start'], PROJECT_PATH);
  });

  afterEach(() => {
    subProcess.kill('SIGINT');
  });

  describe('01 - Joi installation', () => {
    it('should be installed in the right scope', async () => {
      const path = join(PROJECT_PATH, 'package.json');
      const packageJson = JSON.parse(await fs.promises.readFile(path));
      expect(packageJson.dependencies['@hapi/joi']).toBeDefined();
      expect(packageJson.devDependencies['@hapi/joi']).toBeUndefined();
    });
  });

  describe('02 - Route POST \'/are-these-palindromes\'', () => {
    it('should handle an object as body', async () => {
      await expect(request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      })).rejects.toBeBadRequest();
    });

    it('should handle an array with multiple types as body', async () => {
      await expect(request('http://localhost:8080/are-these-palindromes', {
        method: 'POST',
        body: JSON.stringify([1, 2, 3, 'sun']),
        headers: {
          'Content-Type': 'application/json',
        },
      })).rejects.toBeBadRequest();
    });
  });
});

describe('ex11 - Remember to keep your code organized', () => {
  describe('01 - Routes architecture', () => {
    it('should be a routes folder', async () => {
      const path = join(PROJECT_PATH, 'src/routes');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should be a routes/route_utils.js file', async () => {
      const path = join(PROJECT_PATH, 'src/routes/route_utils.js');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });

    it('should be a routes/palindrome.js file', async () => {
      const path = join(PROJECT_PATH, 'src/routes/palindromes.js');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });
  });

  describe('02 - Middlewares architecture', () => {
    it('should be a middlewares folder', async () => {
      const path = join(PROJECT_PATH, 'src/middlewares');
      await expect(fs.promises.access(path)).resolves.not.toThrow();
    });
  });
});