import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("world");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xc9dcff, 30, 250);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 500);

const hemi = new THREE.HemisphereLight(0xfff6ee, 0x8ba6de, 1.0);
scene.add(hemi);
const key = new THREE.DirectionalLight(0xfff3e0, 1.25);
key.position.set(20, 30, 20);
scene.add(key);
const fill = new THREE.DirectionalLight(0xb6d2ff, 0.6);
fill.position.set(-20, 15, -10);
scene.add(fill);

const world = new THREE.Group();
scene.add(world);

const pastel = {
  grass: new THREE.MeshStandardMaterial({ color: 0x8fd3a3, roughness: 0.9 }),
  road: new THREE.MeshStandardMaterial({ color: 0xb9c0d8, roughness: 1.0 }),
  wall: new THREE.MeshStandardMaterial({ color: 0xfff4e8, roughness: 0.86 }),
  roof: new THREE.MeshStandardMaterial({ color: 0xff9f97, roughness: 0.8 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x89b3ff, roughness: 0.7 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xffd784, roughness: 0.7 }),
  pink: new THREE.MeshStandardMaterial({ color: 0xffb7cc, roughness: 0.8 }),
  white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x384762, roughness: 0.8 }),
  water: new THREE.MeshStandardMaterial({ color: 0x98d7ff, roughness: 0.4, metalness: 0.05 })
};

function groundPatch(x, z, w = 40, d = 40, y = -0.04) {
  const patch = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), pastel.grass);
  patch.position.set(x, y, z);
  world.add(patch);
}

function createLabel(text, color = "#2b3550", bg = "rgba(255,255,255,0.72)") {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(10, 10, 1004, 236, 54);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.font = "700 72px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 512, 128);

  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(15, 3.75, 1);
  return sprite;
}

function cloud(x, y, z) {
  const g = new THREE.Group();
  const puff = new THREE.SphereGeometry(2.4, 18, 18);
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(puff, pastel.white);
    m.position.set(i * 1.6, Math.sin(i) * 0.4, (i % 2) * 1.2);
    m.scale.set(1 + Math.random() * 0.5, 0.7 + Math.random() * 0.4, 1 + Math.random() * 0.4);
    g.add(m);
  }
  g.position.set(x, y, z);
  world.add(g);
  return g;
}

function person(x, z, colors = [0x38547a, 0xffd1a6, 0xffd95c], scale = 1) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.2, 6, 12), new THREE.MeshStandardMaterial({ color: colors[0] }));
  body.position.y = 1.35;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), new THREE.MeshStandardMaterial({ color: colors[1] }));
  head.position.y = 2.5;
  const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.32, 12), new THREE.MeshStandardMaterial({ color: colors[2] }));
  hat.position.y = 2.9;
  g.add(body, head, hat);
  g.position.set(x, 0, z);
  g.scale.setScalar(scale);
  world.add(g);
  return g;
}

function simpleHouse(x, z, w = 10, d = 8) {
  const g = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.BoxGeometry(w, 5.5, d), pastel.wall);
  shell.position.y = 2.75;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.66, 2.5, 4), pastel.roof);
  roof.rotation.y = Math.PI * 0.25;
  roof.position.y = 6.5;
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.7, 0.15), pastel.dark);
  door.position.set(0, 1.35, d / 2 + 0.08);
  g.add(shell, roof, door);
  g.position.set(x, 0, z);
  world.add(g);
  return { group: g, door };
}

const animated = [];

