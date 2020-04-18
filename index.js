
//
let state = 0;


// get main DIV
const container = d3.select('#container');

// get width/height
let height = container._groups[0][0].offsetHeight;
let width = container._groups[0][0].offsetWidth;
console.log(width, height)


d_particle1.forEach(d => { 
  d.x = Math.random() * width; 
  d.y = Math.random() * height;
  d.xAcc = d.x;
  d.yAcc = d.y;
   })


function render() {

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
  if (state > 1) {
    board1('svg', d_particle2);
  } else {
    board1('svg', d_particle1);
  }
}

function resetState() {
  state = 0;
  myTimer.restart(timer);
}

myScaleX = d3.scaleLinear().domain([0, 400]).range([-100, 100])
myScaleY = d3.scaleLinear().domain([0, 400]).range([100, -100])

function clicker() {
  d_particle2 = d3.range(Math.floor(400)).map((i) => {
    return {
      x: 130 * Math.cos(i) + 400,
      y: 130 * Math.sin(i) + 200,
      r: 1
    }
  })

  if (state === 0) { 
    myTimer.stop()
    state = 1; 
    board1('svg', d_particle2);
  } else if (state === 1) {
    state = 2;
  } else if (state === 2) {
    board1('svg', d_particle1)
  }
  console.log(state)
}

function timer() {
    board1('svg', d_particle1)
}

render();

let myTimer = d3.timer(timer)
console.log(myTimer)

window.addEventListener('resize', render);


