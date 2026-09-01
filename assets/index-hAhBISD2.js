import{C as e,D as t,E as n,O as r,S as i,T as a,_ as o,a as s,b as c,c as l,d as u,f as d,g as f,h as p,i as m,l as h,m as g,n as ee,o as _,p as v,r as y,s as b,t as x,u as te,v as ne,w as S,x as C,y as w}from"./three-C_5mWv6D.js";import{n as T,r as E,t as D}from"./animations-8hXJE8R5.js";import{t as O}from"./markdown-hwGewQet.js";var k=Object.defineProperty,A=(e,t)=>{let n={};for(var r in e)k(n,r,{get:e[r],enumerable:!0});return t||k(n,Symbol.toStringTag,{value:`Module`}),n};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var j=A({body:()=>re,category:()=>P,date:()=>F,default:()=>ie,excerpt:()=>R,id:()=>M,image:()=>L,readTime:()=>I,title:()=>N}),M=`architecting-scalable-microservices`,N=`Architecting Scalable Microservices for High-Traffic Platforms`,P=`SOFTWARE ARCHITECTURE`,F=`2026-07-18T00:00:00.000Z`,I=`8 min read`,L=`/images/portfolio_1.png`,R=`Microservices aren't a magic bullet. They just replace one big problem with a dozen small, highly complex ones. Here is how to keep them from crashing.`,re=`## Beyond the Monolith

Teams often rush to microservices expecting infinite scale. Instead, they usually end up with a distributed monolith that breaks in spectacular, unpredictable ways.

### The Cascading Failure Problem

If Service A calls Service B, and Service B is slow, Service A hangs. Before long, Service A runs out of threads and crashes, taking down Service C with it. This is a cascading failure.

### Defensive Architecture

- **Circuit Breakers:** When a downstream service gets slow, the circuit trips. Service A immediately returns an error instead of waiting and hanging the system.
- **Bulkheads:** Isolate critical resources. If one feature gets hammered with traffic, it shouldn't take down the checkout system.
- **Event-Driven Asynchrony:** Stop making synchronous HTTP calls everywhere. Use message brokers to fire events and move on.

Good engineering expects failure. At The Qlip, we build systems that degrade gracefully rather than crash catastrophically.`,ie={id:M,title:N,category:P,date:F,readTime:I,image:L,excerpt:R,body:re},ae=A({body:()=>G,category:()=>B,date:()=>V,default:()=>se,excerpt:()=>W,id:()=>oe,image:()=>U,readTime:()=>H,title:()=>z}),oe=`local-llms-privacy-first-ai`,z=`Implementing Local LLMs: Privacy-First AI for Enterprise Data`,B=`ARTIFICIAL INTELLIGENCE`,V=`2026-07-10T00:00:00.000Z`,H=`5 min read`,U=`/images/portfolio_3.png`,W=`Sending corporate data to third-party APIs is a massive security risk. We run highly capable models on-premise, keeping data strictly inside the firewall.`,G=`## The Data Privacy Dilemma

Generative AI is a massive productivity multiplier, but if you are handling proprietary IP or healthcare records, you cannot just paste them into a public API. It violates compliance, and it is terrible security hygiene.

### The Rise of Local Models

Open-weights models have reached the point where they are good enough for most enterprise tasks. By quantizing them, we can run them blazingly fast on standard hardware—no massive GPU clusters required.

### How We Deploy

We deploy optimized inference servers entirely within a client's VPC. The data never leaves the network.

- **RAG (Retrieval-Augmented Generation):** We connect local LLMs to secure vector databases, giving the AI context over company documents without exposing those documents to the internet.
- **Targeted Fine-Tuning:** Instead of relying on massive general models, we fine-tune smaller, faster models on specific tasks—like parsing messy technical logs.

The future of enterprise AI isn't a single god-model in the cloud. It is small, highly secure, specialized models running locally.`,se={id:oe,title:z,category:B,date:V,readTime:H,image:U,excerpt:W,body:G},ce=A({body:()=>me,category:()=>le,date:()=>ue,default:()=>he,excerpt:()=>pe,id:()=>K,image:()=>fe,readTime:()=>de,title:()=>q}),K=`zero-trust-architecture-2026`,q=`Zero-Trust Architecture: Hardening Enterprise Systems in 2026`,le=`CYBERSECURITY`,ue=`2026-07-24T00:00:00.000Z`,de=`6 min read`,fe=`/images/portfolio_4.png`,pe=`Perimeter security is dead. Here is how we build zero-trust networks that assume every request is hostile.`,me=`## The End of the Perimeter

For years, enterprise security relied on a simple concept: trust everyone inside the network, and block everyone outside. That model is broken. With distributed teams and cloud-native deployments, the "perimeter" no longer exists.

### What is Zero-Trust?

Zero-Trust operates on a singular rule: **never trust, always verify.** Every request, whether it comes from a remote laptop or an internal microservice, must be authenticated and authorized before access is granted.

### How We Do It

- **Microsegmentation:** Break the network into isolated zones. If a breach happens, the attacker has nowhere to go.
- **Identity-Aware Proxies:** Tie access controls directly to user identity and device health, not just IP addresses.
- **Hostile Monitoring:** We assume the network is already compromised and monitor traffic for lateral movement.

At The Qlip, we rip out outdated VPNs and replace them with zero-trust frameworks. It takes careful engineering, but the result is an infrastructure that simply ignores attacks.`,he={id:K,title:q,category:le,date:ue,readTime:de,image:fe,excerpt:pe,body:me},J=Object.values(Object.assign({"../../public/content/insights/architecting-scalable-microservices.json":j,"../../public/content/insights/local-llms-privacy-first-ai.json":ae,"../../public/content/insights/zero-trust-architecture-2026.json":ce})).map(e=>e.default||e).map(e=>(e.date&&(e.dateStr=new Date(e.date).toLocaleDateString(`en-US`,{year:`numeric`,month:`long`,day:`numeric`})),e.body&&(e.content=e.body),e)).sort((e,t)=>new Date(t.date)-new Date(e.date)),ge=e=>J.find(t=>t.id===e),_e=`
      <section id="hero" class="axon-hero">
        <div class="hud-corners">
          <div class="hud-corner top-left">SYS.01 // ONLINE</div>
          <div class="hud-corner top-right">LAT: 37.77 // LNG: 122.41</div>
          <div class="hud-corner bottom-left">SEC-9</div>
          <div class="hud-corner bottom-right">Q-CORE V2.4</div>
        </div>
        
        <div class="container axon-hero-container asymmetrical">
          <!-- Left Content -->
          <div class="hero-content-left">
            <div class="hero-pre-title">
              <span class="pill-border pulse-dot-container"><span class="pulse-dot"></span> [LATEST] The Qlip AI Agent is now in beta &rarr;</span>
            </div>
            <h1 class="axon-title">
              ENGINEERING THAT<br>DEFINES <span>TOMORROW.</span>
            </h1>
            <p class="axon-subtitle">
              We build high-performance software, applied AI, and secure infrastructure for the world's most demanding environments.
            </p>
            <div class="hero-cta-group">
              <a href="/work" class="btn-explore primary" data-link>ENGAGE THE QLIP</a>
              <a href="/insights" class="btn-explore ghost" data-link>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                VIEW INTEL
              </a>
            </div>
          </div>
          
          <!-- Right HUD Data Panel -->
          <div class="hero-content-right">
            <div class="hud-panel glass-card">
              <div class="hud-header">
                <span class="hud-title">SYSTEM STATUS</span>
                <span class="hud-status green">OPTIMAL</span>
              </div>
              <div class="hud-body">
                <div class="hud-data-row"><span>SYSTEM UPTIME</span><span>99.999%</span></div>
                <div class="hud-data-row"><span>SECURE ENDPOINTS</span><span>2,408</span></div>
                <div class="hud-data-row"><span>CLOUD LATENCY</span><span>8ms</span></div>
                <div class="hud-visual">
                  <div class="rotating-wireframe"></div>
                </div>
                <div class="hud-stream">
                  <span class="stream-line">> INIT Q-CORE...</span>
                  <span class="stream-line">> ALLOCATING RESOURCES...</span>
                  <span class="stream-line">> SYSTEM READY.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trusted By Banner -->
        <div class="trusted-by-banner">
          <div class="container">
            <p class="trusted-label">INFRASTRUCTURE TRUSTED BY</p>
            <div class="trusted-logos">
              <span>ACME CORP</span>
              <span>NEXUS INDUSTRIES</span>
              <span>VERTEX AI</span>
              <span>CYBERDYNE</span>
              <span>QUANTUM LABS</span>
            </div>
          </div>
        </div>

        <!-- INFINITE MARQUEE (Now at the bottom of hero) -->
        <div class="marquee-wrapper">
          <div class="marquee">
            <span>INTELLIGENCE ENGINEERED &middot;</span>
            <span>SECURE INFRASTRUCTURE &middot;</span>
            <span>AUTONOMOUS SYSTEMS &middot;</span>
            <span>ZERO-TRUST ARCHITECTURE &middot;</span>
            <span>INTELLIGENCE ENGINEERED &middot;</span>
            <span>SECURE INFRASTRUCTURE &middot;</span>
            <span>AUTONOMOUS SYSTEMS &middot;</span>
            <span>ZERO-TRUST ARCHITECTURE &middot;</span>
          </div>
        </div>
      </section>

      <!-- REVOLUTIONIZING INDUSTRIES -->
      <section id="solutions" class="axon-solutions">
        <div class="container">
          
          <div class="section-header">
            <span class="sub-label">CORE CAPABILITIES</span>
            <h2 class="axon-section-title">WHAT WE BUILD</h2>
          </div>

          <div class="bento-grid">
            
            <a href="/services/software-engineering" class="bento-card bento-wide" data-link>
              <div class="bento-content">
                <h3>SOFTWARE<br>ENGINEERING</h3>
                <p class="bento-desc">We build backend infrastructure and fast interfaces designed to handle real traffic without failing.</p>
                <div class="bento-footer">
                  <span class="bento-index">01</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_1.png');"></div>
            </a>

            <a href="/services/machine-learning" class="bento-card bento-wide" data-link>
              <div class="bento-content">
                <h3>ARTIFICIAL<br>INTELLIGENCE</h3>
                <p class="bento-desc">Custom LLMs, neural networks, and applied ML models trained specifically for strict business outcomes.</p>
                <div class="bento-footer">
                  <span class="bento-index">02</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_2.png');"></div>
            </a>

            <a href="/services/training-consultancy" class="bento-card bento-tall" data-link>
              <div class="bento-content">
                <h3>TRAINING</h3>
                <p class="bento-desc">Intensive, hands-on engineering and AI training designed specifically for technical teams.</p>
                <div class="bento-footer">
                  <span class="bento-index">03</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_2.png');"></div>
            </a>

            <a href="/services/testing-support" class="bento-card bento-wide" data-link>
              <div class="bento-content">
                <h3>SYSTEM<br>TESTING</h3>
                <p class="bento-desc">Automated pipelines and rigorous manual testing. We catch failures long before they reach production.</p>
                <div class="bento-footer">
                  <span class="bento-index">04</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_4.png');"></div>
            </a>

            <a href="/services/multimedia" class="bento-card bento-tall" data-link>
              <div class="bento-content">
                <h3>MULTIMEDIA</h3>
                <p class="bento-desc">High-end 3D rendering, sleek web applications, and interactive digital experiences.</p>
                <div class="bento-footer">
                  <span class="bento-index">05</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_1.png');"></div>
            </a>

            <a href="/services/cybersecurity" class="bento-card bento-wide" data-link>
              <div class="bento-content">
                <h3>CYBERSECURITY<br>& DATA</h3>
                <p class="bento-desc">Zero-trust architecture and offensive security testing to keep your infrastructure quiet and secure.</p>
                <div class="bento-footer">
                  <span class="bento-index">06</span>
                  <span class="bento-arrow">&rarr;</span>
                </div>
              </div>
              <div class="bento-bg" style="background-image: url('/images/portfolio_3.png');"></div>
            </a>

          </div>
        </div>
      </section>

      <!-- TECHNOLOGY MARQUEE -->
      <section class="tech-marquee">
        <div class="marquee-content">
          <span>TENSORFLOW</span><span class="dot">&bull;</span>
          <span>KUBERNETES</span><span class="dot">&bull;</span>
          <span>REACT</span><span class="dot">&bull;</span>
          <span>WEBGL</span><span class="dot">&bull;</span>
          <span>RUST</span><span class="dot">&bull;</span>
          <span>PYTORCH</span><span class="dot">&bull;</span>
          <span>NODE.JS</span><span class="dot">&bull;</span>
          <span>CRYPTOGRAPHY</span><span class="dot">&bull;</span>
          <!-- Duplicate for infinite scroll -->
          <span>TENSORFLOW</span><span class="dot">&bull;</span>
          <span>KUBERNETES</span><span class="dot">&bull;</span>
          <span>REACT</span><span class="dot">&bull;</span>
          <span>WEBGL</span><span class="dot">&bull;</span>
          <span>RUST</span><span class="dot">&bull;</span>
          <span>PYTORCH</span><span class="dot">&bull;</span>
          <span>NODE.JS</span><span class="dot">&bull;</span>
          <span>CRYPTOGRAPHY</span><span class="dot">&bull;</span>
        </div>
      </section>

      <!-- SCALE MATRIX -->
      <section class="scale-matrix">
        <div class="container">
          <div class="matrix-grid">
            <div class="matrix-card">
              <div class="matrix-num"><span class="counter" data-target="200">0</span>+</div>
              <p>PROJECTS DEPLOYED</p>
            </div>
            <div class="matrix-card">
              <div class="matrix-num">$<span class="counter" data-target="12">0</span>M+</div>
              <p>REVENUE GENERATED</p>
            </div>
            <div class="matrix-card">
              <div class="matrix-num"><span class="counter" data-target="35">0</span>+</div>
              <p>DEEP-TECH SPECIALISTS</p>
            </div>
          </div>
        </div>
      </section>

      <!-- THE ARCHITECTURE (WORK TEASER) -->
      <section class="work-teaser">
        <div class="teaser-split">
          <div class="teaser-visual">
            <div class="glowing-grid-bg"></div>
            <img src="/images/portfolio_3.png" class="teaser-image" alt="Engineering architecture system layout by The Qlip" loading="lazy" decoding="async">
            <div class="teaser-overlay"></div>
          </div>
          <div class="teaser-text">
            <span class="sub-label">THE ARCHITECTURE</span>
            <h2 class="axon-section-title" style="margin-bottom: 40px;">WE BUILD THE SYSTEMS THAT BUILD THE FUTURE.</h2>
            <a href="/work" class="btn-explore" data-link>
              VIEW THE WORK &rarr;
            </a>
          </div>
        </div>
      </section>

      <!-- LATEST INSIGHTS TEASER -->
      <section class="insights-teaser" style="padding: 150px 0;">
        <div class="container">
          <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; flex-wrap: wrap; gap: 20px;">
            <div>
              <span class="sub-label">LATEST INTEL</span>
              <h2 class="axon-section-title" style="margin-bottom: 0;">RESEARCH & INSIGHTS</h2>
            </div>
            <a href="/insights" class="btn-explore" data-link style="background: transparent; border: 1px solid var(--border); color: var(--text); padding: 12px 24px;">
              VIEW ALL INTEL &rarr;
            </a>
          </div>
          <div class="insights-grid">
            ${J.slice(0,3).map((e,t)=>`
  <a href="/insights/${e.id}" class="insight-card magnetic" data-link style="animation-delay: ${t*.1}s">
    <div class="insight-image-wrapper">
      <img src="${e.image}" alt="${e.title}" class="insight-image" loading="lazy" decoding="async" />
      <div class="insight-overlay"></div>
    </div>
    <div class="insight-content">
      <div class="insight-meta">
        <span class="insight-category">${e.category}</span>
        <span class="insight-date">${e.readTime}</span>
      </div>
      <h3 class="insight-title" style="font-size: 1.5rem;">${e.title}</h3>
      <div class="insight-footer" style="margin-top: auto;">
        <span class="read-more">Read Intel</span>
        <span class="bento-arrow">&rarr;</span>
      </div>
    </div>
  </a>
