export const aboutView = `
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
`;
