// 3.
import * as d3 from "https://cdn.skypack.dev/d3@7";

const url = "../../data/precos_combustiveis_2018_2019.csv";
d3.csv(url, function (line) {
  return {
    code: +line.code,
    price: +line.price,
    date: new Date(line.date),
  };
}).then(function (table) {
  console.log(table);
});

d3.csv(url, d3.autoType).then(function (table) {
  console.log(table);
});

/*
  You can compare the results by looking at the data types of each field.
  The first method converts the data fields to their respective types using
  explicit type coercion, while the second method uses the d3.autoType function
  to infer the data types from the values in the CSV file.
  
  The advantages of the second method compared to the first method are that it is
  more concise and it handles missing values and different date formats more robustly.
  The disadvantage is that it may not always infer the correct data types, especially
  if the values in the CSV file are not consistently formatted.
  */

// 3. Filter the columns from the resulting table, restricting only to the
// columns: data and price.
d3.csv(url).then(function (table) {
  const filteredTable = table.map(function (row) {
    return {
      data: row.data,
      price: row.price,
    };
  });
  console.log(filteredTable);
});

/* 4. For each line in the data, add dynamically one new attribute called
  “description” with the following value: "In " + linha.data + ", the average
  price of the " + linha.designacao + " was " +
  linha.preco_medio_ponderado".
  a. With D3 and for every datum, create a “p” element whose text
  should be equal to the attribute “description”.
*/
d3.csv(url).then(function (table) {
  table.forEach(function (row) {
    row.description = `In ${row.data}, the average price of the ${row.designacao} was ${row.preco_medio_ponderado}`;
  });

  d3.select("body")
    .selectAll("p")
    .data(table)
    .enter()
    .append("p")
    .text(function (d) {
      return d.description;
    });
});
