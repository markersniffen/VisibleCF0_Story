
function particleGen(w, h, count) { 
  let particles = [];
  for (i=0; i<count; i++) {
    particles.push( { x: Math.random()*width, y: Math.random()*height, r: Math.random()/.7 + 1 } )
  }
  return particles
}

function getRandomOffset(d) {
  return d + Math.random() * 10;
}

function board1(id) {

  const svg = d3.select(`#${id}`);

  width = +svg.style('width').slice(0, -2),
  height = +svg.style('height').slice(0, -2),
  padLeft = 0,
  padRight = 0,
  padBottom = 0,
  padTop = 0;
  innerWidth = width - padLeft - padRight;
  innerHeight = height - padTop - padBottom;
  
// setup padded group
let pad = svg.selectAll('#pad').data([null])
.join('g')
.attr('id', 'pad')
.attr('transform', `translate(${padLeft}, ${padTop})`)

// setup centered group
let center = svg.selectAll('#center').data([null])
.join('g')
.attr('id', 'center')
.attr('transform', `translate(${width/2},${height/2})`)


// setup centered layers layers
let layers = center.selectAll('.layer').data(['0', '1'])
.join('g')
.attr('class', 'layer')
.attr('id', d => `l${d}`)

let bg = svg.select('#l0')
let l1 = svg.select('#l1')



// welcome animation

// add circle
l1.selectAll('.circle').data([null])
  .join(
    enter => enter
    .append('circle')
    .attr('r', 40)
    .style('fill-opacity', 0)
    .call(
      enter => enter
      .transition(t8)
      .attr('r', 100)
      .style('fill-opacity', 1)
      .style('fill', 'steelblue')
      )
  )
  


// add welcome text

l1.selectAll('.largeText').data(['Welcome!'])
  .join(
    enter => enter
    .append('text')
    .attr('class', 'largeText')
    .text(d => d)
    .style('fill-opacity', 0)
    .attr('y', 10)
    .call(
      enter => enter
      .transition(t6)
      .delay(400)
      .style('fill-opacity', 1)
      .style('fill', 'white')
      .attr('y', 0)
      )
  )

// add particles

let particles = pad.selectAll('.particles1').data(particleGen(width, height, 100))
  .join(
    enter => enter
    .append('circle')
    .attr('class', 'particles1')
    .attr('r', 0)
    .style('fill-opacity', 0)
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .call(
      enter => enter
      .transition(t8)
      .delay(200)
      .attr('r', d => d.r)
      .style('fill-opacity', 1)
      .style('fill', 'white')
      )
  )

console.log(particles)
}

function updateBoard1() {

  console.log('updating!!')

  let particles = d3.selectAll('.particles1')
  particles.forEach(d => {
    .style('fill', 'red')
  }
}

