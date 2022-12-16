const width = 500;
const height = 300;
const data = [23, 12, 34, 45, 7];
//const data = [10, 20, 30, 40, 60, 70];
//const data = [50];
d3.select("body")
  .append("svg")
  .style("width", width)
  .style("height", height)
  .style("background-color", "rgb(250, 250, 250)");

const svg = d3.select("svg");

const scaleX = d3.scaleLinear().domain([-1, data.length]).range([0, width]);
svg
  .append("circle")
  .attr("cx", scaleX(0))
  .attr("cy", height / 2)
  .attr("r", data[0])
  .attr("fill", "black");
svg
  .append("circle")
  .attr("cx", scaleX(1))
  .attr("cy", height / 2)
  .attr("r", data[1])
  .attr("fill", "black");

// binding data
let circles = svg.selectAll("circle").data(data);

circles
  .enter()
  .append("circle")
  .attr("cx", (d, i) => scaleX(i))
  .attr("cy", height / 2)
  .attr("r", (d, i) => d)
  .attr("fill", "red");

circles.exit().remove();

// 2. ii)
// D3.js now automatically creates a new circle for each
// added data point and removes unused dom elements that are no longer present in the data array.
