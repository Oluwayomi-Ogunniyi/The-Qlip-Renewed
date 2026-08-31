import { articles } from '../data/articles.js';

const latestInsightsHtml = articles.slice(0, 3).map((article, index) => `
  <a href="/insights/${article.id}" class="insight-card magnetic" data-link style="animation-delay: ${index * 0.1}s">
    <div class="insight-image-wrapper">
      <img src="${article.image}" alt="${article.title}" class="insight-image" loading="lazy" decoding="async" />
      <div class="insight-overlay"></div>
    </div>
    <div class="insight-content">
      <div class="insight-meta">
        <span class="insight-category">${article.category}</span>
        <span class="insight-date">${article.readTime}</span>
      </div>
      <h3 class="insight-title" style="font-size: 1.5rem;">${article.title}</h3>
      <div class="insight-footer" style="margin-top: auto;">
        <span class="read-more">Read Intel</span>
        <span class="bento-arrow">&rarr;</span>
      </div>
    </div>
  </a>
`).join('');

export const homeView = `
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
            ${latestInsightsHtml}
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
`;

