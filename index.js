
// get main DIV
const container = d3.select('#container');

// get width/height
let height = container._groups[0][0].offsetHeight;
let width = container._groups[0][0].offsetWidth;
console.log(width, height)

function update() {


// add main SVG
svg = container.selectAll('#svg').data([null])
  .join(
    enter => enter
    .append('svg')
    .attr('id', 'svg')
    .style('background-color', 'none')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewbox', `0 0 ${width} ${height}`),
    update => update
    .attr('viewbox', `0 0 ${width} ${height}`)
  )


  board1('svg');

 
}

update();

d3.timer(updateBoard1)

window.addEventListener('resize', update);

