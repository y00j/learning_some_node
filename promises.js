function fooBar(n) {
  return new Promise((yes, no) => {
    if (n <= 10) {
      console.log(`number ${n} is good`);
      yes(n + 1);
    } else {
      console.log(`number ${n} is bad`);
      no(n);
    }
  });
}

fooBar(5)
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .then((result) => fooBar(result))
  .catch((error) => console.log(error));

fooBar(6)
  .then((result) => fooBar(result))
  .catch((error) => console.log(error));


// fooBar(2)
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// fooBar(11)
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));