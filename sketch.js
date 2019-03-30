// A dynamic view of the Venus pentagram
// Semidan Robaina Estevez, 2019


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frame_rate = 30
  frameRate(frame_rate);
  trail = [];
  x = windowWidth / 2;
  y = windowHeight / 2.3;
  s = min(windowWidth, windowHeight) / 60;
  r_earth_sun = 12 * s;
  r_venus_sun = 0.723 * r_earth_sun;
  angle_earth_sun = angle_venus_sun = 0;
  earth_speed = 60 / frame_rate; // 30 degrees / second
  venus_speed = earth_speed  * ((365.2 / 224.7) - 1);
}

function draw() {
  background((51,51,51));

  push();
  translate(x, y);
  rotate(angle_earth_sun);

  stroke(150);
  line(0, 0, 0, r_earth_sun);

  noFill();
  ellipse(0, r_earth_sun, 2 * r_earth_sun, 2 * r_earth_sun);
  ellipse(0, r_earth_sun, 2 * r_venus_sun, 2 * r_venus_sun);

  noStroke();
  fill("blue");
  ellipse(0, 0, s, s);

  translate(0, r_earth_sun);
  rotate(angle_venus_sun);

  stroke(150);
  line(0, 0, 0, r_venus_sun);

  fill("yellow");
  ellipse(0, 0, 2 * s, 2 * s);


  pop();

  // Get Sun coordinates
  sun_x = x + r_earth_sun * cos(angle_earth_sun + 90);
  sun_y = y + r_earth_sun * sin(angle_earth_sun + 90);

  // Get Venus coordinates
  venus_x = sun_x + r_venus_sun * cos(angle_earth_sun + angle_venus_sun + 90);
  venus_y = sun_y + r_venus_sun * sin(angle_earth_sun + angle_venus_sun + 90);
  trail.push([venus_x, venus_y]);

  // Draw Venus trail
  push();
  for (let i = 0; i < trail.length - 1; i++) {
     strokeWeight(2);
     stroke("orange");
     line(trail[i][0], trail[i][1], trail[i + 1][0], trail[i + 1][1]);
   }
  pop();

  fill("orange");
  ellipse(venus_x, venus_y, s, s);

  angle_earth_sun -= earth_speed;
  angle_venus_sun -= venus_speed;

  if(completeCycle(angle_earth_sun)) {
    noLoop();
  }
}

function completeCycle(angle) {
   return -angle / 8 > 360
}
