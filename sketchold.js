// A dynamic view of the Venus pentagram
// Semidan Robaina Estevez, 2019

let pause_animation = true;
let pause_button = document.getElementById("pause_button");
let trails = [];
let angle_earth_sun, angle_venus_sun;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frame_rate = 30
  frameRate(frame_rate);

  scale_factor = min(windowWidth, windowHeight) / 35;
  r_earth_sun = 12 * scale_factor;
  r_venus_sun = 0.72348 * r_earth_sun;
  angle_earth_sun = angle_venus_sun = 0;
  earth_angular_speed = 90 / frame_rate; // 30 degrees / second
  venus_angular_speed = earth_angular_speed * (365.2 / 224.7);
  sun_x = windowWidth / 2;
  if(windowWidth > windowHeight) {
    sun_y = windowHeight / 2.3;
  }else {
    sun_y = windowHeight / 3;
  }
  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);

}

function draw() {

  background((51,51,51));

  stroke(150);
  noFill();
  ellipse(sun_x, sun_y, 2 * r_earth_sun, 2 * r_earth_sun);
  ellipse(sun_x, sun_y, 2 * r_venus_sun, 2 * r_venus_sun);

  // Draw Earth - Venus line
  if(angle_earth_sun % 1 * earth_angular_speed === 0) {
    trails.push([earth_x, earth_y, venus_x, venus_y]);
  }

  for(trail of trails){
    strokeWeight(0.5);
    stroke("orange");
    line(trail[0], trail[1], trail[2], trail[3]);
  }

  noStroke();
  fill("blue");
  ellipse(earth_x, earth_y, scale_factor, scale_factor);
  fill("yellow");
  ellipse(sun_x, sun_y, 2 * scale_factor, 2 * scale_factor);
  fill("orange");
  ellipse(venus_x, venus_y, scale_factor, scale_factor);

  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  trail.push([venus_x, venus_y]);

  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);

  if(!pause_animation) {
    angle_earth_sun -= earth_angular_speed;
    angle_venus_sun -= venus_angular_speed;
  }

  if (completeCycle(angle_earth_sun)) {
    noLoop();
  }

}

// Helper functions
function completeCycle(angle) {
   return -angle / 8 > 360
}

function pause() {
  pause_animation = !pause_animation;
  if (!pause_animation) {
    pause_button.innerHTML = "Pause";
  } else {
    pause_button.innerHTML = "Resume";
  }
}

function reset() {
  pause_button.innerHTML = "Play";
  pause_animation = true;
  angle_earth_sun = angle_venus_sun = 0;
  trails = [];
  loop();
}
