const WIDTH = 1000;
const HEIGHT = 300;

const margin = {
    top: 70,
    bottom: 30,
    right: 30,
    left: 50,
};

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

const contenedorEjeY = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEjeX = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHT - margin.bottom})`);

const contenedorBarras = svg
    .append("g")
    .attr("transform", `translate(${margin.left} ${margin.top})`);

const contenedorLeyenda = svg
    .append("g")

function joinDeDatos(data) {
    //console.log(data)

    let stackGen = d3.stack()
        .keys(["Javascript", "Ruby", "Python", "Java", "C"])
    
    let stackData = stackGen(data)

    console.log(stackData)

    const escalaX = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, WIDTH - margin.left - margin.right])
        .padding(0.3)

    let max = d3.max(stackData, d => d3.max(d, subArreglo => subArreglo[1]))
    
    const escalaY = d3.scaleLinear()
        .domain([0, max])
        .range([HEIGHT - margin.top - margin.bottom, 0]);

    const ejeX = d3.axisBottom(escalaX);
    const ejeY = d3.axisLeft(escalaY);
    
    contenedorEjeX
        .call(ejeX)
    
    contenedorEjeY
        .call(ejeY)

    const color = d3.scaleOrdinal()
        .domain(["Javascript", "Ruby", "Python", "Java", "C"])
        .range(["yellow", "red", "blue", "orange", "lightblue"])

    contenedorBarras
        .selectAll("g")
        .data(stackData)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", (d, i) => escalaX(i))
        .attr("y", d => escalaY(d[1]))
        .attr("width", escalaX.bandwidth())
        .attr("height", d => escalaY(d[0]) - escalaY(d[1]))
    
    contenedorLeyenda
        .append("rect")
        .attr("x", 895)
        .attr("y", 0)
        .attr("height", 100)
        .attr("width", 105)
        .attr("fill", "#aaaaaa")
        .attr("stroke", "black")

    contenedorLeyenda
        .selectAll("ellipse")
        .data(stackData)
        .join("ellipse")
        .attr("cx", 910)
        .attr("cy", (d, i) => 10 + (i * 20))
        .attr("rx", 5)
        .attr("ry", 3)
        .attr("fill", d => color(d.key))
    
    contenedorLeyenda
        .selectAll("text")
        .data(stackData)
        .join("text")
        .attr("x", 925)
        .attr("y", (d, i) => 15 + (i * 20))
        .attr("fill", d => color(d.key))
        .attr("font-weight", 600)
        .text(d => d.key)
} 

function toInt(d) {
    let data = {
        year: +d.year,
        Javascript: +d.Javascript,
        Ruby: +d.Ruby,
        Python: +d.Python,
        Java: +d.Java,
        C:  +d.C
    }

    return data
}

d3.csv("../issues_stack.csv", toInt)    
    .then(datos => joinDeDatos(datos))
    .catch(error => console.log(error));
