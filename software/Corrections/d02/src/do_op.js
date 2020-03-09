const doOp = (a, op, b, cb) => {
  let res;

  if (typeof a !== 'number' || typeof b !== 'number') {
    cb(new Error('Bad number'));
    return;
  }

  if (!['+', '-', '*', '/', '%'].includes(op)) {
    cb(new Error('Bad operator'));
    return;
  }

  switch (op) {
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/':
      if (b == 0) {
        cb(new Error('Division by 0'));
        return;
      }

      res = a / b;
      break;
    case '%':
      if (b == 0) {
        cb(new Error('Division by 0'));
        return;
      }

      res = a % b;
      break;
  }

  cb(null, res);
};

module.exports = doOp;
