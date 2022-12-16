d3.csv("../../data/cereal.csv", d3.autoType).then(useData);

function useData(data) {
  console.log(data);
  // 1
  const relative_mfrs = d3.rollup(
    data,
    (d) => (d.length / data.length) * 100,
    (d) => d.mfr
  );
  console.log("Relative", relative_mfrs);

  const mfrs = d3.rollup(
    data,
    (d) => d.length,
    (d) => d.mfr
  );
  const biggest_mfr = d3.greatest(mfrs, (d) => d[1]);

  console.log(mfrs);
  console.log(biggest_mfr);

  const relative_cereal_mfrs = d3.rollup(
    d3.filter(data, (d) => d.mfr === biggest_mfr[0]),
    (d) => d.length / data.length,
    (d) => d.mfr
  );

  console.log(relative_cereal_mfrs);

  createDotPlot(data);
  createHistogram(data);
}

function createDotPlot(data) {
  const width = 500;
  const height = 500;

  const grouped = d3
    .groups(data, (d) => d.calories)
    .sort((a, b) => a[0] - b[0]);
  console.log("grouped", grouped);

  const mean = d3.mean(data, (d) => d.calories);
  console.log("mean", mean);
  const median = d3.median(data, (d) => d.calories);
  console.log("median", median);
  const std = d3.deviation(data, (d) => d.calories);
  console.log("std", std);

  const extent = d3.extent(data, (d) => d.calories);

  const scaleX = d3.scaleLinear().domain(extent).range([0, width]);

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  // Add dots
  svg
    .selectAll("g")
    .data(grouped)
    .join("g")
    .attr("transform", (d, i) => `translate(${scaleX(d[0])}, 0)`)
    .selectAll("circle")
    .data((d) => d[1])
    .join("circle")
    .attr("cx", 0)
    .attr("cy", (d, i) => height - i * 5)
    .attr("r", 2)
    .style("fill", "#69b3a2");
}

function createHistogram(data) {
  const width = 500;
  const height = 500;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.calories)])
    .range([0, width]);

  // set the parameters for the histogram
  const hist = d3
    .histogram()
    .value((d) => d.calories)
    .domain(x.domain())
    .thresholds(x.ticks(10));
  const bins = hist(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear().range([height, 0]);
  y.domain([0, d3.max(bins, (d) => d.length)]); // d3.hist has to be called before the Y axis obviously
  svg.append("g").call(d3.axisLeft(y));

  svg
    .append("g")
    .attr("transform", `translate(0, ${height}`)
    .call(d3.axisBottom(x));

  // append the bar rectangles to the svg element
  svg
    .selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0);
    })
    .attr("height", function (d) {
      return height - y(d.length);
    });
}

// 3. c)
// The distribution seems to be a normal distribution.
// The mean is around 106 and the standard deviation is around 20.
// The distribution is skewed to the right.
