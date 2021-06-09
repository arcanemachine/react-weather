function SumException(message) {
  this.message = message;
  this.name = 'SumException';
}

const sum = (a, b) => {
  if (typeof(a) !== 'number' || typeof(b) !== 'number') {
    throw TypeError("Inputs must be Numbers")
  }

  return a + b;
};

module.exports = sum;