// Scene 1: House intro
for (let i = -1; i <= 1; i++) groundPatch(i * 40, 0, 40, 40);
const home = simpleHouse(0, -2);
const introTitle = createLabel("Your Name — QA / SDET Engineer");
introTitle.position.set(0, 10, 8);
world.add(introTitle);
animated.push({
  update: (t) => {
    introTitle.position.y = 10 + Math.sin(t * 0.9) * 0.4;
  }
});
const introChars = [
  person(-4.5, 5.5, [0x98bbff, 0xffd8b6, 0x4d75c6]),
  person(-2.2, 4.5, [0xffb5cf, 0xffd8b6, 0xff7f88], 0.85),
  person(3.2, 5.2, [0xffde95, 0xffd8b6, 0x5774b8], 0.95),
  person(5.3, 4.1, [0xc9e9ff, 0xf3f7ff, 0x7db3ff], 0.6)
];
animated.push({
  update: (t) => {
    introChars.forEach((c, i) => {
      c.position.y = Math.sin(t * 1.3 + i * 0.7) * 0.08;
    });
  }
});
const clouds = [cloud(-15, 15, -10), cloud(-2, 17, -12), cloud(10, 14, -8), cloud(18, 16, -11)];
animated.push({
  update: (t) => {
    clouds.forEach((c, i) => {
      c.position.x = ((-20 + i * 10 + t * 1.2) % 50) - 25;
    });
  }
});

// Scene 2: About room
groundPatch(0, 40);
const roomShell = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 14), new THREE.MeshStandardMaterial({ color: 0xfff8ef, transparent: true, opacity: 0.88 }));
roomShell.position.set(0, 3, 40);
world.add(roomShell);
const table = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.1, 2.8), pastel.road);
table.position.set(0, 0.8, 41.5);
world.add(table);
const laptop = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 1.1), pastel.dark);
laptop.position.set(0, 1.45, 41.2);
world.add(laptop);
for (let i = 0; i < 4; i++) {
  const icon = new THREE.Mesh(new THREE.TorusKnotGeometry(0.24, 0.07, 90, 10), i % 2 ? pastel.blue : pastel.yellow);
  icon.position.set(-2 + i * 1.2, 2.1 + Math.sin(i) * 0.4, 39.2);
  world.add(icon);
  animated.push({ update: (t) => (icon.rotation.x = icon.rotation.y = t * 0.6 + i) });
}
const aboutLabel = createLabel("About Me — Curious tester crafting reliable products", "#2f3d5c");
aboutLabel.position.set(0, 5.2, 37.5);
world.add(aboutLabel);
person(-2.3, 43, [0x8ec6ff, 0xffd8b6, 0x5b78b8]);
person(2.1, 43.2, [0xffffff, 0xf2f2f2, 0x87b6f7], 0.6);

// Scene 3: Hobbies bedroom
groundPatch(0, 80);
const bedroom = new THREE.Mesh(new THREE.BoxGeometry(16, 6, 16), new THREE.MeshStandardMaterial({ color: 0xf8f1ff, transparent: true, opacity: 0.9 }));
bedroom.position.set(0, 3, 80);
world.add(bedroom);
for (let i = 0; i < 6; i++) {
  const toy = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9), [pastel.pink, pastel.yellow, pastel.blue][i % 3]);
  toy.position.set(-5 + i * 2, 1.1, 78 + (i % 2) * 2);
  world.add(toy);
  animated.push({ update: (t) => (toy.rotation.y = t * 0.5 + i) });
}
const hobbiesLabel = createLabel("Hobbies — Gaming • Sketching • Story Design", "#3a3160", "rgba(255,245,252,0.76)");
hobbiesLabel.position.set(0, 6.4, 80);
world.add(hobbiesLabel);
const family = [
  person(-4, 84.5, [0xff98b8, 0xffd8b6, 0xb6638d]),
  person(-1.5, 84.8, [0x8ec6ff, 0xffd8b6, 0x4f74be]),
  person(1.8, 85.1, [0xffd27b, 0xffd8b6, 0x6f88cf]),
  person(4.2, 84.7, [0xd8f1ff, 0xfff2db, 0xa5d5ff], 0.7)
];
animated.push({
  update: (t) => {
    family.forEach((f, i) => {
      f.rotation.z = Math.sin(t * 1.4 + i) * 0.08;
    });
  }
});

