const sqlite3 = require('sqlite3').verbose();

class MyLiteDB {
  db = null;

  constructor(db) {
    this.db = db;
    this.init();
  }

  init() {
    this.db.run(
      "CREATE TABLE IF NOT EXISTS users (" + 
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "firstname VARCHAR(255) NOT NULL, " +
        "lastname VARCHAR(255) NOT NULL, " +
        "UNIQUE(firstname, lastname)" +
      ")",
    );

    this.db.run(
      "CREATE TABLE IF NOT EXISTS accounts (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "owner_id INTEGER NOT NULL, " +
        "balance INTEGER NOT NULL, " +
        "FOREIGN KEY(owner_id) REFERENCES users(id)" + 
      ")",
    );
  }

  createUser(firstname, lastname) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("INSERT INTO users (firstname, lastname) VALUES (?, ?)");
      stmt.run(firstname, lastname, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve({
          firstname,
          lastname,
        });
      });
    });
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("SELECT users (id, firstname, lastname) WHERE id = ?");
      stmt.get(id, (err, row) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      });
    });
  }

  updateUser(id, firstname, lastname) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("UPDATE users SET firstname = ?, lastname = ? WHERE id = ?");
      stmt.run(firstname, lastname, id, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
      stmt.run(id, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  createAccount(owner, initialBalance) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("INSERT INTO accounts (owner_id, balance) VALUES (?, ?)");
      stmt.run(owner.id, initialBalance, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  getAccount(id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('SELECT accounts (owner_id, balance) WHERE id = ?');
      stmt.get(id, (err, row) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      });
    });
  }

  creditAccount(id, amount) {
    return new Promise(async (resolve, reject) => {
      const account = await this.getAccount(id);
      const stmt = this.db.prepare('UPDATE accounts SET balance = ? WHERE id = ?');
      stmt.run(account.balance + amount, id, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  withdrawAccount(id, amount) {
    return new Promise(async (resolve, reject) => {
      const account = await this.getAccount(id);
      const stmt = this.db.prepare('UPDATE accounts SET balance = ? WHERE id = ?');
      stmt.run(account.balance - amount, id, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  deleteAccount(id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('DELETE FROM accounts WHERE id = ?');
      stmt.run(id, (err) => {
        stmt.finalize();

        if (err) {
          reject(err);
          return;
        }

        resolve();
      })
    })
  }

  close() {
    this.db.close();
  }

  static load(path) {
    return new Promise((resolve) => {
      const db = new sqlite3.Database(path);
      db.serialize(() => {
        resolve(new MyLiteDB(db));
      });
    });
  }
}

module.exports = MyLiteDB;