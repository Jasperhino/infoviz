// 1. Write a script in Javascript that prints
// “Hello World” 10 times in the console.
for (let i = 0; i < 10; i++) {
  console.log("Hello World");
}

// 2. Create a function that receives two variables and prints the value of their sum and of their product.
function printSumAndProduct(x, y) {
  console.log(`The sum of ${x} and ${y} is ${x + y}`);
  console.log(`The product of ${x} and ${y} is ${x * y}`);
}

// Example usage:
printSumAndProduct(2, 3); // The sum of 2 and 3 is 5. The product of 2 and 3 is 6.

// 3. Create another function that returns the highest value
// from two variables.Print the result.
function getMax(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

// Example usage:
const max = getMax(2, 3); // 3
console.log(max);

// 4. Write a script that adds the elements of an array of integers
// and prints the result.
const numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

console.log(`The sum of the numbers is ${sum}`);

// 5. Create a function that receives as input an array of strings and as
// output returns an array alphabetically ordered.
function sortStrings(strings) {
  return strings.sort();
}

// Example usage:
const sortedStrings = sortStrings(["c", "a", "b"]); // ['a', 'b', 'c']
console.log(sortedStrings);

// 5. a) Update the previous function so it can print an array that
// contains only the unique strings of the input array
function sortUniqueStrings(strings) {
  const uniqueStrings = [...new Set(strings)];
  return uniqueStrings.sort();
}

// Example usage:
const sortedUniqueStrings = sortUniqueStrings(["c", "a", "b", "c"]); // ['a', 'b', 'c']
console.log(sortedUniqueStrings);
