// --- CONFIGURAÇÃO ---
const PARTICLE_COLOR = '#00ffff'; // Cor Ciano

export class DNAAnimation {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[] = [];
  width: number = 0;
  height: number = 0;
  mouse: { x: number | null, y: number | null, radius: number };

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'dna-bg';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;
    
    // Raio de interação do mouse
    this.mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles(100); 
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles(count: number) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.particles.forEach((p, index) => {
      p.update(this.mouse, this.width, this.height); // Passamos width/height para rebater na parede
      p.draw(this.ctx);
      
      // Desenha as linhas de conexão
      for (let j = index + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        
        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.hexToRgba(PARTICLE_COLOR, 1 - dist / 100);
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    });
    requestAnimationFrame(() => this.animate());
  }

  hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

class Particle {
  x: number;
  y: number;
  vx: number; // Velocidade X (Movimento constante)
  vy: number; // Velocidade Y (Movimento constante)
  size: number;
  density: number; 

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    
    // Devolvemos a velocidade aleatória para elas se mexerem sozinhas
    this.vx = (Math.random() - 0.5) * 1.5; 
    this.vy = (Math.random() - 0.5) * 1.5; 
    
    this.size = Math.random() * 2 + 1;
    this.density = (Math.random() * 30) + 1;
  }

  update(mouse: any, w: number, h: number) {
    // 1. Movimento constante (O que faltava)
    this.x += this.vx;
    this.y += this.vy;

    // 2. Rebater nas bordas (Para não sumirem da tela)
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;

    // 3. Interação com o Mouse (O empurrão)
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        // Lógica de repulsão
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        
        // Empurra a partícula na direção oposta ao mouse
        this.x -= directionX;
        this.y -= directionY;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = PARTICLE_COLOR;
    ctx.fill();
  }
}