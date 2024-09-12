// Define planet information
const PLANET_INFO = {
  'Mercury': { baseSize: 10, colorStart: [180, 180, 180], colorEnd: [100, 100, 100], gradientSteps: 15, hasRings: false },
  'Venus': { baseSize: 20, colorStart: [255, 230, 200], colorEnd: [200, 150, 100], gradientSteps: 15, hasRings: false },
  'Earth': { baseSize: 30, colorStart: [20, 100, 150], colorEnd: [50, 150, 200], gradientSteps: 15, hasRings: false },
  'Mars': { baseSize: 25, colorStart: [220, 80, 50], colorEnd: [180, 50, 30], gradientSteps: 15, hasRings: false },
  'Jupiter': { baseSize: 60, colorStart: [230, 160, 80], colorEnd: [180, 120, 50], gradientSteps: 15, hasRings: true, ringAngle: 15 },
  'Saturn': { baseSize: 50, colorStart: [255, 215, 0], colorEnd: [255, 140, 0], gradientSteps: 15, hasRings: true, ringAngle: 25 },
  'Uranus': { baseSize: 40, colorStart: [140, 200, 250], colorEnd: [100, 150, 200], gradientSteps: 15, hasRings: true, ringAngle: 45 },
  'Neptune': { baseSize: 35, colorStart: [80, 120, 180], colorEnd: [60, 90, 140], gradientSteps: 15, hasRings: true, ringAngle: 60 },
};

const PLANET_ORDER = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(24);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Draw the Sun at the center
function drawSun(centerX, centerY) {
  let sunSize = 80; // Size of the Sun
  let sunColorStart = [255, 255, 100];
  let sunColorEnd = [255, 200, 100];
  drawGradientEllipse(centerX, centerY, sunSize, sunSize, sunColorStart, sunColorEnd, 15);
}

// Draw rotating planets around the Sun
function drawPlanet(centerX, centerY, volume, planet, index) {
  // Calculate planet size based on volume
  let size = PLANET_INFO[planet].baseSize + map(volume, 0, 100, 0, 50);
  
  // Calculate orbit radius based on index to avoid overlap and ensure spacing
  let orbitRadius = (index + 1) * 70; // Adjust this multiplier for better spacing
  
  // Calculate rotation position around the center
  let rotationSpeed = 5;
  let angle = radians(frameCount + index * 45); // Use different offsets for each planet to prevent overlap
  let x = centerX + orbitRadius * cos(angle);
  let y = centerY + orbitRadius * sin(angle);
  
  // Draw planet with gradient
  drawGradientEllipse(x, y, size, size, PLANET_INFO[planet].colorStart, PLANET_INFO[planet].colorEnd, PLANET_INFO[planet].gradientSteps);
  
  // Draw the orbit path of the planet
  drawOrbit(centerX, centerY, orbitRadius);
  
  // Draw planet rings if the planet has them
  if (PLANET_INFO[planet].hasRings) {
    drawThickRing(x, y, size * 1.2, size * 1.7, PLANET_INFO[planet].ringAngle); // Set larger inner and outer diameters for thicker rings
  }
}

// Draw an ellipse with gradient colors
function drawGradientEllipse(x, y, w, h, colorStart, colorEnd, steps) {
  for (let i = 0; i <= steps; i++) {
    let inter = map(i, 0, steps, 0, 1);
    let c = lerpColor(color(colorStart), color(colorEnd), inter);
    fill(c);
    noStroke();
    ellipse(x, y, w * (1 - i / steps), h * (1 - i / steps));
  }
}

// Draw thicker rings with a tilt angle
function drawThickRing(x, y, innerDiameter, outerDiameter, angle) {
  push(); // Save the current drawing settings
  translate(x, y); // Move the origin to the planet's position
  rotate(radians(angle)); // Apply tilt angle
  noFill();

  // Set the ring gradient color and transparency
  let ringColorStart = color(255, 255, 255, 80);
  let ringColorEnd = color(255, 255, 255, 10);

  // Draw thicker rings
  for (let i = 0; i < 10; i++) { // Increase the number of layers for thickness
    let inter = map(i, 0, 10, 0, 1);
    let c = lerpColor(ringColorStart, ringColorEnd, inter);
    stroke(c);
    strokeWeight(1); // Adjust the line width
    ellipse(0, 0, innerDiameter + i, outerDiameter + i);
  }

  pop(); // Restore drawing settings
}

// Draw the orbit path of the planet
function drawOrbit(centerX, centerY, orbitRadius) {
  stroke(255, 255, 255, 30); // Set orbit color to semi-transparent white
  strokeWeight(1); // Set line width
  noFill();
  drawingContext.setLineDash([10, 5]); // 10 pixels line segments and 5 pixels gaps
  ellipse(centerX, centerY, orbitRadius * 2);
  drawingContext.setLineDash([]); // Reset to solid line mode
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(0); // Use a darker background for better contrast

  // Draw the Sun at the center
  let centerX = width / 2;
  let centerY = height / 2;
  drawSun(centerX, centerY);

  // Draw stars in the background
  drawStars(20); // Reduce the number of stars

  // Draw cosmic dust to add depth
  drawCosmicDust(10); // Reduce the number of cosmic dust

  // Draw rotating planets
  drawPlanet(centerX, centerY, vocal, PLANET_ORDER[0], 0);   // Mercury (Vocals)
  drawPlanet(centerX, centerY, drum, PLANET_ORDER[1], 1);    // Venus (Drums)
  drawPlanet(centerX, centerY, bass, PLANET_ORDER[2], 2);    // Earth (Bass)
  drawPlanet(centerX, centerY, other, PLANET_ORDER[3], 3);   // Mars (Other)

  // Draw the remaining planets with fixed rotation speed and zero volume
  for (let i = 4; i < PLANET_ORDER.length; i++) {
    drawPlanet(centerX, centerY, 0, PLANET_ORDER[i], i);
  }

  // Display lyrics with fade-in and fade-out effect
  displayLyrics(words);
}

// Draw random stars in the background
function drawStars(count) {
  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    fill(255); // Use static white color for stars
    noStroke();
    ellipse(x, y, random(1, 3));
  }
}

// Draw random cosmic dust in the background
function drawCosmicDust(count) {
  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(2, 5);
    let dustColor = [random(255), random(255), random(255)]; // Random color
    fill(dustColor);
    noStroke();
    ellipse(x, y, size, size);
  }
}

// Display lyrics at the bottom
function displayLyrics(words) {
  fill(255);
  textSize(32);
  text(words, width / 2, height - 50);
}