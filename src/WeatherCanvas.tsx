import { useEffect, useRef } from "react";
import { moveParticles } from "./particles";
import { createParticles } from "./particles";
import type { WeatherKind } from "./weatherKind";

const SKY_COLORS: Record<WeatherKind, string> = {
  cloudy: "#8e9aa6",
  clear: "skyblue",
  fog: "#c8d0d6",
  snow: "#eef3f7",
  storm: "#2f3640",
  rain: "#5d6d7e",
  unknown: "#7f8c9a",
};

export function WeatherCanvas({ kind }: { kind: WeatherKind }) {
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

      ctx.fillStyle = SKY_COLORS[kind];
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (kind === "clear") {
        ctx.fillStyle = "yellow";
        ctx.beginPath();

        ctx.arc(480, 50, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      if (kind === "rain") {
        moveParticles(particles, canvas.height);

        for (const particle of particles) {
          ctx.fillStyle = "white";
          ctx.fillRect(particle.x, particle.y, 2, 8);
        }
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [kind]);

  return <canvas ref={canvasRef} width={560} height={160}></canvas>;
}
