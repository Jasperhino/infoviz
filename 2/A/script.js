d3.selectAll("h3").style("color", "blue");
d3.select("body").append("h3").text("Another <h3> with d3");
d3.selectAll("h3").style("color", "black");
d3.select("h3").style("color", "blue");

// Select the first h3 tag in document an add the id #first to it
d3.select("h3").attr("id", "first");
// Select the tag with the id #first and set a style property to underline the text
d3.select("#first").style("text-decoration", "underline");

const width = 500;
const height = 300;
const rectWidth = 30;

// Add svg tag to body and set width and height
d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "lightgray");

// Draw a circle in the svg tag
d3.select("svg")
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", height / 2)
  .style("fill", "gray");

// Draw two rectangles in the svg tag
d3.select("svg")
  .append("rect")
  .attr("x", width / 2 - rectWidth / 2)
  .attr("y", 0)
  .attr("width", rectWidth)
  .attr("height", height)
  .style("fill", "#ff0060");

// Draw a circle in the svg tag with stroke of 2px
d3.select("svg")
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", height / 4)
  .style("fill", "gray")
  .style("stroke", "white")
  .style("stroke-width", "4px");
