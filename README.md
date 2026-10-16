# 🌍 3D Interactive Portfolio Website — Three.js

An immersive, animated 3D portfolio experience built with **Three.js and JavaScript**, designed to present personal information, education, projects, professional experience, hobbies, and contact details through a visually engaging virtual world.

Instead of a traditional portfolio layout, this project takes visitors on an interactive journey through a series of colorful 3D environments. Users can explore each section by scrolling or using touch gestures while the camera smoothly travels through the virtual world.

## ✨ Project Overview

This project demonstrates how modern web technologies can transform a conventional portfolio into an interactive 3D storytelling experience.

The virtual environment features pastel-colored landscapes, stylized characters, animated objects, floating text labels, and dedicated environments for different portfolio sections.

The camera follows a continuous animated path, creating a cinematic journey from the introductory scene to the final contact section.

## 🚀 Key Features

- **Interactive 3D Environment:** A virtual world featuring houses, rooms, landscapes, buildings, clouds, and water.
- **Scroll-Based Navigation:** Explore the portfolio using mouse-wheel scrolling.
- **Touch Gesture Support:** Navigate the experience on touch-enabled devices.
- **Smooth Camera Animation:** A curved camera path creates fluid transitions between portfolio sections.
- **Animated 3D Objects:** Characters, clouds, decorative objects, and labels feature subtle animations.
- **Scene-Based Storytelling:** Each environment represents a different aspect of a personal or professional profile.
- **Custom 3D Characters:** Stylized characters created using Three.js geometry.
- **Dynamic Text Labels:** Canvas-generated textures display section headings and project names within the 3D world.
- **Responsive Rendering:** The renderer and camera adjust to changes in the browser window size.
- **Pastel Visual Design:** Soft colors, lighting, shadows, and atmospheric fog create a friendly, polished visual experience.

## 🗺️ Portfolio Journey

The experience is divided into seven themed environments:

### 1. Home — Introduction
A colorful outdoor environment featuring a house, animated clouds, and stylized characters. This section introduces the portfolio owner and their professional identity.

### 2. About Me — Personal Introduction
A virtual room containing a table, laptop, and animated decorative objects. It provides a dedicated space for a personal introduction and professional interests.

### 3. Hobbies — Personal Interests
A playful bedroom environment featuring colorful objects and animated characters, representing hobbies, creativity, and interests outside work.

### 4. Education — Learning Journey
A school-inspired environment with a classroom building, blackboard, and characters, designed to present educational qualifications and specialized training.

### 5. Projects — Project Showcase
A miniature 3D city containing individual structures representing projects. Each structure has a floating label that identifies the corresponding project.

Example project labels in the current implementation include:

- Playground Project
- Railway Automation
- Market Analytics
- Tokyo Tower App
- Mount Fuji Simulation

These labels can be replaced with actual project names and descriptions.

### 6. Experience — Professional Journey
A district of buildings representing professional experience and career progression. Animated elements create movement throughout the scene.

### 7. Contact — Get in Touch
A scenic ending featuring a lake, sunset-inspired panel, floating contact label, and animated character. This section is intended to display contact information and social links.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript (ES Modules) | Application logic, scene creation, and animation |
| [Three.js](https://threejs.org/) | 3D rendering, geometry, lighting, materials, and camera controls |
| WebGL | Hardware-accelerated 3D graphics rendering |
| HTML5 Canvas | Dynamic text textures for 3D labels |
| HTML5 | Canvas element and browser integration |
| CSS (integration layer) | Page layout, overlays, and presentation styling, when included |

## ⚙️ How It Works

### 3D Scene Construction

The application creates a Three.js scene containing a collection of 3D objects organized into a shared world group. Reusable functions generate ground patches, houses, characters, clouds, and floating labels.

### Lighting and Atmosphere

Hemisphere lighting and directional lights illuminate the environment. Standard materials define the pastel-colored objects, while scene fog adds atmospheric depth.

### Camera Path and Navigation

The camera follows a closed Catmull–Rom spline generated from predefined camera and look-at points.

Mouse-wheel and touch inputs update a normalized scroll target. The current camera position gradually follows that target, producing smooth movement through the environment.

A small automatic drift keeps the experience moving even when the visitor is not actively scrolling.

### Animation System

A centralized animation loop updates the camera, renders the scene, and runs individual object animations using elapsed time from the Three.js clock.

This approach coordinates character movement, floating labels, rotating objects, moving clouds, and other visual effects.

### Dynamic Labels

Portfolio headings are drawn onto HTML canvas textures and applied to Three.js sprites. This allows readable labels to appear as objects within the 3D environment.

## 📁 Project Structure

A suggested repository structure is:

```text
3d-interactive-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── (optional images and other resources)
```

The structure above is illustrative. Adapt the filenames and folders to match the actual files in your repository.

## 💻 Getting Started

### Prerequisites

- A modern web browser with WebGL support.
- A local development server.
- An internet connection to load the Three.js module from the configured CDN.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

**2. Navigate to the project directory**

```bash
cd YOUR_REPOSITORY
```

**3. Start a local development server**

If you use Visual Studio Code, install the Live Server extension and open `index.html` with Live Server.

Alternatively, if Python is installed, run:

```bash
python -m http.server 8000
```

**4. Open the project**

Visit:

```text
http://localhost:8000
```

Make sure `index.html` contains a canvas element with the ID `world` and loads `script.js` as a JavaScript module.

## 🎮 Controls

| Input | Action |
|---|---|
| Mouse wheel | Move through the 3D world |
| Touch swipe | Navigate on touch-enabled devices |
| Window resize | Adjust the rendering viewport |

Navigation follows a continuous loop, allowing visitors to move through the scenes repeatedly.

## 🎨 Customization

You can personalize the experience by modifying the existing JavaScript implementation.

- **Personal Information:** Replace placeholder headings with your name, role, and introduction.
- **Education:** Update the education scene with your actual qualifications and training.
- **Projects:** Replace sample project names with real projects and add appropriate descriptions.
- **Experience:** Customize the experience district to reflect your professional background.
- **Contact Details:** Replace the example email address and add your actual social profile links.
- **Visual Theme:** Modify the pastel material colors, lighting, fog, and environment geometry.
- **Animations:** Adjust camera movement, object rotation, floating effects, and automatic drift.

## 📈 Potential Improvements

Possible future enhancements include:

- Interactive project details and clickable navigation.
- HTML-based buttons and links for email and social profiles.
- Keyboard navigation and accessible alternatives to scroll-based movement.
- Loading indicators and improved handling of WebGL limitations.
- Performance optimization for mobile devices.
- Reduced-motion support and user-controlled automatic camera movement.
- A dedicated settings panel for navigation and animation controls.

## 🎯 Project Goals

This project explores the use of real-time 3D graphics and animation to create a distinctive personal portfolio experience.

It demonstrates practical use of Three.js scene composition, procedural geometry, lighting, materials, camera interpolation, animation loops, and canvas-based textures.

The goal is to combine technical implementation with creative storytelling to make portfolio presentation more engaging and memorable.

## 👨‍💻 Author

**Aryan - Sharma**

- GitHub: [aryuansharma](https://github.com/Aryuansharma)

---

*Built with JavaScript and Three.js to explore a more immersive approach to portfolio storytelling.*
