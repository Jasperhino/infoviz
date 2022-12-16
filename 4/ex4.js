const url = "../../data/precos_combustiveis_2018_2019.csv";

const width = 1200,
  height = 600;

// create svg container
let svg = d3
  .select("#viz_container")
  .append("svg")
  .attr("class", "graphicCanvas")
  .attr("width", width)
  .attr("height", height);

// load data
d3.csv(url).then(loadAndParseData);

function loadAndParseData(dataset) {
  dataset.forEach(function (item) {
    item["data"] = new Date(item["data"]);
    item["codigo"] = +item["codigo"];
    item["preco_medio_ponderado"] = +item["preco_medio_ponderado"];
    item["weekday"] = item["data"].toLocaleString("default", {
      weekday: "short",
    });
  });

  displayGraphic(dataset);
}

function displayGraphic(data) {
  // START | scale functions - to be implemented by students.
  // You can consult the documentation at https://www.d3indepth.com/scales/
  console.log(data.length);
  console.log(data[10223]);
  // 1. Continuous to continuous #####
  let precosDomain = getMinMax(data, "preco_medio_ponderado");

  // 1.1 linear transformation
  const linScale = d3
    .scaleLinear()
    .domain(precosDomain) // precos minimos e maximos
    .range([0.1, 3]); // size of the circles

  // 1.2 log transformation – use precoLog column for that
  const logScale = d3.scaleLog().domain(precosDomain).range([0.1, 3]);

  // 1.3 date/time transformation – scaleTime()
  const timeScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.data))
    .range([0, width]);

  // 1.4 scale sequential - numeric variable to color (use a color interpolator)
  const colorScale = d3
    .scaleSequential()
    .domain(precosDomain)
    .interpolator(d3.interpolateViridis);

  // 2. Continuous to discrete (discretization) ######
  // 2.1 continuous value to categories (can be colors or other appropriate visual variables) - scale quantize
  const quantizeScale = d3
    .scaleQuantize()
    .domain(precosDomain)
    .range(["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6"]);

  // 2.2 similar but using scale quantile
  const quantileScale = d3
    .scaleQuantile()
    .domain(precosDomain)
    .range(["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6"]);

  // 2.3 similar but using thresholds
  const thresholdScale = d3
    .scaleThreshold()
    .domain([0.1, 0.2, 0.3, 0.4, 0.5])
    .range(["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]);

  // 3. Discrete to discrete
  // 3.1. map months to three colors - each season the colors should repeat (eg, {Dec, Jan, Feb} > {red, green, blue}, {Mar, Apr, May} > {red, green, blue}) - (use ordinal scale)
  const ordinalScale = d3
    .scaleOrdinal()
    .domain([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ])
    .range(["red", "green", "blue"]);

  // 3.2 using scalePoint() function map days of week to a X axis, retaining the Y position random
  const pointScale = d3
    .scalePoint()
    .domain(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    .range([0, width]);

  const sizeScale = logScale;
  // END | scale functions
  // You can experiment using other geometric elements and properties
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return pointScale(d.weekday);
    })
    .attr("cy", function () {
      return randomPosition(0, height);
    })
    .attr("r", function (d) {
      return sizeScale(d.preco_medio_ponderado);
    })
    //.attr("fill", (d) => colorScale(d.preco_medio_ponderado));
    //.attr("fill", (d) => quantizeScale(d.preco_medio_ponderado));
    //.attr("fill", (d) => quantileScale(d.preco_medio_ponderado));
    //.attr("fill", (d) => thresholdScale(d.preco_medio_ponderado));
    .attr("fill", (d) =>
      ordinalScale(d.data.toLocaleString("default", { month: "short" }))
    );
}

// use this function or the d3.extent
function getMinMax(data, column) {
  return [
    d3.min(data, function (d) {
      return d[column];
    }),
    d3.max(data, function (d) {
      return d[column];
    }),
  ];
}

// random number between minP (inclusive) and maxP (exclusive)
function randomPosition(minP, maxP) {
  return minP + Math.floor(Math.random() * maxP);
}
