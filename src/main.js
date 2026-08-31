import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Router } from './router.js';
import { initChatbot } from './chatbot.js';
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════
// 1. CURSOR + MAGNETIC
// ═══════════════════════════════════════
const initCursor = () => {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;
  // If it's a touch device, restore default cursor and don't init custom cursor
  if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
    document.body.style.cursor = 'auto';
    dot.style.display = 'none';
    outline.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, ox = 0, oy = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
  });
  const loop = () => {
    ox += (mx - ox) * 0.3; oy += (my - oy) * 0.3;
    outline.style.left = `${ox}px`; outline.style.top = `${oy}px`;
    requestAnimationFrame(loop);
  };
  loop();

  document.querySelectorAll('a, button, .glass-card, .magnetic, .cert-badge, .media-frame').forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width/2)*0.3, y: (e.clientY - r.top - r.height/2)*0.3, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' }));
  });
};

// ═══════════════════════════════════════
// 2. WEBGL FLUID BACKGROUND
// ═══════════════════════════════════════
const initWebGL = () => {
  const container = document.getElementById('webgl-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const frag = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uRes;
    uniform float uScroll;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
    }
    float fbm(vec2 p) {
      float v=0.0, a=0.5;
      mat2 rot = mat2(0.8,0.6,-0.6,0.8);
      for(int i=0;i<5;i++) { v+=a*noise(p); p=rot*p*2.0; a*=0.5; }
      return v;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / uRes;
      st.x *= uRes.x/uRes.y;
      float s = uScroll*0.0003;
      float md = distance(st, uMouse);
      float mi = smoothstep(0.5,0.0,md)*0.25; // Intensify mouse distortion

      // Double the time multipliers for faster baseline motion
      vec2 q = vec2(fbm(st+uTime*0.12+s), fbm(st+vec2(5.2,1.3)+uTime*0.1));
      vec2 r = vec2(fbm(st+q*3.5+uTime*0.16+mi), fbm(st+q*3.5+uTime*0.14-mi));
      float f = fbm(st+r*4.0);

      vec3 c = mix(vec3(0.95, 0.97, 0.96), vec3(0.92, 0.95, 0.93), clamp(f*f*2.0,0.0,1.0));
      c = mix(c, vec3(0.85, 0.92, 0.88), clamp(r.x*r.x,0.0,0.25));
      c = mix(c, vec3(0.02, 0.59, 0.41), smoothstep(0.4,0.0,md)*0.2); // Make the emerald mouse highlight stronger

      gl_FragColor = vec4(c,1.0);
    }
  `;
  const vert = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;

  const u = {
    uTime: {value:0}, uMouse: {value:new THREE.Vector2(0.5,0.5)},
    uRes: {value:new THREE.Vector2(window.innerWidth,window.innerHeight)}, uScroll: {value:0}
  };
  const mat = new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:frag,uniforms:u});
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), mat));

  let tmx=0.5,tmy=0.5,cmx=0.5,cmy=0.5;
  window.addEventListener('mousemove', e => { tmx=e.clientX/window.innerWidth; tmy=1-e.clientY/window.innerHeight; });
  window.addEventListener('scroll', () => { u.uScroll.value = window.scrollY; });

  const timer = new THREE.Timer();
  const tick = () => {
    timer.update();
    u.uTime.value = timer.getElapsed();
    cmx+=(tmx-cmx)*0.03; cmy+=(tmy-cmy)*0.03;
    u.uMouse.value.set(cmx*(window.innerWidth/window.innerHeight), cmy);
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    u.uRes.value.set(window.innerWidth,window.innerHeight);
  });
};

// ═══════════════════════════════════════
// 3. 3D NEURAL NETWORK (HOME PAGE)
// ═══════════════════════════════════════
const initHome3D = () => {
  const heroSection = document.getElementById('hero');
  if (!heroSection || !heroSection.classList.contains('axon-hero')) return;

  const container = document.createElement('div');
  container.id = 'home-3d-container';
  container.style.position = 'absolute';
  container.style.inset = '0';
  container.style.zIndex = '0';
  container.style.pointerEvents = 'none';
  heroSection.insertBefore(container, heroSection.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.z = 25;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // Create Neural Nodes
  const nodeCount = 150;
  const nodes = [];
  const geo = new THREE.SphereGeometry(0.15, 8, 8);
  const mat = new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.8 });
  
  for(let i=0; i<nodeCount; i++) {
    const mesh = new THREE.Mesh(geo, mat);
    // Spread them in an elliptical shape mimicking a brain / neural cluster
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 20; // radius 20
    
    // Squish into an oval
    const x = r * Math.sin(phi) * Math.cos(theta) * 1.5;
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.8;
    const z = r * Math.cos(phi) * 0.5;

    mesh.position.set(x,y,z);
    mesh.userData = { 
      vx: (Math.random()-0.5)*0.02, 
      vy: (Math.random()-0.5)*0.02, 
      vz: (Math.random()-0.5)*0.02,
      phase: Math.random() * Math.PI * 2
    };
    nodes.push(mesh);
    group.add(mesh);
  }

  // Create Glowing Lines (Axons)
  const lineGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(nodeCount * nodeCount * 3);
  const opacities = new Float32Array(nodeCount * nodeCount);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  lineGeo.setAttribute('alpha', new THREE.BufferAttribute(opacities, 1));
  
  const shaderMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.02, 0.59, 0.41, vAlpha);
      }
    `,
    transparent: true,
    blending: THREE.NormalBlending,
    depthWrite: false
  });
  
  const lines = new THREE.LineSegments(lineGeo, shaderMat);
  group.add(lines);

  // Raycaster setup
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-9999, -9999);

  // Animation Loop
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.x = mouseX;
    mouse.y = mouseY;
  });

  const clock = new THREE.Clock();
  const animate = () => {
    if (!document.getElementById('home-3d-container')) { renderer.dispose(); return; }
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Aggressive mouse tracking (The "Fox" effect)
    const targetX = mouseY * 0.6; 
    const targetY = mouseX * 0.8;
    
    group.rotation.x += (targetX - group.rotation.x) * 0.1;
    group.rotation.y += (targetY - group.rotation.y) * 0.1;
    group.rotation.z += 0.002;

    // Raycast against nodes
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodes);
    
    // Reset all nodes to base state in userData
    for (let i = 0; i < nodeCount; i++) {
      nodes[i].userData.targetScale = 1.0;
      nodes[i].material.color.setHex(0x059669);
    }
    
    if (intersects.length > 0) {
      for(let i=0; i<Math.min(intersects.length, 5); i++) {
        intersects[i].object.userData.targetScale = 3.0;
        intersects[i].object.material.color.setHex(0x10b981); // Bright emerald
      }
    }

    let lineIndex = 0;
    let alphaIndex = 0;
    const posAttr = lineGeo.attributes.position.array;
    const alphaAttr = lineGeo.attributes.alpha.array;

    for (let i = 0; i < nodeCount; i++) {
      const n1 = nodes[i];
      n1.position.x += n1.userData.vx;
      n1.position.y += n1.userData.vy;
      n1.position.z += n1.userData.vz;
      
      // Keep in bounds softly
      if (n1.position.length() > 25) {
         n1.userData.vx *= -0.9;
         n1.userData.vy *= -0.9;
         n1.userData.vz *= -0.9;
      }

      const pulse = (Math.sin(t * 2.0 + n1.userData.phase) + 1) * 0.5;
      const baseScale = n1.userData.targetScale;
      
      if (baseScale > 1.0) {
        // Expand rapidly if hovered
        n1.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.2);
      } else {
        // Normal pulsing
        const s = 0.5 + pulse * 1.5;
        n1.scale.lerp(new THREE.Vector3(s,s,s), 0.1);
      }

      for (let j = i + 1; j < nodeCount; j++) {
        const n2 = nodes[j];
        const dist = n1.position.distanceTo(n2.position);
        
        if (dist < 5.0) {
          posAttr[lineIndex++] = n1.position.x;
          posAttr[lineIndex++] = n1.position.y;
          posAttr[lineIndex++] = n1.position.z;
          
          posAttr[lineIndex++] = n2.position.x;
          posAttr[lineIndex++] = n2.position.y;
          posAttr[lineIndex++] = n2.position.z;

          // Glowing pulse travels across connections
          const connectionPulse = (Math.sin(t * 3.0 - dist * 2.0 + n1.userData.phase) + 1) * 0.5;
          const alpha = (1.0 - dist / 5.0) * 0.3 * connectionPulse;
          
          alphaAttr[alphaIndex++] = alpha;
          alphaAttr[alphaIndex++] = alpha;
        }
      }
    }
    
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.alpha.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIndex / 3);

    renderer.render(scene, camera);
  };
  animate();

  new ResizeObserver(() => {
    if (container.clientWidth) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }).observe(heroSection);
};


