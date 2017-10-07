const double = (inp) => inp * 2;
const tripple = (inp) => inp * 3;

const test = {
  gvltonight: {
    foo: 'bar',
    bar: 10,
    data: (input) => [double(input), tripple(input)],
  },
};

module.exports = test;
