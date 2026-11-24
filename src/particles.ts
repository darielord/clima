export type Particle = {
  x: number;
  y: number;
  speed: number;
};

export function createParticles(
  count: number,
  width: number,
  height: number,
): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 2 + 1,
    });
  }

  return particles;
}

export function moveParticles(particles: Particle[], height: number): void {
  for (const particle of particles) {
    particle.y = particle.speed + particle.y;

    if (particle.y > height) {
      particle.y = 0;
    }
  }
}