`).join(``)}
          </div>
        </div>
      </section>

      <!-- THE PHILOSOPHY (ABOUT TEASER) -->
      <section class="philosophy-teaser">
        <div class="container text-center">
          <h2 class="massive-serif word-reveal">Intelligence is not just artificial.</h2>
          <h2 class="massive-serif word-reveal text-gradient" style="font-style: italic;">It is engineered.</h2>
          
          <div style="margin-top: 60px;">
            <a href="/about" class="btn-explore" data-link style="background: transparent; border: 1px solid var(--border); color: var(--text);">
              READ OUR PHILOSOPHY &rarr;
            </a>
          </div>
        </div>
      </section>
`,ve=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">Software</span><br>
          <span class="word-reveal" style="font-style: italic;">Engineering.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 01</p>
          <ul>
            <li>System Architecture</li>
            <li>Cloud Native Apps</li>
            <li>High-Availability APIs</li>
            <li>Microservices</li>
          </ul>
        </div>
        <div class="article-text">
          <p>We do not just write code; we architect resilient digital ecosystems. Our software engineering discipline is built on a foundation of zero-trust security, absolute scalability, and uncompromising performance.</p>
          <p>From monolithic enterprise platforms to distributed global microservices, we build systems that are designed to handle millions of transactions per second without a single point of failure.</p>
          
          <h3>The Tech Stack</h3>
          <p>We leverage the cutting edge of modern web and systems engineering. Our toolchain includes Rust for performance-critical systems, Node.js for scalable I/O, and advanced cloud orchestration through Kubernetes.</p>
        </div>
      </div>
    </div>
  </section>
