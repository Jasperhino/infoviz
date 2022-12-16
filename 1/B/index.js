// 1. a) Print each line of the CSV file while loading the data using the
import * as d3 from "https://cdn.skypack.dev/d3@7";

const url = "../../data/precos_combustiveis_2018_2019.csv";
d3.csv(url, function (line) {
  console.log(line);
});

// 1. b) b. Print all data after the CSV file loading is finished
d3.csv(url).then(function (table) {
  console.log(table);
});

/* 2.
   a)
    The principal differences between the results obtained by each method are:
    - The first method prints each line of the CSV file as it is being loaded,
    while the second method waits for the CSV file to be fully loaded before printing the data.
    - The first method does not return a value, while the second method returns a promise that
    resolves with the data from the CSV file.

  b)
    The use of the first method would be to perform some action on each line of
    the CSV file as it is being loaded, for example, to display a loading indicator or to validate the data.

  c)
    The principal use of the second method would be to perform some action on the data after it has been 
    loaded, for example, to display the data in a table or to perform some calculations on the data.
  d)
  The CSV header is present in the results of both methods.

*/
