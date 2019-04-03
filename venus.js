// A dynamic view of the Venus pentagram
// Semidan Robaina Estevez, 2019

let pause_animation = true;
let earth_centered = true;
let pause_button = document.getElementById("pause_button");
let type_button = document.getElementById("type_button");
let trails = [];
let sun_color = "rgb(250, 250, 242)";
let earth_color = "rgb(102, 160, 228)";
let venus_color = "rgb(231, 199, 85)";
let colors = ["rgb(94, 217, 69)", "rgb(250, 198, 44)", "rgb(246, 113, 71)",
              "rgb(51, 215, 201)", "rgb(217, 69, 189)", "rgb(71, 114, 241)",
              "rgb(132, 22, 242)"];
let trail_color = colors[Math.floor(Math.random() * colors.length)];

document.body.style.setProperty("--fancyColor", trail_color);
let sun_diameter = 2.5;
let earth_diameter = 1.5;
let venus_diameter = 1.5;
let angle_earth_sun, angle_venus_sun, scale_factor,
    r_earth_sun, r_venus_sun, earth_angular_speed,
    venus_angular_speed, earth_x, earth_y, sun_x, sun_y;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight / 1.2);
  cnv.parent("canvas_container");
  bg = loadImage("sky.jpg");
  angleMode(DEGREES);
  frame_rate = 30
  frameRate(frame_rate);
  angle_earth_sun = angle_venus_sun = 0;

  if(earth_centered) {
    setEarthCentered();
  } else {
    setSunCentered();
  }
}

function draw() {
  background(bg);

  if(earth_centered) {
    drawEarthCentered();
  } else {
    //drawSunCentered();
    drawSunCenteredMiddlePoint()
  }

  fill("white");
  textSize(2 * scale_factor);
  text("S", sun_x, sun_y - 1.5 * scale_factor);
  text("E", earth_x, earth_y - 1.5 * scale_factor);
  text("V", venus_x, venus_y - 1.5 * scale_factor);

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
  draw();
  loop();
}

function selectType() {
  earth_centered = !earth_centered;
  if(earth_centered) {
    type_button.innerHTML = "Earth";
  } else {
    type_button.innerHTML = "Sun";
  }
  setup();
  reset();
}

function setEarthCentered() {
  scale_factor = min(width, height) / 55;
  earth_x = width / 2;
  earth_y = height / 2
  r_earth_sun = 12 * scale_factor;
  r_venus_sun = 0.72348 * r_earth_sun;
  earth_angular_speed = 90 / frame_rate; // 30 degrees / second
  venus_angular_speed = earth_angular_speed * ((365.2 / 224.7) - 1);
}

function setSunCentered() {
  scale_factor = min(width, height) / 40;
  sun_x = width / 2;
  sun_y = height / 2
  r_earth_sun = 12 * scale_factor;
  r_venus_sun = 0.72348 * r_earth_sun;
  earth_angular_speed = 90 / frame_rate; // 30 degrees / second
  venus_angular_speed = earth_angular_speed * (365.2 / 224.7);
  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);
}

function drawEarthCentered() {
  push();
  translate(earth_x, earth_y);
  rotate(angle_earth_sun);

  stroke(150);
  line(0, 0, 0, r_earth_sun);

  noFill();
  ellipse(0, r_earth_sun, 2 * r_earth_sun, 2 * r_earth_sun);
  ellipse(0, r_earth_sun, 2 * r_venus_sun, 2 * r_venus_sun);

  noStroke();
  fill(earth_color);
  ellipse(0, 0, earth_diameter * scale_factor,
          earth_diameter * scale_factor);

  translate(0, r_earth_sun);
  rotate(angle_venus_sun);

  stroke(150);
  line(0, 0, 0, r_venus_sun);

  fill(sun_color);
  ellipse(0, 0, sun_diameter * scale_factor,
          sun_diameter * scale_factor);
  pop();

  // Get Sun coordinates
  sun_x = earth_x + r_earth_sun * cos(angle_earth_sun + 90);
  sun_y = earth_y + r_earth_sun * sin(angle_earth_sun + 90);

  // Get Venus coordinates
  venus_x = sun_x + r_venus_sun * cos(angle_earth_sun + angle_venus_sun + 90);
  venus_y = sun_y + r_venus_sun * sin(angle_earth_sun + angle_venus_sun + 90);
  trails.push([venus_x, venus_y]);

  // Draw Venus trails
  push();
  for (let i = 0; i < trails.length - 1; i++) {
     strokeWeight(2);
     stroke(trail_color);
     line(trails[i][0], trails[i][1], trails[i + 1][0], trails[i + 1][1]);
   }
  pop();

  fill(venus_color);
  ellipse(venus_x, venus_y, venus_diameter * scale_factor,
          venus_diameter * scale_factor);
}

