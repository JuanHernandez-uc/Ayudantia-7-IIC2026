const WIDTH = 1000;
const HEIGHT = 700;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT);

let puntos = []

function getRandomInt() {
    return Math.floor(Math.random() * 35);
}

for (let i = 0; i < 20; i ++) {
    puntos.push([10 + i * 50, 10 + getRandomInt() * i])
}

svg
   .selectAll("circle")
   .data(puntos)
   .enter()
   .append("circle")
   .attr("cx", (d) => d[0])
   .attr("cy", (d) => d[1])
   .attr("r", 4);

const linea = d3.line();
// linea.curve(d3.curveBasis)
// linea.curve(d3.curveBasisClosed)
// linea.curve(d3.curveBasisOpen)
// linea.curve(d3.curveBundle.beta(0))
// linea.curve(d3.curveCardinal)
// linea.curve(d3.curveMonotoneY)
// linea.curve(d3.curveNatural)
// linea.curve(d3.curveStep)

console.log(linea(puntos))

svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "black")
  .attr("d", linea(puntos));
