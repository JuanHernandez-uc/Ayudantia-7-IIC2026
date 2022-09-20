// Tablero de ajedrez después de la 13ava jugada negra, Magnus Carlsen vs Hans Moke (07-2022)
// https://www.chessgames.com/perl/chessgame?gid=2372960 

const tableroSinColor = [
    {X: 0, Y: 0, pieza: "T", color: "B"},
    {X: 1, Y: 0, pieza: null, color: null},
    {X: 2, Y: 0, pieza: null, color: null},
    {X: 3, Y: 0, pieza: "T", color: "B"},
    {X: 4, Y: 0, pieza: null, color: null},
    {X: 5, Y: 0, pieza: null, color: null},
    {X: 6, Y: 0, pieza: "K", color: "B"},
    {X: 7, Y: 0, pieza: null, color: null},
    {X: 0, Y: 1, pieza: null, color: null},
    {X: 1, Y: 1, pieza: null, color: null},
    {X: 2, Y: 1, pieza: null, color: null},
    {X: 3, Y: 1, pieza: null, color: null},
    {X: 4, Y: 1, pieza: "P", color: "B"},
    {X: 5, Y: 1, pieza: "P", color: "B"},
    {X: 6, Y: 1, pieza: "A", color: "B"},
    {X: 7, Y: 1, pieza: "P", color: "B"},
    {X: 0, Y: 2, pieza: "P", color: "B"},
    {X: 1, Y: 2, pieza: null, color: null},
    {X: 2, Y: 2, pieza: "P", color: "B"},
    {X: 3, Y: 2, pieza: null, color: null},
    {X: 4, Y: 2, pieza: null, color: null},
    {X: 5, Y: 2, pieza: "C", color: "B"},
    {X: 6, Y: 2, pieza: "P", color: "B"},
    {X: 7, Y: 2, pieza: null, color: null},
    {X: 0, Y: 3, pieza: null, color: null},
    {X: 1, Y: 3, pieza: null, color: null},
    {X: 2, Y: 3, pieza: "Q", color: "B"},
    {X: 3, Y: 3, pieza: null, color: null},
    {X: 4, Y: 3, pieza: null, color: null},
    {X: 5, Y: 3, pieza: null, color: null},
    {X: 6, Y: 3, pieza: null, color: null},
    {X: 7, Y: 3, pieza: null, color: null},
    {X: 0, Y: 4, pieza: null, color: null},
    {X: 1, Y: 4, pieza: null, color: null},
    {X: 2, Y: 4, pieza: null, color: null},
    {X: 3, Y: 4, pieza: null, color: null},
    {X: 4, Y: 4, pieza: "P", color: "N"},
    {X: 5, Y: 4, pieza: null, color: null},
    {X: 6, Y: 4, pieza: "A", color: "B"},
    {X: 7, Y: 4, pieza: null, color: null},
    {X: 0, Y: 5, pieza: null, color: null},
    {X: 1, Y: 5, pieza: null, color: null},
    {X: 2, Y: 5, pieza: "C", color: "N"},
    {X: 3, Y: 5, pieza: null, color: null},
    {X: 4, Y: 5, pieza: "A", color: "N"},
    {X: 5, Y: 5, pieza: "C", color: "N"},
    {X: 6, Y: 5, pieza: null, color: null},
    {X: 7, Y: 5, pieza: "P", color: "N"},
    {X: 0, Y: 6, pieza: "P", color: "N"},
    {X: 1, Y: 6, pieza: "P", color: "N"},
    {X: 2, Y: 6, pieza: null, color: null},
    {X: 3, Y: 6, pieza: null, color: null},
    {X: 4, Y: 6, pieza: null, color: null},
    {X: 5, Y: 6, pieza: "P", color: "N"},
    {X: 6, Y: 6, pieza: "P", color: "N"},
    {X: 7, Y: 6, pieza: null, color: null},
    {X: 0, Y: 7, pieza: "T", color: "N"},
    {X: 1, Y: 7, pieza: null, color: null},
    {X: 2, Y: 7, pieza: null, color: null},
    {X: 3, Y: 7, pieza: "Q", color: "N"},
    {X: 4, Y: 7, pieza: null, color: null},
    {X: 5, Y: 7, pieza: "T", color: "N"},
    {X: 6, Y: 7, pieza: "K", color: "N"},
    {X: 7, Y: 7, pieza: null, color: null},
]

const tablero = tableroSinColor.map(d => {
    let copy = { ...d }
    if (copy.Y % 2 != 0) {
        if (copy.X % 2 == 0) {
            copy.colorCasilla = "C"
        } else {
            copy.colorCasilla = "O"
        }
    } else {
        if (copy.X % 2 != 0) {
            copy.colorCasilla = "C"
        } else {
            copy.colorCasilla = "O"
        }
    }
    return copy;
})

const WIDTH = 640;
const HEIGHT = 640;

const escalaX = d3.scaleLinear()
    .domain([0, 8])
    .range([0, WIDTH]);

const escalaY = d3.scaleLinear()
    .domain([0, 8])
    .range([HEIGHT, 0]);

// const escalaX = d3.scaleBand()
//     .domain([0, 1, 2, 3, 4, 5, 6, 7])
//     .range([0, WIDTH]);

// const escalaY = d3.scaleBand()
//     .domain([0, 1, 2, 3, 4, 5, 6, 7])
//     .range([HEIGHT, 0]);


const colorCasillas = d3.scaleOrdinal()
    .domain(["C", "O"])
    .range(["#cc9966", "#ffcc99"])

const colorPiezas = d3.scaleOrdinal()
    .domain(["B", "N"])
    .range(["white", "black"])

const codigoPiezas = d3.scaleOrdinal()
    .domain(["K", "Q", "A", "C", "T", "P", null])
    .range(["\u2654", "\u2655", "\u2657", "\u2658", "\u2656", "\u2659", ""])

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .style("border", "1px solid black");

const anchoCasilla = (WIDTH) / 8
const alturaCasilla = (HEIGHT) / 8

svg
    .selectAll("rect")
    .data(tablero)
    .join("rect")
    .attr("x", d => escalaX(d.X))
    .attr("y", d => escalaX(d.Y))
    .attr("fill", d => colorCasillas(d.colorCasilla))
    .attr("width", anchoCasilla)
    .attr("height", anchoCasilla)

svg
    .selectAll("text")
    .data(tablero)
    .join("text")
    .attr("x", d => escalaX(d.X) + (anchoCasilla / 2))
	.attr("y", d => escalaY(d.Y) - (alturaCasilla / 2))
    .attr("fill", d => colorPiezas(d.color))
    .text(d => codigoPiezas(d.pieza))
    .style("font-size", "60px")
    .style("text-anchor", "middle")   
    .style("dominant-baseline", "mathematical")


// svg
//     .selectAll("rect")
//     .data(tablero)
//     .join("rect")
//     .attr("x", d => escalaX(d.X))
//     .attr("y", d => escalaX(d.Y))
//     .attr("fill", d => colorCasillas(d.colorCasilla))
//     .attr("width", escalaX.bandwidth())
//     .attr("height", escalaY.bandwidth())

// svg
//     .selectAll("text")
//     .data(tablero)
//     .join("text")
//     .attr("x", d => escalaX(d.X) + escalaX.bandwidth() / 2)
//     .attr("y", d => escalaY(d.Y) + escalaY.bandwidth() / 2)
//     .attr("fill", d => colorPiezas(d.color))
//     .text(d => codigoPiezas(d.pieza))
//     .style("font-size", "60px")
//     .style("dominant-baseline", "mathematical")   
//     .style("text-anchor", "middle")    
	
    