`,ye=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">System</span><br>
          <span class="word-reveal" style="font-style: italic;">Testing.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 02</p>
          <ul>
            <li>Automated QA</li>
            <li>Load Testing</li>
            <li>Stress Analysis</li>
            <li>CI/CD Pipelines</li>
          </ul>
        </div>
        <div class="article-text">
          <p>A system is only as strong as the breaking point it can withstand. Our testing methodologies are brutal, comprehensive, and entirely automated.</p>
          <p>We do not rely on manual QA. We build sophisticated testing matrices that simulate millions of concurrent users, chaotic network conditions, and edge-case data mutations to ensure your platform never fails in production.</p>
          
          <h3>The Methodology</h3>
          <p>Using custom-built load generators and distributed testing suites, we push systems past their theoretical limits. If it can be broken, we will break it before your users ever see it.</p>
        </div>
      </div>
    </div>
  </section>
`,be=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">Multimedia</span><br>
          <span class="word-reveal" style="font-style: italic;">& UI.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 03</p>
          <ul>
            <li>WebGL Interfaces</li>
            <li>Interactive 3D</li>
            <li>Motion Design</li>
            <li>User Experience</li>
          </ul>
        </div>
        <div class="article-text">
          <p>Aesthetics are not an afterthought; they are the primary interface through which humans understand complexity. We engineer digital experiences that are as beautiful as they are functional.</p>
          <p>Our design team blurs the line between software engineering and digital art, using advanced WebGL and fluid simulations to create interfaces that feel alive, responsive, and truly premium.</p>
          
          <h3>The Canvas</h3>
          <p>We bypass standard DOM limitations by rendering directly to the GPU. This allows us to achieve 60fps cinematic motion and particle effects on any device, from high-end workstations to mobile phones.</p>
        </div>
      </div>
    </div>
  </section>
`,xe=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">Cybersecurity</span><br>
          <span class="word-reveal" style="font-style: italic;">& Data.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 04</p>
          <ul>
            <li>Threat Intelligence</li>
            <li>Zero-Trust Networks</li>
            <li>Data Encryption</li>
            <li>Penetration Testing</li>
          </ul>
        </div>
        <div class="article-text">
          <p>In an era of unprecedented digital threats, perimeter defense is no longer sufficient. We engineer absolute security protocols that assume compromise and demand verification at every node.</p>
          <p>Our cybersecurity teams operate like elite digital strike forces. We proactively audit, penetration-test, and fortify your infrastructure, ensuring your proprietary data remains cryptographically sealed.</p>
          
          <h3>The Arsenal</h3>
          <p>We deploy AI-driven threat detection systems that monitor network anomalies in real-time, executing automated countermeasures faster than humanly possible.</p>
        </div>
      </div>
    </div>
  </section>
`,Se=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">Machine</span><br>
          <span class="word-reveal" style="font-style: italic;">Learning.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 05</p>
          <ul>
            <li>Predictive Analytics</li>
            <li>Computer Vision</li>
            <li>NLP & LLMs</li>
            <li>Automation</li>
          </ul>
        </div>
        <div class="article-text">
          <p>We train neural networks that redefine the boundaries of computational logic. Our machine learning models are designed to find signal in the noise, turning massive unstructured datasets into actionable intelligence.</p>
          <p>From predictive supply chain algorithms to bespoke Large Language Models trained on enterprise proprietary data, we engineer intelligence that gives you an unfair advantage.</p>
          
          <h3>The Architecture</h3>
          <p>Our models are trained on highly distributed GPU clusters and deployed to edge nodes via optimized ONNX runtimes, ensuring sub-millisecond inference times anywhere on the globe.</p>
        </div>
      </div>
    </div>
  </section>