// Scene 4: School
groundPatch(0, 120);
const school = new THREE.Mesh(new THREE.BoxGeometry(20, 8, 10), new THREE.MeshStandardMaterial({ color: 0xfff6d8 }));
school.position.set(0, 4, 120);
world.add(school);
const blackboard = new THREE.Mesh(new THREE.BoxGeometry(11, 3.8, 0.25), new THREE.MeshStandardMaterial({ color: 0x2f6943 }));
blackboard.position.set(0, 4, 125.3);
world.add(blackboard);
const educationLabel = createLabel("Education Timeline — School to Specialized Training", "#e8fff2", "rgba(28,70,44,0.74)");
educationLabel.position.set(0, 4, 125.6);
educationLabel.scale.set(10, 2.5, 1);
world.add(educationLabel);
for (let i = 0; i < 5; i++) {
  person(-6 + i * 3, 114.5 + (i % 2) * 1.2, [0xa0c6ff, 0xffd8b6, 0x6387ca], 0.8);
}
person(8, 123, [0x889ab8, 0xffd8b6, 0x566487], 1.1);

// Scene 5: Projects city
groundPatch(0, 160, 44, 56);
const road = new THREE.Mesh(new THREE.BoxGeometry(8, 0.06, 50), pastel.road);
road.position.set(0, 0, 160);
world.add(road);
const projectLocations = [
  { name: "Playground Project", x: -10, z: 146, color: pastel.pink },
  { name: "Railway Automation", x: 9.5, z: 154, color: pastel.blue },
  { name: "Market Analytics", x: -9, z: 168, color: pastel.yellow },
  { name: "Tokyo Tower App", x: 10, z: 176, color: pastel.roof },
  { name: "Mount Fuji Simulation", x: -2, z: 185, color: pastel.white }
];
projectLocations.forEach((p, i) => {
  const block = new THREE.Mesh(new THREE.BoxGeometry(5, 4 + i * 0.9, 5), p.color);
  block.position.set(p.x, 2 + i * 0.45, p.z);
  world.add(block);
  const l = createLabel(p.name, "#2d3552", "rgba(255,255,255,0.8)");
  l.position.set(p.x, 6 + i * 0.8, p.z);
  l.scale.set(8, 2, 1);
  world.add(l);
});
const tower = new THREE.Mesh(new THREE.ConeGeometry(2.2, 14, 6), new THREE.MeshStandardMaterial({ color: 0xff9077 }));
tower.position.set(13, 7.5, 172);
world.add(tower);
const mountain = new THREE.Mesh(new THREE.ConeGeometry(6, 8, 8), new THREE.MeshStandardMaterial({ color: 0xe9f3ff }));
mountain.position.set(-2, 4, 188);
world.add(mountain);

// Scene 6: Experience district
groundPatch(0, 215, 40, 50);
for (let i = 0; i < 4; i++) {
  const office = new THREE.Mesh(new THREE.BoxGeometry(6, 6 + i * 2.5, 6), new THREE.MeshStandardMaterial({ color: [0xcfdcff, 0xbad0ff, 0xdee6ff, 0xbdd7e9][i] }));
  office.position.set(-9 + i * 6, 3 + i * 1.25, 214 + (i % 2) * 8);
  world.add(office);
  const xp = createLabel(`Experience ${i + 1}`, "#2f3e63");
  xp.position.set(-9 + i * 6, 8 + i * 1.3, 214 + (i % 2) * 8);
  xp.scale.set(5.5, 1.6, 1);
  world.add(xp);
}
const walker = person(-12, 219, [0x7da7ff, 0xffd8b6, 0x455e9b], 1.0);
animated.push({
  update: (t) => {
    walker.position.x = -12 + ((t * 2.2) % 20);
  }
});

