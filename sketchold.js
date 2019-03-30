// A dynamic view of the Venus pentagram
// Semidan Robaina Estevez, 2019


function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frame_rate = 30
  frameRate(frame_rate);
  trail = [];
  scale_factor = min(windowWidth, windowHeight) / 60;
  r_earth_sun = 12 * scale_factor;
  r_venus_sun = 0.723 * r_earth_sun;
  angle_earth_sun = angle_venus_sun = 0;
  earth_angular_speed = 60 / frame_rate; // 30 degrees / second
  venus_angular_speed = earth_angular_speed * (365.2 / 224.7);

  sun_x = windowWidth / 2;
  sun_y = windowHeight / 2;
  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);

}

function draw() {

  background((51,51,51));

  // venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  // venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  // trail.push([venus_x, venus_y]);
  //
  // earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  // earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);
  //
  // angle_venus_sun -= venus_angular_speed;
  // angle_earth_sun -= earth_angular_speed;

  // translate(earth_x, earth_y);
  // sun_x -= earth_x;
  // sun_y -= earth_x;
  // venus_x -= earth_x;
  // venus_y -= earth_y;
  // earth_x = earth_y = 0;

  stroke(150);
  line(sun_x, sun_y, venus_x, venus_y);
  line(sun_x, sun_y, earth_x, earth_y)

  noFill();
  ellipse(sun_x, sun_y, 2 * r_earth_sun, 2 * r_earth_sun);
  ellipse(sun_x, sun_y, 2 * r_venus_sun, 2 * r_venus_sun);

  noStroke();
  fill("blue");
  ellipse(earth_x, earth_y, scale_factor, scale_factor);
  fill("yellow");
  ellipse(sun_x, sun_y, 2 * scale_factor, 2 * scale_factor);
  fill("orange");
  ellipse(venus_x, venus_y, scale_factor, scale_factor);

  // Draw Venus trail
  // push();
  // for (let i = 0; i < trail.length - 1; i++) {
  //    strokeWeight(3);
  //    stroke("yellow");
  //    line(trail[i][0], trail[i][1], trail[i + 1][0], trail[i + 1][1]);
  //  }
  // pop();

  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  trail.push([venus_x, venus_y]);

  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);

  angle_venus_sun -= venus_angular_speed;
  angle_earth_sun -= earth_angular_speed;

}