// ═══════════════════════════════════════
// 4. GSAP ANIMATIONS
// ═══════════════════════════════════════
const initHeroAnimations = () => {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.fromTo('.pill-border', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    .fromTo('.axon-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }, '-=0.8')
    .fromTo('.axon-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, '-=1.0')
    .fromTo('.btn-explore', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1,0.5)' }, '-=0.5');



  // Deep Parallax for Bento backgrounds
  gsap.utils.toArray('.bento-card').forEach(card => {
    const bg = card.querySelector('.bento-bg');
    if (!bg) return;
    gsap.fromTo(bg, 
      { yPercent: -20 },
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    gsap.to(counter, {
      scrollTrigger: { trigger: counter, start: 'top 90%' },
      innerText: target, duration: 2.5,
      snap: { innerText: target % 1 === 0 ? 1 : 0.1 }, ease: 'power2.out'
    });
  });

  gsap.to('.proof-card', {
    scrollTrigger: { trigger: '.proof-grid', start: 'top 80%' },
    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out'
  });

  gsap.to('.cta-title .word-reveal', {
    scrollTrigger: { trigger: '.editorial-cta', start: 'top 70%' },
    y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out'
  });
  gsap.to('.btn-cta', {
    scrollTrigger: { trigger: '.editorial-cta', start: 'top 70%' },
    scale: 1, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out'
  });

  gsap.to('.portfolio-item', {
    scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out'
  });

  gsap.fromTo('.matrix-card',
    { y: 40, opacity: 0 },
    {
      scrollTrigger: { trigger: '.scale-matrix', start: 'top 85%' },
      y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out'
    }
  );

  gsap.fromTo('.teaser-image',
    { scale: 1.2, opacity: 0 },
    {
      scrollTrigger: { trigger: '.work-teaser', start: 'top 75%' },
      scale: 1, opacity: 0.4, duration: 2, ease: 'power3.out'
    }
  );

  gsap.fromTo('.philosophy-teaser .word-reveal',
    { y: 30, opacity: 0 },
    {
      scrollTrigger: { trigger: '.philosophy-teaser', start: 'top 80%' },
      y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out'
    }
  );

  // Force ScrollTrigger to recalculate layout after dynamic injection
  setTimeout(() => ScrollTrigger.refresh(), 100);
};


// ═══════════════════════════════════════
// 5. ABOUT PAGE — CRYSTAL GEMSTONE CLUSTER
// ═══════════════════════════════════════
const initAbout3D = () => {
  const container = document.getElementById('about-3d-container');
  if (!container) return;

  container.innerHTML = '';
  const W = container.clientWidth || 600;
  const H = container.clientHeight || 700;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
  camera.position.set(0, 0, 8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  container.appendChild(renderer.domElement);

  // ── Procedural Studio Environment Map ─────────────────────
  // High contrast stark lights are required for metal to look polished and reflective
  const envSize = 256;
  const makeFace = (isTop, isSide) => {
    const c = document.createElement('canvas');
    c.width = c.height = envSize;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#050505'; // Dark background
    ctx.fillRect(0, 0, envSize, envSize);
    
    // Bright studio softbox reflections
    if (isTop) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(envSize*0.2, envSize*0.2, envSize*0.6, envSize*0.6);
    } else if (isSide) {
      ctx.fillStyle = '#aaffdd';
      ctx.fillRect(envSize*0.1, envSize*0.4, envSize*0.8, envSize*0.05);
      ctx.fillStyle = '#ffcc88';
      ctx.fillRect(envSize*0.4, envSize*0.1, envSize*0.05, envSize*0.8);
    } else {
      ctx.fillStyle = '#222222';
      ctx.beginPath(); ctx.arc(envSize/2, envSize/2, envSize*0.3, 0, Math.PI*2); ctx.fill();
    }
    return c;
  };
  const envMap = new THREE.CubeTexture([
    makeFace(false, true), makeFace(false, true), makeFace(true, false), 
    makeFace(false, false), makeFace(false, true), makeFace(false, true)
  ]);
  envMap.needsUpdate = true;

  // ── Lights ──────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x404040, 2.5));
  const keyLight = new THREE.DirectionalLight(0xffd080, 4.0);
  keyLight.position.set(5, 5, 4);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x1a8060, 2.0);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);
  const glowLight = new THREE.PointLight(0xffcc88, 2, 10);
  scene.add(glowLight);

  const group = new THREE.Group();
  scene.add(group);
  group.scale.set(0.65, 0.65, 0.65);

  let seed = 42;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const rndRange = (min, max) => min + rnd() * (max - min);

  // ── Materials (Restored) ──────────────────────────────────
  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6b840, emissive: 0x221500, emissiveIntensity: 0.2,
    roughness: 0.15, metalness: 1.0, clearcoat: 1.0, envMap: envMap,
    envMapIntensity: 3.0, flatShading: true 
  });

  const tealMat = new THREE.MeshPhysicalMaterial({
    color: 0x20a090, emissive: 0x001010, emissiveIntensity: 0.1,
    roughness: 0.2, metalness: 0.6, clearcoat: 0.5, envMap: envMap,
    envMapIntensity: 2.0, flatShading: true
  });

  const rockMat = new THREE.MeshPhysicalMaterial({
    color: 0x2a1a10, emissive: 0x000000,
    roughness: 0.9, metalness: 0.2, envMap: envMap, envMapIntensity: 0.5,
    flatShading: true
  });

  const crustGoldMat = new THREE.MeshPhysicalMaterial({
    color: 0xa87b32, emissive: 0x0a0500, emissiveIntensity: 0.1,
    roughness: 0.4, metalness: 0.8, envMap: envMap, envMapIntensity: 1.5,
    flatShading: true
  });

  // ── Helper to build primitives ────────────────────────────
  const makeGem = (mat, geo, pos, rot, scale) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    mesh.scale.set(...scale);
    return mesh;
  };

  // 1. Crystal Core (Teal and Gold Platonic Solids intersecting perfectly)
  for (let i = 0; i < 20; i++) {
     const mat = rnd() > 0.4 ? tealMat : goldMat;
     
     let geo;
     const r = rnd();
     if (r < 0.33) geo = new THREE.DodecahedronGeometry(1.2, 0); // huge pentagonal facets
     else if (r < 0.66) geo = new THREE.OctahedronGeometry(1.4, 0); // huge triangular facets
     else geo = new THREE.IcosahedronGeometry(1.3, 0); // huge triangular facets

     const mesh = makeGem(mat, geo, 
         [rndRange(-0.3, 0.3), rndRange(-0.3, 0.3), rndRange(-0.3, 0.3)], 
         [rnd()*Math.PI, rnd()*Math.PI, rnd()*Math.PI], 
         [1, 1, 1]
     );
     
     // Uniform scale so they are chunky blocks, NOT long spikes
     const s = rndRange(0.8, 1.4);
     mesh.scale.set(s, s, s);
     
     group.add(mesh);

     // Add delicate wireframe to some faces to mimic the sacred geometry etchings
     if (i % 3 === 0) {
         const wireMesh = new THREE.LineSegments(
             new THREE.WireframeGeometry(geo), 
             new THREE.LineBasicMaterial({ color: 0xffeebb, transparent: true, opacity: 0.25 })
         );
         wireMesh.scale.set(1.002, 1.002, 1.002);
         mesh.add(wireMesh);
     }
  }


  // 2. Chunky Rock Crust wrapping the core
  // Detail=1 gives chunky, faceted boulders that look perfectly like thick carved rock
  const rockGeo = new THREE.DodecahedronGeometry(1, 1); 
  const crustCount = 45;
  
  for (let i = 0; i < crustCount; i++) {
     // A mix of dark rock and dull, unpolished crusty gold
     const mat = rnd() > 0.3 ? rockMat : crustGoldMat;
     
     // Distribute evenly on a sphere using a Fibonacci spiral
     const phi = Math.acos(1 - 2 * (i + 0.5) / crustCount);
     const theta = Math.PI * (1 + Math.sqrt(5)) * i;
     const x = Math.cos(theta) * Math.sin(phi);
     const y = Math.sin(theta) * Math.sin(phi);
     const z = Math.cos(phi);

     // Leave a massive viewing window in the front to reveal the glowing core
     if (z > 0.1 && x > -0.7 && x < 0.7 && y > -0.7 && y < 0.7) continue;

     const mesh = makeGem(mat, rockGeo, 
         [x * 1.3, y * 1.3, z * 1.3], 
         [rnd()*Math.PI, rnd()*Math.PI, rnd()*Math.PI], 
         [1, 1, 1]
     );
     
     // Uniform random scale to make the crust jagged and thick
     mesh.scale.set(rndRange(0.6, 1.2), rndRange(0.6, 1.2), rndRange(0.6, 1.2));
     
     group.add(mesh);
  }

  // ── Interaction & Animation ───────────────────────────────
  let tgtX = 0, tgtY = 0;
  container.addEventListener('mousemove', e => {
    const r = container.getBoundingClientRect();
    tgtY =  ((e.clientX - r.left) / r.width  - 0.5) * 1.0;
    tgtX = -((e.clientY - r.top)  / r.height - 0.5) * 1.0;
  });
  container.addEventListener('mouseleave', () => { tgtX = 0; tgtY = 0; });

  const clock = new THREE.Clock();
  const animate = () => {
    if (!document.getElementById('about-3d-container')) { renderer.dispose(); return; }
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    group.rotation.y += (tgtY - group.rotation.y) * 0.05 + 0.003;
    group.rotation.x += (tgtX - group.rotation.x) * 0.05 + 0.001;
    group.rotation.z += 0.001;

    glowLight.position.set(Math.sin(t*0.5)*1.5, Math.cos(t*0.4)*1.5, Math.sin(t*0.3)*1.5);
    glowLight.intensity = 2.0 + Math.sin(t * 2.0) * 1.0;

    renderer.render(scene, camera);
  };
  animate();

  // ── Resize ────────────────────────────────────────────────
  new ResizeObserver(() => {
    const w = container.clientWidth, h = container.clientHeight;
    if (w && h) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
  }).observe(container);
};

