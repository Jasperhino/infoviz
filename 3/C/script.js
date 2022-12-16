const url = "../../data/cereal.csv";
d3.csv(url, d3.autoType).then(useData);

function useData(data) {
  // 1. Compute the mean rating of the cereals without using method d3.mean()
  const ratings = data.map((d) => +d.rating);
  const meanRating =
    ratings.reduce(function (a, b) {
      return a + b;
    }) / ratings.length;
  console.log("meanRating", meanRating);

  // 2.Compute the mean sugar of the cereals
  const sugars = data.map((d) => +d.sugars);
  const meanSugar = d3.mean(sugars);
  console.log("meanSugar", meanSugar);

  // 3. Compute the median for sugar
  const medianSugar = d3.median(sugars);
  console.log("medianSugar", medianSugar);

  // 4. Compare it with the mean
  console.log("meanSugar - medianSugar", meanSugar - medianSugar);

  // 5.Compute the mode for the “proteins” attribute.
  const proteins = data.map((d) => +d.protein);
  const modeProteins = d3.mode(proteins);
  console.log("modeProteins", modeProteins);

  // 6. Find the quartiles for the rating score.

  const q1 = d3.quantile(ratings, 0.25);
  const q2 = d3.quantile(ratings, 0.5);
  const q3 = d3.quantile(ratings, 0.75);

  console.log("quartiles", [q1, q2, q3]);

  // 7. Determine the minimum and maximum values for rating
  const minRating = d3.min(ratings);
  const maxRating = d3.max(ratings);
  console.log("minRating, maxRating", minRating, maxRating);
}
