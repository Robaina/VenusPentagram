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

  x = windowWidth / 2;
  if(windowWidth > windowHeight) {
    y = windowHeight / 2.3;
  }else {
    y = windowHeight / 3;
  }
  scale_factor = min(windowWidth, windowHeight) / 60;
  r_earth_sun = 12 * scale_factor;
  r_venus_sun = 0.72348 * r_earth_sun;
  angle_earth_sun = angle_venus_sun = 0;
  earth_angular_speed = 90 / frame_rate; // 30 degrees / second
  venus_angular_speed = earth_angular_speed * ((365.2 / 224.7) - 1);
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
  ellipse(0, 0, scale_factor, scale_factor);

  translate(0, r_earth_sun);
  rotate(angle_venus_sun);

  stroke(150);
  line(0, 0, 0, r_venus_sun);

  fill("yellow");
  ellipse(0, 0, 2 * scale_factor, 2 * scale_factor);
  pop();

  // Get Sun coordinates
  sun_x = x + r_earth_sun * cos(angle_earth_sun + 90);
  sun_y = y + r_earth_sun * sin(angle_earth_sun + 90);

  // Get Venus coordinates
  venus_x = sun_x + r_venus_sun * cos(angle_earth_sun + angle_venus_sun + 90);
  venus_y = sun_y + r_venus_sun * sin(angle_earth_sun + angle_venus_sun + 90);
  trails.push([venus_x, venus_y]);

  // Draw Venus trails
  push();
  for (let i = 0; i < trails.length - 1; i++) {
     strokeWeight(2);
     stroke("orange");
     line(trails[i][0], trails[i][1], trails[i + 1][0], trails[i + 1][1]);
   }
  pop();

  fill("orange");
  ellipse(venus_x, venus_y, scale_factor, scale_factor);

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
