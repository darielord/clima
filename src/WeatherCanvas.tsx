import { useEffect, useRef } from "react";
import { moveParticles } from "./particles";
import { createParticles } from "./particles";

export function WeatherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      return;
    }

    const particles = createParticles(60, canvas.width, canvas.height);

    let frameId: number = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "skyblue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "yellow";
      ctx.beginPath();

      ctx.arc(480, 50, 30, 0, Math.PI * 2);
      ctx.fill();

      moveParticles(particles, canvas.height);

      for (const particle of particles) {
        ctx.fillStyle = "white";
        ctx.fillRect(particle.x, particle.y, 2, 8);
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} width={560} height={160}></canvas>;
}
