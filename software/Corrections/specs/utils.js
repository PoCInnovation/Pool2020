const { spawn } = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const copydir = require('copy-dir');
const { join } = require('path');
const { PROJECT_PATH } = process.env;

const isPortUsed = (port) => {
  return new Promise((resolve, reject) => {
    const net = require('net')
    const server = net.createServer()
      .once('error', (err) => {
        if (err.code != 'EADDRINUSE') {
          reject(err);
          return;
        }

        resolve(true);
      })
      .once('listening', () => {
        server.once('close', () => {
          resolve(false);
        });

        server.close();
      })
      .listen(port);
  });
}

const startAndWaitReady = (program, args, cwd, env = {}) => {
  return new Promise((resolve, reject) => {
    const finalEnv = Object.assign(env, process.env);

    const subProcess = spawn(program, args, {
      cwd,
      env: finalEnv,
    });

    let dataAccumulated = '';

    const failTimeout = setTimeout(() => {
      subProcess.kill('SIGINT');
      reject();
    }, 5000);

    subProcess.stdout.on('data', (data) => {
      dataAccumulated += data;

      if (dataAccumulated.includes('Ready.')) {
        clearTimeout(failTimeout);
        subProcess.stdout.removeAllListeners();
        resolve(subProcess);
      }
    });
  });
}

const copyStudentProject = () => {
  if (fs.existsSync('node_modules/@student')) {
    console.log('Deleting existing student project...');
    rimraf.sync('node_modules/@student');
  }

  console.log('Copying student project...');
  copydir.sync(PROJECT_PATH, join(__dirname, 'node_modules/@student'), {
    filter: (stat, filepath, filename) => {
      if (stat === 'directory' && filename === '.bin') {
        return false;
      }

      if (stat === 'symbolicLink') {
        return false;
      }

      return true;
    },
  });
};

const resetTemporaryDirectory = () => {
  rimraf.sync(join(__dirname, '@student_tmp'));
  fs.promises.mkdir('@student_tmp');
}

module.exports = { isPortUsed, startAndWaitReady, copyStudentProject, resetTemporaryDirectory };
