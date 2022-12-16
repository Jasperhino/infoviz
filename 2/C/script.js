d3.csv("../../data/precos_combustiveis_2018_2019.csv").then(onDataLoaded);

function onDataLoaded(table) {
  console.log(table);

  // Add elements to svg
  var g = svg.append("G");
  svg
    .selectAll("circle")
    .data(table)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => d.preco_medio_ponderado * 200)
    .attr("cy", height / 2)
    .attr("r", (d, i) => d.preco_medio_ponderado * 20)
    .attr("fill", (d, i) => (d.preco_medio_ponderado < 1 ? "blue" : "red"));
}

const [width, height] = [500, 500];
var svg = d3
  .select("body")
  .append("svg")
  .attr("class", "canvas")
  .attr("width", width)
  .attr("height", height);