`,Ce=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">Training &</span><br>
          <span class="word-reveal" style="font-style: italic;">Consultancy.</span>
        </h1>
      </div>
      <div class="article-content">
        <div class="article-meta">
          <p>Discipline 06</p>
          <ul>
            <li>Executive Strategy</li>
            <li>Tech Upskilling</li>
            <li>Architecture Review</li>
            <li>Agile Transformation</li>
          </ul>
        </div>
        <div class="article-text">
          <p>True digital transformation requires more than just new software; it requires a fundamental shift in human capability. We partner with enterprise leadership to architect the future of their workforce.</p>
          <p>Our senior engineers and strategists embed directly with your teams, transferring decades of hard-won knowledge in systems architecture, machine learning, and cybersecurity.</p>
          
          <h3>The Exchange</h3>
          <p>We do not offer generic bootcamps. Our consultancy is bespoke, tailored to the specific technical debt and ambitious roadmaps of your organization. We elevate your internal teams to world-class standards.</p>
        </div>
      </div>
    </div>
  </section>
`,we=`
  <section class="editorial-article">
    <div class="container">
      <div class="article-header">
        <h1 class="article-title">
          <span class="word-reveal">The Work.</span>
        </h1>
        <p class="hero-tagline" style="margin-top: 40px; font-family: var(--font-display); font-size: 1.5rem; color: var(--text);">
          A curated selection of our finest architectural and digital achievements.
        </p>
      </div>

      <div class="portfolio-grid">
        <div class="portfolio-item abstract-1 magnetic" style="background-image: url('/images/portfolio_1.png'); background-size: cover; background-position: center;">
          <div class="portfolio-overlay">
            <h4>Project Alpha</h4>
            <p>Neural Network Infrastructure</p>
          </div>
        </div>
        <div class="portfolio-item abstract-2 magnetic" style="background-image: url('/images/portfolio_2.png'); background-size: cover; background-position: center;">
          <div class="portfolio-overlay">
            <h4>Nexus Core</h4>
            <p>Cybersecurity Perimeter</p>
          </div>
        </div>
        <div class="portfolio-item abstract-3 magnetic" style="background-image: url('/images/portfolio_3.png'); background-size: cover; background-position: center;">
          <div class="portfolio-overlay">
            <h4>Echelon</h4>
            <p>Enterprise Scalability</p>
          </div>
        </div>
        <div class="portfolio-item abstract-4 magnetic" style="background-image: url('/images/portfolio_4.png'); background-size: cover; background-position: center;">
          <div class="portfolio-overlay">
            <h4>Vanguard</h4>
            <p>Predictive Analytics</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`,Te=`
  <section class="split-layout">
    <div class="split-text">
      <h1 class="article-title"><span class="word-reveal">Philosophy.</span></h1>
      <p class="hero-tagline" style="margin-top: 40px; font-family: var(--font-display); font-size: 1.5rem; color: var(--text);">
        We believe that true intelligence isn't just artificial. It's deeply engineered.
      </p>
      <div class="editorial-body" style="margin-top: 40px;">
        <p>We don't chase trends. We build the systems that power the next decade of technology. From high-availability software to secure cyber perimeters, our engineering is driven by a single rule: it has to work flawlessly.</p>
        <p>Our team combines deep expertise in machine learning, offensive security, and enterprise architecture. We partner with ambitious companies to solve incredibly hard problems, turning technical chaos into quiet, reliable infrastructure.</p>
      </div>

      <div style="margin-top: 80px;">
        <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 20px;">Get in Touch</h3>
        <form class="minimal-form">
          <input type="text" placeholder="Your Name" class="form-input">
          <input type="email" placeholder="Your Email" class="form-input">
          <textarea placeholder="How can we help?" class="form-input" rows="4"></textarea>
          <button type="submit" class="btn-explore" style="margin-top: 20px; border: none; cursor: pointer;">
            Submit
          </button>
        </form>
      </div>
    </div>
    
    <div class="split-visual" id="about-3d-container">
      <!-- 3D Object will be rendered here by Three.js -->
    </div>
  </section>
`,Ee=()=>`
    <section class="insights-hero" style="padding-top: 150px; padding-bottom: 50px;">
      <div class="container text-center">
        <span class="sub-label">RESEARCH & INTEL</span>
        <h1 class="axon-section-title">Insights</h1>
        <p class="section-desc" style="margin: 0 auto;">Deep dives into software architecture, cybersecurity, and applied artificial intelligence.</p>
      </div>
    </section>

    <section class="insights-grid-section" style="padding-bottom: 150px;">
      <div class="container">
        <div class="insights-grid">
          ${J.map((e,t)=>`
    <a href="/insights/${e.id}" class="insight-card magnetic" data-link style="animation-delay: ${t*.1}s">
      <div class="insight-image-wrapper">
        <img src="${e.image}" alt="${e.title}" class="insight-image" loading="lazy" decoding="async" />
        <div class="insight-overlay"></div>
      </div>
      <div class="insight-content">
        <div class="insight-meta">
          <span class="insight-category">${e.category}</span>
          <span class="insight-date">${e.dateStr||e.date} &middot; ${e.readTime}</span>
        </div>
        <h3 class="insight-title">${e.title}</h3>
        <p class="insight-excerpt">${e.excerpt}</p>
        <div class="insight-footer">
          <span class="read-more">Read Intel</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    </a>
  `).join(``)}
        </div>
      </div>
    </section>
  `,Y={name:`The Qlip`,tagline:`Intelligence, Engineered.`,url:`https://theqlip.com`.replace(/\/+$/,``),email:`theqlipglobal@gmail.com`,phone:`+2347087342882`,whatsapp:`https://wa.me/2347087342882`,logo:`/images/logo.png`,founded:`2024`,description:`The Qlip is a deep-tech engineering and AI agency. We build high-performance software, applied AI systems, secure zero-trust infrastructure, multimedia experiences, machine learning and robotics — and we train teams to run it all.`,socials:{linkedin:`https://www.linkedin.com/in/oluwayomi-favour-ogunniyi`,twitter:`https://x.com/the_qlip`,tiktok:`https://www.tiktok.com/@the_qlip`}},X=(e=`/`)=>`${Y.url}${e.startsWith(`/`)?``:`/`}${e}`,Z=e=>e.startsWith(`http`)?e:`${Y.url}${e}`,De={"/":{title:`The Qlip — AI Engineering, Software Development & Cybersecurity Agency`,description:`The Qlip engineers high-performance software, applied AI systems, machine learning, multimedia and secure zero-trust infrastructure for demanding industries. Software engineering, cybersecurity, ML & robotics, testing and technical consultancy.`},"/about":{title:`About The Qlip — Deep-Tech Engineering & AI Agency`,description:`The Qlip is a deep-tech engineering agency building the systems that power the next decade: machine learning, offensive security, enterprise architecture and applied AI.`},"/work":{title:`Our Work — Case Studies & Projects | The Qlip`,description:`A curated portfolio of The Qlip’s finest architectural and digital achievements — neural infrastructure, cybersecurity perimeters, enterprise scalability and predictive analytics.`},"/insights":{title:`Insights & Intel — Software, AI & Cybersecurity | The Qlip`,description:`Deep dives and research from The Qlip on software architecture, applied artificial intelligence, machine learning and cybersecurity. Engineering intel for technical teams.`},"/services/software-engineering":{title:`Software Engineering Services — System Architecture & APIs | The Qlip`,description:`High-availability APIs, microservices, cloud-native applications and resilient system architecture. The Qlip builds software engineered to handle real traffic without failing.`},"/services/testing-support":{title:`System Testing & QA Services — Load Testing, CI/CD | The Qlip`,description:`Automated QA, load testing, stress analysis and CI/CD pipelines. The Qlip pushes your systems past their limits so failures never reach production.`},"/services/multimedia":{title:`Multimedia & Interactive 3D Web Design | The Qlip`,description:`WebGL interfaces, interactive 3D, motion design and premium user experience. The Qlip engineers digital experiences as beautiful as they are functional.`},"/services/cybersecurity":{title:`Cybersecurity Services — Zero-Trust, Penetration Testing | The Qlip`,description:`Zero-trust networks, threat intelligence, penetration testing and AI-driven threat detection. The Qlip builds infrastructure that simply ignores attacks.`},"/services/machine-learning":{title:`Machine Learning & AI Development — LLMs, Computer Vision | The Qlip`,description:`Custom LLMs, neural networks, predictive analytics, NLP and computer vision. The Qlip engineers applied machine learning models trained for strict business outcomes.`},"/services/training-consultancy":{title:`Technical Training & Engineering Consultancy | The Qlip`,description:`Hands-on engineering and AI training, architecture reviews and agile transformation. The Qlip elevates technical teams to world-class standards.`}},Oe=(e,t={})=>{if(e.startsWith(`/insights/`)){let e=ge(t.id);return e?{title:`${e.title} | The Qlip`,description:e.excerpt||Y.description,ogType:`article`,image:e.image,article:e}:{title:`Intel Not Found | The Qlip`,description:`The requested research document could not be located in our databanks.`,ogType:`website`,image:Y.logo}}return{...De[e]||De[`/`],ogType:`website`,image:Y.logo}},ke=(e,t={})=>{let n=Oe(e,t),r=X(e),i=[Ae(),je()];return n.article&&(i.push(Me(n.article,r)),i.push(Ne(`Insights`,`/insights`,n.article.title,r))),e.startsWith(`/services/`)&&i.push(Pe(n.title.replace(` | The Qlip`,``),r)),i},Ae=()=>({"@context":`https://schema.org`,"@type":`Organization`,"@id":`${Y.url}/#organization`,name:Y.name,url:Y.url,logo:Z(Y.logo),image:Z(Y.logo),email:Y.email,telephone:Y.phone,slogan:Y.tagline,description:Y.description,sameAs:Object.values(Y.socials)}),je=()=>({"@context":`https://schema.org`,"@type":`WebSite`,"@id":`${Y.url}/#website`,name:Y.name,url:Y.url,publisher:{"@id":`${Y.url}/#organization`}}),Me=(e,t)=>({"@context":`https://schema.org`,"@type":`Article`,headline:e.title,description:e.excerpt,image:[Z(e.image)],datePublished:e.date,dateModified:e.date,author:{"@type":`Organization`,name:Y.name,url:Y.url},publisher:{"@id":`${Y.url}/#organization`},mainEntityOfPage:t}),Ne=(e,t,n,r)=>({"@context":`https://schema.org`,"@type":`BreadcrumbList`,itemListElement:[{"@type":`ListItem`,position:1,name:`Home`,item:Y.url},{"@type":`ListItem`,position:2,name:e,item:X(t)},{"@type":`ListItem`,position:3,name:n,item:r}]}),Pe=(e,t)=>({"@context":`https://schema.org`,"@type":`Service`,name:e,url:t,serviceType:e,provider:{"@id":`${Y.url}/#organization`},areaServed:`Worldwide`,availableChannel:[{"@type":`ServiceChannel`,availableLanguage:`en`,servicePhone:Y.phone}]}),Fe=(e,t={})=>ke(e,t).map(e=>JSON.stringify(e)).join(`
`),Ie=e=>{let t=ge(e.id);if(!t)return`
      <section class="container" style="padding-top: 150px; text-align: center; height: 60vh;">
        <h1 class="axon-section-title">Intel Not Found</h1>
        <p>The requested research document could not be located in our databanks.</p>
        <a href="/insights" class="btn-explore" data-link style="margin-top: 20px;">Return to Insights</a>
      </section>
    `;let n=O.parse(t.content),r=encodeURIComponent(`${Y.url}/insights/${t.id}`),i=encodeURIComponent(t.title),a=`https://www.linkedin.com/shareArticle?mini=true&url=${r}&title=${i}`,o=`https://twitter.com/intent/tweet?url=${r}&text=${i}`;return`
    <article class="article-view">
      <div class="article-hero">
        <div class="article-hero-bg">
          <img src="${t.image}" alt="${t.title}" fetchpriority="high" />
          <div class="article-hero-overlay"></div>
        </div>
        <div class="container article-hero-content text-center">
          <a href="/insights" class="back-link" data-link>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Insights
          </a>
          <div class="article-meta">
            <span class="insight-category">${t.category}</span>
            <span class="insight-date">${t.dateStr||t.date} &middot; ${t.readTime}</span>
          </div>
          <h1 class="article-title">${t.title}</h1>
        </div>
      </div>

      <div class="container article-body-container">
        <div class="article-content">
          ${n}
        </div>

        <div class="article-share">
          <p class="sub-label">SHARE THIS INTEL</p>
          <div class="share-buttons">
            <a class="share-btn magnetic" href="${a}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a class="share-btn magnetic" href="${o}" target="_blank" rel="noopener noreferrer">Twitter</a>
            <button class="share-btn magnetic" type="button" onclick="navigator.clipboard.writeText('${Y.url}/insights/${t.id}')">Copy Link</button>
          </div>
        </div>
      </div>
    </article>
  `},Q={"/":{view:_e},"/services/software-engineering":{view:ve},"/services/testing-support":{view:ye},"/services/multimedia":{view:be},"/services/cybersecurity":{view:xe},"/services/machine-learning":{view:Se},"/services/training-consultancy":{view:Ce},"/work":{view:we},"/about":{view:Te},"/insights":{view:Ee}},$=(e,t,n)=>{let r=document.head.querySelector(`meta[${e}="${t}"]`);r||(r=document.createElement(`meta`),r.setAttribute(e,t),document.head.appendChild(r)),r.setAttribute(`content`,n)},Le=(e,t)=>{let n=document.head.querySelector(`link[rel="${e}"]`);n||(n=document.createElement(`link`),n.setAttribute(`rel`,e),document.head.appendChild(n)),n.setAttribute(`href`,t)},Re=class{constructor(e,t){this.appContainer=document.getElementById(e),this.reInitAnimations=t,window.addEventListener(`popstate`,this.handleRoute.bind(this)),this.handleRoute()}async handleRoute(){let e=window.location.pathname;window.location.hash&&(e=window.location.hash.replace(`#`,`/`),window.history.replaceState({},``,e)),e!==`/`&&e.endsWith(`/`)&&(e=e.slice(0,-1));let t=e.split(`/`).filter(Boolean),n=Q[e],r={};if(!n&&e.startsWith(`/insights/`)){let e=t[1];e&&(n={view:Ie},r={id:e})}!n&&Q[`/services${e}`]&&(e=`/services${e}`,n=Q[e],window.history.replaceState({},``,e)),n||=Q[`/`],this.applySEO(e,r);let i=``;typeof n.view==`string`?i=n.view:typeof n.view==`function`&&(i=await n.view(r)),this.transitionView(i)}applySEO(e,t={}){let n=Oe(e,t),r=X(e===`/`?`/`:e.endsWith(`/`)?e:`${e}/`),i=Z(n.image||Y.logo);document.title=n.title,$(`name`,`description`,n.description),Le(`canonical`,r),$(`property`,`og:title`,n.title),$(`property`,`og:description`,n.description),$(`property`,`og:type`,n.ogType||`website`),$(`property`,`og:url`,X(e)),$(`property`,`og:image`,i),$(`name`,`twitter:title`,n.title),$(`name`,`twitter:description`,n.description),$(`name`,`twitter:image`,i);let a=document.getElementById(`seo-jsonld`);a||(a=document.createElement(`script`),a.id=`seo-jsonld`,a.type=`application/ld+json`,document.head.appendChild(a)),a.textContent=Fe(e,t)}transitionView(e){E.to(this.appContainer,{opacity:0,y:20,duration:.4,ease:`power2.inOut`,onComplete:()=>{this.appContainer.innerHTML=e,window.scrollTo({top:0,left:0,behavior:`instant`}),document.documentElement.scrollTop=0,document.body.scrollTop=0,requestAnimationFrame(()=>{window.scrollTo({top:0,left:0,behavior:`instant`})}),this.reInitAnimations&&this.reInitAnimations(),E.to(this.appContainer,{opacity:1,y:0,duration:.6,ease:`power3.out`})}})}navigate(e){e!==window.location.pathname&&(window.history.pushState({},``,e),this.handleRoute())}bindLinks(){document.body.addEventListener(`click`,e=>{let t=e.target.closest(`a`);t&&t.hasAttribute(`data-link`)&&(e.preventDefault(),this.navigate(t.getAttribute(`href`)))})}},ze=e=>{if(document.getElementById(`qlip-chatbot-container`))return;let t=document.createElement(`div`);t.id=`qlip-chatbot-container`,t.innerHTML=`
    <button id="chatbot-toggle" class="magnetic" aria-label="Open AI Assistant">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
      </svg>
    </button>
    <div id="chatbot-window" class="hidden">
      <div class="chatbot-header">
        <div class="chatbot-title">
          <span>TheQlipAI Agent</span>
          <div class="online-indicator"></div>
        </div>
        <button id="chatbot-close">&times;</button>
      </div>
      <div id="chatbot-messages" data-lenis-prevent="true">
        <div class="message ai-message">Initialize sequence complete. How can I assist you with The Qlip's engineering services today?</div>
      </div>
      <form id="chatbot-form">
        <input type="text" id="chatbot-input" placeholder="Message TheQlipAI Agent..." autocomplete="off" />
        <button type="submit" id="chatbot-send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `,document.body.appendChild(t);let n=document.getElementById(`chatbot-toggle`),r=document.getElementById(`chatbot-close`),i=document.getElementById(`chatbot-window`),a=document.getElementById(`chatbot-form`),o=document.getElementById(`chatbot-input`),s=document.getElementById(`chatbot-messages`),c=!1,l=[],u=()=>{i.classList.toggle(`hidden`),i.classList.contains(`hidden`)||o.focus()};n.addEventListener(`click`,u),r.addEventListener(`click`,u),document.addEventListener(`click`,e=>{i.classList.contains(`hidden`)||!i.contains(e.target)&&!n.contains(e.target)&&u()});let d=(e,t)=>{let n=document.createElement(`div`);n.classList.add(`message`),n.classList.add(t===`user`?`user-message`:`ai-message`),t===`ai`?n.innerHTML=O.parse(e):n.textContent=e,s.appendChild(n),s.scrollTop=s.scrollHeight},f=()=>{let e=`Here are our latest insights and case studies:\\n`;return J.forEach(t=>{e+=`- ${t.title} (${t.category}): ${t.excerpt}\\n`}),e};a.addEventListener(`submit`,async t=>{t.preventDefault();let n=o.value.trim();if(!n||c)return;d(n,`user`),o.value=``,c=!0,l.push({role:`user`,content:n});let r=document.createElement(`div`);r.classList.add(`message`,`ai-message`,`loading`),r.innerHTML=`<span class="dot"></span><span class="dot"></span><span class="dot"></span>`,s.appendChild(r),s.scrollTop=s.scrollHeight;try{let t=await fetch(`/api/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({messages:l,context:f()})}),n=await t.json();if(s.removeChild(r),t.ok&&n.choices&&n.choices.length>0){let t=n.choices[0].message;if(t.content){let n=t.content,r=!1,i=/<navigate_to[\s\S]*?page=["']([^"']+)["'][\s\S]*?(?:><\/navigate_to>|\/>)/gi,a;for(;(a=i.exec(n))!==null;){let t=a[1];e&&t&&!r&&(d(`Navigating you to ${t}...`,`ai`),e.navigate(t),r=!0)}n=n.replace(/<navigate_to[\s\S]*?(?:><\/navigate_to>|\/>)/gi,``).trim();let o=/<function=navigate_to>\s*(\{[\s\S]*?\})\s*(?:<\/function>|$)/gi;for(;(a=o.exec(n))!==null;)try{let t=JSON.parse(a[1].trim());e&&t.page&&!r&&(d(`Navigating you to ${t.page}...`,`ai`),e.navigate(t.page),r=!0)}catch(e){console.error(`Failed to parse tool call JSON`,e)}n=n.replace(/<function=navigate_to>\s*\{[\s\S]*?\}\s*(?:<\/function>|$)/gi,``).trim(),n&&d(n,`ai`),l.push({role:`assistant`,content:t.content})}if(t.tool_calls&&t.tool_calls.length>0){let n=t.tool_calls[0];if(n.function.name===`navigate_to`){let t=JSON.parse(n.function.arguments);e&&t.page&&(d(`Navigating you to ${t.page}...`,`ai`),e.navigate(t.page),l.push({role:`assistant`,content:`(I used a tool to navigate the user to ${t.page})`}))}}}else{let e=n.error?.message||n.error||`Unable to reach core logic.`;d(`System Error: ${typeof e==`string`?e:JSON.stringify(e)}`,`ai`),console.error(`Chat Error:`,n)}}catch(e){s.contains(r)&&s.removeChild(r),d(`Connection timeout. The matrix is overloaded.`,`ai`),console.error(e)}finally{c=!1}})};E.registerPlugin(T);var Be=()=>{let e=document.querySelector(`.cursor-dot`),t=document.querySelector(`.cursor-outline`);if(!e||!t)return;if(`ontouchstart`in window||navigator.maxTouchPoints>0){document.body.style.cursor=`auto`,e.style.display=`none`,t.style.display=`none`;return}let n=0,r=0,i=0,a=0;window.addEventListener(`mousemove`,t=>{n=t.clientX,r=t.clientY,e.style.left=`${n}px`,e.style.top=`${r}px`});let o=()=>{i+=(n-i)*.3,a+=(r-a)*.3,t.style.left=`${i}px`,t.style.top=`${a}px`,requestAnimationFrame(o)};o(),document.querySelectorAll(`a, button, .glass-card, .magnetic, .cert-badge, .media-frame`).forEach(e=>{e.addEventListener(`mouseenter`,()=>t.classList.add(`hovering`)),e.addEventListener(`mouseleave`,()=>t.classList.remove(`hovering`))}),document.querySelectorAll(`.magnetic`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect();E.to(e,{x:(t.clientX-n.left-n.width/2)*.3,y:(t.clientY-n.top-n.height/2)*.3,duration:.3,ease:`power2.out`})}),e.addEventListener(`mouseleave`,()=>E.to(e,{x:0,y:0,duration:.6,ease:`elastic.out(1,0.3)`}))})},Ve=()=>{let t=document.getElementById(`webgl-container`);if(!t)return;let r=new i,s=new o(-1,1,1,-1,0,1),c=new x({alpha:!0});c.setSize(window.innerWidth,window.innerHeight),c.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.appendChild(c.domElement);let l={uTime:{value:0},uMouse:{value:new n(.5,.5)},uRes:{value:new n(window.innerWidth,window.innerHeight)},uScroll:{value:0}},u=new e({vertexShader:`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,fragmentShader:`
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
  `,uniforms:l});r.add(new v(new w(2,2),u));let d=.5,f=.5,p=.5,m=.5;window.addEventListener(`mousemove`,e=>{d=e.clientX/window.innerWidth,f=1-e.clientY/window.innerHeight}),window.addEventListener(`scroll`,()=>{l.uScroll.value=window.scrollY});let h=new a,g=()=>{h.update(),l.uTime.value=h.getElapsed(),p+=(d-p)*.03,m+=(f-m)*.03,l.uMouse.value.set(p*(window.innerWidth/window.innerHeight),m),c.render(r,s),requestAnimationFrame(g)};g(),window.addEventListener(`resize`,()=>{c.setSize(window.innerWidth,window.innerHeight),l.uRes.value.set(window.innerWidth,window.innerHeight)})},He=()=>{let r=document.getElementById(`hero`);if(!r||!r.classList.contains(`axon-hero`))return;let a=document.createElement(`div`);a.id=`home-3d-container`,a.style.position=`absolute`,a.style.inset=`0`,a.style.zIndex=`0`,a.style.pointerEvents=`none`,r.insertBefore(a,r.firstChild);let o=new i,c=new ne(60,window.innerWidth/window.innerHeight,.1,100);c.position.z=25;let l=new x({alpha:!0,antialias:!0});l.setSize(window.innerWidth,window.innerHeight),l.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),a.appendChild(l.domElement);let u=new h;o.add(u);let f=[],p=new S(.15,8,8),ee=new g({color:366185,transparent:!0,opacity:.8});for(let e=0;e<150;e++){let e=new v(p,ee),t=Math.random(),n=Math.random(),r=t*2*Math.PI,i=Math.acos(2*n-1),a=Math.cbrt(Math.random())*20,o=a*Math.sin(i)*Math.cos(r)*1.5,s=a*Math.sin(i)*Math.sin(r)*.8,c=a*Math.cos(i)*.5;e.position.set(o,s,c),e.userData={vx:(Math.random()-.5)*.02,vy:(Math.random()-.5)*.02,vz:(Math.random()-.5)*.02,phase:Math.random()*Math.PI*2},f.push(e),u.add(e)}let _=new m,b=new Float32Array(22500*3),te=new Float32Array(22500);_.setAttribute(`position`,new y(b,3)),_.setAttribute(`alpha`,new y(te,1));let w=new d(_,new e({uniforms:{uTime:{value:0}},vertexShader:`
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.02, 0.59, 0.41, vAlpha);
      }
    `,transparent:!0,blending:1,depthWrite:!1}));u.add(w);let T=new C,E=new n(-9999,-9999),D=0,O=0;window.addEventListener(`mousemove`,e=>{D=e.clientX/window.innerWidth*2-1,O=-(e.clientY/window.innerHeight)*2+1,E.x=D,E.y=O});let k=new s,A=()=>{if(!document.getElementById(`home-3d-container`)){l.dispose();return}requestAnimationFrame(A);let e=k.getElapsedTime(),n=O*.6,r=D*.8;u.rotation.x+=(n-u.rotation.x)*.1,u.rotation.y+=(r-u.rotation.y)*.1,u.rotation.z+=.002,T.setFromCamera(E,c);let i=T.intersectObjects(f);for(let e=0;e<150;e++)f[e].userData.targetScale=1,f[e].material.color.setHex(366185);if(i.length>0)for(let e=0;e<Math.min(i.length,5);e++)i[e].object.userData.targetScale=3,i[e].object.material.color.setHex(1096065);let a=0,s=0,d=_.attributes.position.array,p=_.attributes.alpha.array;for(let n=0;n<150;n++){let r=f[n];r.position.x+=r.userData.vx,r.position.y+=r.userData.vy,r.position.z+=r.userData.vz,r.position.length()>25&&(r.userData.vx*=-.9,r.userData.vy*=-.9,r.userData.vz*=-.9);let i=(Math.sin(e*2+r.userData.phase)+1)*.5,o=r.userData.targetScale;if(o>1)r.scale.lerp(new t(o,o,o),.2);else{let e=.5+i*1.5;r.scale.lerp(new t(e,e,e),.1)}for(let t=n+1;t<150;t++){let n=f[t],i=r.position.distanceTo(n.position);if(i<5){d[a++]=r.position.x,d[a++]=r.position.y,d[a++]=r.position.z,d[a++]=n.position.x,d[a++]=n.position.y,d[a++]=n.position.z;let t=(Math.sin(e*3-i*2+r.userData.phase)+1)*.5,o=(1-i/5)*.3*t;p[s++]=o,p[s++]=o}}}_.attributes.position.needsUpdate=!0,_.attributes.alpha.needsUpdate=!0,_.setDrawRange(0,a/3),l.render(o,c)};A(),new ResizeObserver(()=>{a.clientWidth&&(c.aspect=window.innerWidth/window.innerHeight,c.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight))}).observe(r)},Ue=()=>{E.timeline({delay:.2}).fromTo(`.pill-border`,{y:20,opacity:0},{y:0,opacity:1,duration:1,ease:`power3.out`}).fromTo(`.axon-title`,{y:40,opacity:0},{y:0,opacity:1,duration:1.5,ease:`power3.out`},`-=0.8`).fromTo(`.axon-subtitle`,{y:20,opacity:0},{y:0,opacity:1,duration:1,ease:`power2.out`},`-=1.0`).fromTo(`.btn-explore`,{scale:.9,opacity:0},{scale:1,opacity:1,duration:1,ease:`elastic.out(1,0.5)`},`-=0.5`),E.utils.toArray(`.bento-card`).forEach(e=>{let t=e.querySelector(`.bento-bg`);t&&E.fromTo(t,{yPercent:-20},{yPercent:20,ease:`none`,scrollTrigger:{trigger:e,start:`top bottom`,end:`bottom top`,scrub:!0}})}),document.querySelectorAll(`.counter`).forEach(e=>{let t=parseFloat(e.dataset.target);E.to(e,{scrollTrigger:{trigger:e,start:`top 90%`},innerText:t,duration:2.5,snap:{innerText:t%1==0?1:.1},ease:`power2.out`})}),E.to(`.proof-card`,{scrollTrigger:{trigger:`.proof-grid`,start:`top 80%`},y:0,opacity:1,duration:1,stagger:.15,ease:`power3.out`}),E.to(`.cta-title .word-reveal`,{scrollTrigger:{trigger:`.editorial-cta`,start:`top 70%`},y:0,opacity:1,duration:1.2,stagger:.1,ease:`power3.out`}),E.to(`.btn-cta`,{scrollTrigger:{trigger:`.editorial-cta`,start:`top 70%`},scale:1,opacity:1,duration:1,delay:.3,ease:`power3.out`}),E.to(`.portfolio-item`,{scrollTrigger:{trigger:`.portfolio-grid`,start:`top 80%`},y:0,opacity:1,duration:1,stagger:.1,ease:`power3.out`}),E.fromTo(`.matrix-card`,{y:40,opacity:0},{scrollTrigger:{trigger:`.scale-matrix`,start:`top 85%`},y:0,opacity:1,duration:1,stagger:.15,ease:`power3.out`}),E.fromTo(`.teaser-image`,{scale:1.2,opacity:0},{scrollTrigger:{trigger:`.work-teaser`,start:`top 75%`},scale:1,opacity:.4,duration:2,ease:`power3.out`}),E.fromTo(`.philosophy-teaser .word-reveal`,{y:30,opacity:0},{scrollTrigger:{trigger:`.philosophy-teaser`,start:`top 80%`},y:0,opacity:1,duration:1.2,stagger:.2,ease:`power3.out`}),setTimeout(()=>T.refresh(),100)},We=()=>{let e=document.getElementById(`about-3d-container`);if(!e)return;e.innerHTML=``;let t=e.clientWidth||600,n=e.clientHeight||700,a=new i,o=new ne(35,t/n,.1,100);o.position.set(0,0,8);let m=new x({alpha:!0,antialias:!0});m.setSize(t,n),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),m.toneMapping=4,m.toneMappingExposure=1.4,e.appendChild(m.domElement);let g=(e,t)=>{let n=document.createElement(`canvas`);n.width=n.height=256;let r=n.getContext(`2d`);return r.fillStyle=`#050505`,r.fillRect(0,0,256,256),e?(r.fillStyle=`#ffffff`,r.fillRect(256*.2,256*.2,256*.6,256*.6)):t?(r.fillStyle=`#aaffdd`,r.fillRect(256*.1,256*.4,256*.8,256*.05),r.fillStyle=`#ffcc88`,r.fillRect(256*.4,256*.1,256*.05,256*.8)):(r.fillStyle=`#222222`,r.beginPath(),r.arc(256/2,256/2,256*.3,0,Math.PI*2),r.fill()),n},y=new _([g(!1,!0),g(!1,!0),g(!0,!1),g(!1,!1),g(!1,!0),g(!1,!0)]);y.needsUpdate=!0,a.add(new ee(4210752,2.5));let S=new b(16765056,4);S.position.set(5,5,4),a.add(S);let C=new b(1736800,2);C.position.set(-4,-2,-3),a.add(C);let w=new c(16764040,2,10);a.add(w);let T=new h;a.add(T),T.scale.set(.65,.65,.65);let E=42,D=()=>(E=E*16807%2147483647,(E-1)/2147483646),O=(e,t)=>e+D()*(t-e),k=new p({color:15120448,emissive:2233600,emissiveIntensity:.2,roughness:.15,metalness:1,clearcoat:1,envMap:y,envMapIntensity:3,flatShading:!0}),A=new p({color:2138256,emissive:4112,emissiveIntensity:.1,roughness:.2,metalness:.6,clearcoat:.5,envMap:y,envMapIntensity:2,flatShading:!0}),j=new p({color:2759184,emissive:0,roughness:.9,metalness:.2,envMap:y,envMapIntensity:.5,flatShading:!0}),M=new p({color:11041586,emissive:656640,emissiveIntensity:.1,roughness:.4,metalness:.8,envMap:y,envMapIntensity:1.5,flatShading:!0}),N=(e,t,n,r,i)=>{let a=new v(t,e);return a.position.set(...n),a.rotation.set(...r),a.scale.set(...i),a};for(let e=0;e<20;e++){let t=D()>.4?A:k,n,i=D();n=i<.33?new l(1.2,0):i<.66?new f(1.4,0):new te(1.3,0);let a=N(t,n,[O(-.3,.3),O(-.3,.3),O(-.3,.3)],[D()*Math.PI,D()*Math.PI,D()*Math.PI],[1,1,1]),o=O(.8,1.4);if(a.scale.set(o,o,o),T.add(a),e%3==0){let e=new d(new r(n),new u({color:16772795,transparent:!0,opacity:.25}));e.scale.set(1.002,1.002,1.002),a.add(e)}}let P=new l(1,1);for(let e=0;e<45;e++){let t=D()>.3?j:M,n=Math.acos(1-2*(e+.5)/45),r=Math.PI*(1+Math.sqrt(5))*e,i=Math.cos(r)*Math.sin(n),a=Math.sin(r)*Math.sin(n),o=Math.cos(n);if(o>.1&&i>-.7&&i<.7&&a>-.7&&a<.7)continue;let s=N(t,P,[i*1.3,a*1.3,o*1.3],[D()*Math.PI,D()*Math.PI,D()*Math.PI],[1,1,1]);s.scale.set(O(.6,1.2),O(.6,1.2),O(.6,1.2)),T.add(s)}let F=0,I=0;e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect();I=((t.clientX-n.left)/n.width-.5)*1,F=-((t.clientY-n.top)/n.height-.5)*1}),e.addEventListener(`mouseleave`,()=>{F=0,I=0});let L=new s,R=()=>{if(!document.getElementById(`about-3d-container`)){m.dispose();return}requestAnimationFrame(R);let e=L.getElapsedTime();T.rotation.y+=(I-T.rotation.y)*.05+.003,T.rotation.x+=(F-T.rotation.x)*.05+.001,T.rotation.z+=.001,w.position.set(Math.sin(e*.5)*1.5,Math.cos(e*.4)*1.5,Math.sin(e*.3)*1.5),w.intensity=2+Math.sin(e*2)*1,m.render(a,o)};R(),new ResizeObserver(()=>{let t=e.clientWidth,n=e.clientHeight;t&&n&&(o.aspect=t/n,o.updateProjectionMatrix(),m.setSize(t,n))}).observe(e)},Ge=()=>{window.innerWidth,E.utils.toArray(`.axon-section-title`).forEach(e=>{E.fromTo(e,{opacity:0,y:30},{opacity:1,y:0,duration:1,ease:`power3.out`,scrollTrigger:{trigger:e,start:`top 85%`}})}),E.utils.toArray(`.bento-grid`).forEach(e=>{let t=e.querySelectorAll(`.bento-card`);E.set(e,{perspective:1e3}),E.fromTo(t,{opacity:0,y:80,scale:.9,rotationX:15},{opacity:1,y:0,scale:1,rotationX:0,duration:1.2,stagger:.1,ease:`back.out(1.5)`,scrollTrigger:{trigger:e,start:`top 85%`},onComplete:()=>{E.to(t,{y:-4,duration:3,yoyo:!0,repeat:-1,ease:`sine.inOut`,stagger:{amount:1,from:`random`}})}})}),E.utils.toArray(`.insights-grid`).forEach(e=>{let t=e.querySelectorAll(`.insight-card`);E.fromTo(t,{opacity:0,y:50},{opacity:1,y:0,duration:.8,stagger:.15,ease:`power3.out`,scrollTrigger:{trigger:e,start:`top 85%`},onComplete:()=>{E.to(t,{y:-6,duration:2.5,yoyo:!0,repeat:-1,ease:`sine.inOut`,stagger:{amount:1,from:`random`}})}})}),E.utils.toArray(`.split-layout`).forEach(e=>{E.fromTo(e,{opacity:0},{opacity:1,duration:1.5,ease:`power2.out`,scrollTrigger:{trigger:e,start:`top 70%`}})}),E.utils.toArray(`.marquee`).forEach(e=>{let t=E.to(e,{xPercent:-50,repeat:-1,duration:25,ease:`linear`});T.create({trigger:document.body,start:`top top`,end:`bottom bottom`,onUpdate:e=>{let n=Math.abs(e.getVelocity());if(n>0){let e=1+n/400;E.to(t,{timeScale:e,duration:.1,overwrite:!0}),E.to(t,{timeScale:1,duration:.8,delay:.1,overwrite:!0})}}})})},Ke=()=>{T.getAll().forEach(e=>e.kill()),He(),We(),Ue(),Ge()};document.addEventListener(`DOMContentLoaded`,()=>{let e=new D({duration:1.2,easing:e=>Math.min(1,1.001-2**(-10*e)),direction:`vertical`,gestureDirection:`vertical`,smooth:!0,mouseMultiplier:1,smoothTouch:!1,touchMultiplier:2,infinite:!1});e.on(`scroll`,T.update);let t=document.querySelector(`.header`);e.on(`scroll`,e=>{window.scrollY>50?t.classList.add(`scrolled`):t.classList.remove(`scrolled`)}),E.ticker.add(t=>{e.raf(t*1e3)}),E.ticker.lagSmoothing(0),Be(),Ve();let n=new Re(`app-view`,Ke);ze(n),n.bindLinks()});