// Scene 7: Contact ending
groundPatch(0, 255, 40, 40);
const lake = new THREE.Mesh(new THREE.CircleGeometry(14, 32), pastel.water);
lake.rotation.x = -Math.PI / 2;
lake.position.set(0, 0.02, 255);
world.add(lake);
const sunsetPanel = new THREE.Mesh(new THREE.PlaneGeometry(34, 14), new THREE.MeshBasicMaterial({ color: 0xffba88, transparent: true, opacity: 0.6 }));
sunsetPanel.position.set(0, 10, 247);
world.add(sunsetPanel);
const contactLabel = createLabel("Contact: your.email@example.com • your socials", "#50363a", "rgba(255,236,220,0.86)");
contactLabel.position.set(0, 15, 255);
contactLabel.scale.set(14, 3.3, 1);
world.add(contactLabel);
const waveChar = person(0, 261, [0x7ab6ff, 0xffd8b6, 0x5a72b8]);
animated.push({
  update: (t) => {
    waveChar.rotation.z = Math.sin(t * 2.0) * 0.12;
    contactLabel.position.y = 15 + Math.sin(t * 0.8) * 0.5;
  }
});
for (let i = 0; i < 6; i++) cloud(-14 + i * 5.2, 18 + (i % 2), 267 + i * 0.8);

// camera loop path for infinite storytelling scroll
const pathPoints = [
  new THREE.Vector3(0, 5.4, 14),
  new THREE.Vector3(0, 4.1, 35),
  new THREE.Vector3(0, 4.2, 75),
  new THREE.Vector3(0, 5.2, 118),
  new THREE.Vector3(0, 5.8, 160),
  new THREE.Vector3(0, 6.0, 214),
  new THREE.Vector3(0, 7.2, 255),
  new THREE.Vector3(0, 13.5, 284),
  new THREE.Vector3(0, 6.0, 12)
];
const lookPath = [
  new THREE.Vector3(0, 3.2, -2),
  new THREE.Vector3(0, 2.5, 42),
  new THREE.Vector3(0, 3.0, 81),
  new THREE.Vector3(0, 3.6, 123),
  new THREE.Vector3(0, 3.0, 172),
  new THREE.Vector3(0, 4.4, 220),
  new THREE.Vector3(0, 7.5, 260),
  new THREE.Vector3(0, 18, 300),
  new THREE.Vector3(0, 3.0, 0)
];
const camCurve = new THREE.CatmullRomCurve3(pathPoints, true, "catmullrom", 0.18);
const lookCurve = new THREE.CatmullRomCurve3(lookPath, true, "catmullrom", 0.18);

let scrollTarget = 0;
let scrollCurrent = 0;

function wrap01(v) {
  if (v >= 1) return v % 1;
  if (v < 0) return ((v % 1) + 1) % 1;
  return v;
}

window.addEventListener("wheel", (e) => {
  scrollTarget = wrap01(scrollTarget + e.deltaY * 0.00006);
}, { passive: true });

let touchY = 0;
window.addEventListener("touchstart", (e) => {
  touchY = e.touches[0].clientY;
}, { passive: true });
window.addEventListener("touchmove", (e) => {
  const y = e.touches[0].clientY;
  const dy = touchY - y;
  touchY = y;
  scrollTarget = wrap01(scrollTarget + dy * 0.00008);
}, { passive: true });

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();
  requestAnimationFrame(animate);

  let diff = scrollTarget - scrollCurrent;
  if (diff > 0.5) diff -= 1;
  if (diff < -0.5) diff += 1;
  scrollCurrent = wrap01(scrollCurrent + diff * 0.04);

  const autoDrift = 0.00006;
  scrollTarget = wrap01(scrollTarget + autoDrift);

  const camPos = camCurve.getPointAt(scrollCurrent);
  const lookPos = lookCurve.getPointAt(wrap01(scrollCurrent + 0.018));
  const sideOffset = Math.sin(scrollCurrent * Math.PI * 12 + t * 0.35) * 0.4;
  camera.position.set(camPos.x + sideOffset, camPos.y + Math.sin(t * 0.55) * 0.08, camPos.z);
  camera.lookAt(lookPos);

  animated.forEach((a) => a.update(t));
  home.door.rotation.y = -Math.min(1, Math.max(0, (scrollCurrent - 0.08) * 12)) * 1.25;

  renderer.render(scene, camera);
}

animate();
