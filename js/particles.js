// particles.js — Interactive Aurora Nebula, Cyber Grid & Mouse-Reactive Constellation
(function() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Glowing floating nebula orbs
  const orbs = [
    { x: width * 0.2, y: height * 0.25, vx: 0.35, vy: 0.25, r: 340, color: '124, 58, 237' },
    { x: width * 0.8, y: height * 0.65, vx: -0.3, vy: 0.3, r: 380, color: '56, 189, 248' },
    { x: width * 0.5, y: height * 0.85, vx: 0.25, vy: -0.35, r: 300, color: '192, 132, 252' }
  ];

  // Interactive constellation nodes
  class Node {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.r = Math.random() * 2 + 0.8;
      this.pulse = Math.random() * Math.PI * 2;
      this.isCyan = Math.random() > 0.6;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.03;

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          this.x += (dx / dist) * 0.35;
          this.y += (dy / dist) * 0.35;
        }
      }

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
    draw(isLight) {
      const alpha = (0.35 + Math.sin(this.pulse) * 0.2) * (isLight ? 0.65 : 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.isCyan
        ? `rgba(56, 189, 248, ${alpha})`
        : `rgba(167, 139, 250, ${alpha})`;
      ctx.fill();
    }
  }

  const nodeCount = Math.min(115, Math.floor((width * height) / 14000));
  const nodes = Array.from({ length: nodeCount }, () => new Node());

  function drawNebula(isLight) {
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      if (orb.x < 0 || orb.x > width) orb.vx *= -1;
      if (orb.y < 0 || orb.y > height) orb.vy *= -1;

      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      const maxAlpha = isLight ? 0.08 : 0.14;
      grad.addColorStop(0, `rgba(${orb.color}, ${maxAlpha})`);
      grad.addColorStop(1, `rgba(${orb.color}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mouse spotlight
    if (mouse.active) {
      const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
      spotGrad.addColorStop(0, isLight ? 'rgba(109, 40, 217, 0.08)' : 'rgba(56, 189, 248, 0.12)');
      spotGrad.addColorStop(0.5, isLight ? 'rgba(124, 58, 237, 0.04)' : 'rgba(124, 58, 237, 0.07)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawConnections(isLight) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 145) {
          const alpha = (1 - dist / 145) * (isLight ? 0.12 : 0.22);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 175) {
          const mAlpha = (1 - mdist / 175) * (isLight ? 0.22 : 0.38);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    drawNebula(isLight);
    nodes.forEach(n => {
      n.update();
      n.draw(isLight);
    });
    drawConnections(isLight);
    requestAnimationFrame(animate);
  }

  animate();
})();