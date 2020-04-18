const t2 = d3.transition()
  .duration(200)

const t4 = d3.transition()
  .duration(400)

const t6 = d3.transition()
  .duration(600)

const t8 = d3.transition()
  .duration(800)


let d_particle1 = d3.range(400).map(() => { 
  return { 
    x: 0, 
    y: 0,
    xVel: 0,
    yVel: 0,
    xAcc: 0,
    yAcc: 0,
    r: 1 
    }
  })

let d_particle2 = d3.range(Math.floor(1*100)).map(() => {
  return {
    x: Math.random() * 800,
    y: 200,
    r: 1
  }
})

