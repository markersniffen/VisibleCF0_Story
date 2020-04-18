
function getRandomOffset(d) {
  return d + Math.random() * 10;
}
function board1(id, data) {

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
    .attr('class', 'circle')
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
      .transition(t2)
      .delay(400)
      .style('fill-opacity', 1)
      .style('fill', 'white')
      .attr('y', 0)
      )
  )

console.log('data length: ', data.length)

// add particles
let particles = pad.selectAll('.particles1').data(data)
  .join(
    enter => enter
    .append('circle')
    .attr('class', 'particles1')
    .attr('r', 0)
    .style('fill-opacity', 0)
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .call(
      enter => enter
      .transition(t4)
      .attr('r', d => d.r)
      .style('fill-opacity', 1)
      .style('fill', 'white')
      ),
    update => update,
    exit => exit
      .call(exit => exit
        .transition(t4)
        .style('fill-opacity', 0)
        .attr('r', 10)
        .remove()
      )
    )

  if (state === 0) {

    // calculate particle positions
    data.forEach(d => {
      d.x += d.xVel;
      d.y += d.yVel;
      d.xVel += (Math.random() - 0.5) * .05 + ((d.xAcc - d.x) * Math.random() * .0001);
      d.yVel += (Math.random() - 0.5) * .05 + ((d.yAcc - d.y) * Math.random() * .0001);
    })

    particles.attr('transform', d => `translate(${d.x},${d.y})`)

  } else if (state === 1) {
    particles.transition(t4)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('end', (d,i) => {
        if (i === data.length-1) { clicker() };
      })
  } else {
    particles.transition(t4)
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('end', (d,i) => {
        if (i === data.length-1) { resetState() };
      })
  }
}

