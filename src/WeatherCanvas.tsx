import { useEffect, useRef } from "react";

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

    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";

    ctx.beginPath();

    ctx.arc(480, 50, 30, 0, Math.PI * 2);

    ctx.fill();
  }, []);

  return <canvas ref={canvasRef} width={560} height={160}></canvas>;
}