// ═══════════════════════════════════════
// 4. GSAP SCROLL ANIMATIONS
// ═══════════════════════════════════════
const initAnimations = () => {
  // Check if we are on a mobile device to reduce heavy animations
  const isMobile = window.innerWidth < 768;

  // Fade in titles
  gsap.utils.toArray('.axon-section-title').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 85%' } }
    );
  });

  // Stagger Bento Cards
  gsap.utils.toArray('.bento-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.bento-card');
    gsap.set(grid, { perspective: 1000 });
    gsap.fromTo(cards,
      { opacity: 0, y: 80, scale: 0.9, rotationX: 15 },
      { 
        opacity: 1, y: 0, scale: 1, rotationX: 0, 
        duration: 1.2, stagger: 0.1, ease: 'back.out(1.5)', 
        scrollTrigger: { trigger: grid, start: 'top 85%' },
        onComplete: () => {
          gsap.to(cards, { y: -4, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: { amount: 1, from: "random" } });
        }
      }
    );
  });

  // Insights Cards
  gsap.utils.toArray('.insights-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.insight-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', 
        scrollTrigger: { trigger: grid, start: 'top 85%' },
        onComplete: () => {
          gsap.to(cards, { y: -6, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: { amount: 1, from: "random" } });
        }
      }
    );
  });

  // Split Layout Reveal
  gsap.utils.toArray('.split-layout').forEach(split => {
    gsap.fromTo(split,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: split, start: 'top 70%' } }
    );
  });

  // ── NEW: Infinite Marquee ──
  gsap.utils.toArray('.marquee').forEach(marquee => {
    // Translate 50% to the left, seamlessly looping (content is duplicated)
    const tl = gsap.to(marquee, { xPercent: -50, repeat: -1, duration: 25, ease: 'linear' });
    
    // Link to scroll velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Speed up the marquee based on how fast the user scrolls
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 0) {
          const speedMultiplier = 1 + (velocity / 400);
          gsap.to(tl, { timeScale: speedMultiplier, duration: 0.1, overwrite: true });
          // Return to normal speed shortly after
          gsap.to(tl, { timeScale: 1, duration: 0.8, delay: 0.1, overwrite: true });
        }
      }
    });
  });
};

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
const reInitViewLogic = () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  initHome3D();
  initAbout3D();
  initHeroAnimations();
  initAnimations();
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  
  // Header Scroll State
  const header = document.querySelector('.header');
  lenis.on('scroll', (e) => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  initCursor();
  initWebGL();
  const router = new Router('app-view', reInitViewLogic);
  initChatbot(router);
  router.bindLinks();
});