// function drawSunCentered() {
//   stroke(150);
//   noFill();
//   ellipse(sun_x, sun_y, 2 * r_earth_sun, 2 * r_earth_sun);
//   ellipse(sun_x, sun_y, 2 * r_venus_sun, 2 * r_venus_sun);
//
//   // Draw Earth - Venus line
//   if(angle_earth_sun % 1 * earth_angular_speed === 0) {
//     trails.push([earth_x, earth_y, venus_x, venus_y]);
//   }
//
//   for(trail of trails){
//     strokeWeight(0.5);
//     stroke(trail_color);
//     line(trail[0], trail[1], trail[2], trail[3]);
//   }
//
//   venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
//   venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
//   earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
//   earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);
//
//   noStroke();
//   fill(earth_color);
//   ellipse(earth_x, earth_y, earth_diameter * scale_factor,
//           earth_diameter * scale_factor);
//   fill(sun_color);
//   ellipse(sun_x, sun_y, sun_diameter * scale_factor,
//           sun_diameter * scale_factor);
//   fill(venus_color);
//   ellipse(venus_x, venus_y, venus_diameter * scale_factor,
//           venus_diameter * scale_factor);
// }

function drawSunCenteredMiddlePoint() {
  venus_x = sun_x + r_venus_sun * cos(angle_venus_sun);
  venus_y = sun_y + r_venus_sun * sin(angle_venus_sun);
  earth_x = sun_x + r_earth_sun * cos(angle_earth_sun);
  earth_y = sun_y + r_earth_sun * sin(angle_earth_sun);

  let middle_point = {"x": 0, "y": 0};
  stroke(150);
  noFill();
  ellipse(sun_x, sun_y, 2 * r_earth_sun, 2 * r_earth_sun);
  ellipse(sun_x, sun_y, 2 * r_venus_sun, 2 * r_venus_sun);
  line(earth_x, earth_y, venus_x, venus_y);

  // Draw Earth - Venus line
  if(angle_earth_sun % 1 * earth_angular_speed === 0) {
    middle_point.x = (earth_x + venus_x) / 2;
    middle_point.y = (earth_y + venus_y) / 2;
    trails.push([middle_point.x, middle_point.y]);
  }

  // Draw Venus-Earth middle point trails
  push();
  for (let i = 0; i < trails.length - 1; i++) {
     strokeWeight(2);
     stroke(trail_color);
     line(trails[i][0], trails[i][1], trails[i + 1][0], trails[i + 1][1]);
   }
  pop();

  noStroke();
  fill(earth_color);
  ellipse(earth_x, earth_y, earth_diameter * scale_factor,
          earth_diameter * scale_factor);
  fill(sun_color);
  ellipse(sun_x, sun_y, sun_diameter * scale_factor,
          sun_diameter * scale_factor);
  fill(venus_color);
  ellipse(venus_x, venus_y, venus_diameter * scale_factor,
          venus_diameter * scale_factor);
  fill(trail_color);
  ellipse(middle_point.x, middle_point.y, 0.5 * scale_factor,
          0.5 * scale_factor);
}
