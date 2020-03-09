const fs = require('fs');
const uuid = require('uuid/v4');

class MyDB {
  db = {};

  constructor(db) {
    this.db = db;
  }

  createUser(firstname, lastname) {
    if (!this.db.users) {
      this.db.users = [];
    }

    const existing = this.db.users.find((user) =>
      user.firstname === firstname &&
      user.lastname === lastname
    );

    if (existing) {
      throw new Error('A user with the same name already exists');
    }

    const user = {
      id: uuid(),
      firstname,
      lastname,
    };

    this.db.users.push(user);
    return user;
  }

  getUser(id) {
    if (!this.db.users) {
      throw new Error(`User with id ${id} not found`);
    }

    const existing = this.db.users.find((user) => user.id === id);

    if (!existing) {
      throw new Error(`User with id ${id} not found`);
    }

    return existing;
  }

  updateUser(id, firstname, lastname) {
    if (!this.db.users) {
      throw new Error(`User with id ${id} not found`);
    }

    const existingIndex = this.db.users.findIndex((user) => user.id === id);

    if (existingIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    this.db.users[existingIndex].firstname = firstname;
    this.db.users[existingIndex].lastname = lastname;
    return this.db.users[existingIndex];
  }

  deleteUser(id) {
    if (!this.db.users) {
      throw new Error(`User with id ${id} not found`);
    }

    this.db.users = this.db.users.filter((user) => user.id !== id);

    if (this.db.accounts) {
      this.db.accounts = this.db.accounts.filter((account) => account.ownerId !== id);
    }
  }

  createAccount(owner, initialBalance) {
    if (!this.db.accounts) {
      this.db.accounts = [];
    }

    if (!this.db.users) {
      throw new Error(`User with id ${owner.id} not found`);
    }

    const ownerIndex = this.db.users.findIndex((user) => user.id === owner.id);

    if (ownerIndex === -1) {
      throw new Error(`User with id ${owner.id} not found`);
    }

    const account = {
      id: uuid(),
      ownerId: owner.id,
      balance: initialBalance,
    };

    this.db.accounts.push(account);
    return account;
  }

  getAccount(id) {
    if (!this.db.accounts) {
      throw new Error(`Account with id ${id} not found`);
    }

    const existing = this.db.accounts.find((account) => account.id === id);

    if (!existing) {
      throw new Error(`Account with id ${id} not found`);
    }

    return existing;
  }

  creditAccount(id, amount) {
    if (!this.db.accounts) {
      throw new Error(`Account with id ${id} not found`);
    }

    const existingIndex = this.db.accounts.findIndex((account) => account.id === id);

    if (existingIndex === -1) {
      throw new Error(`Account with id ${id} not found`);
    }

    this.db.accounts[existingIndex].balance += amount;
    return this.db.accounts[existingIndex];
  }

  withdrawAccount(id, amount) {
    if (!this.db.accounts) {
      throw new Error(`Account with id ${id} not found`);
    }

    const existingIndex = this.db.accounts.findIndex((account) => account.id === id);

    if (existingIndex === -1) {
      throw new Error(`Account with id ${id} not found`);
    }

    this.db.accounts[existingIndex].balance -= amount;
    return this.db.accounts[existingIndex];
  }

  deleteAccount(id) {
    if (!this.db.accounts) {
      throw new Error(`Account with id ${id} not found`);
    }

    this.db.accounts = this.db.accounts.filter((account) => account.id !== id);
  }

  async save(path) {
    const json = JSON.stringify(this.db);
    return fs.promises.writeFile(path, json);
  }

  static async load(path) {
    const content = await fs.promises.readFile(path);
    const json = JSON.parse(content);

    return new MyDB(json);
  }
}

module.exports = MyDB;