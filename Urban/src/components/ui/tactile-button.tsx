import { useEffect, useRef, type CSSProperties } from "react";

export type TactileButtonProps = {
  mode?: "light" | "dark";
  hue?: number;
  saturation?: number;
  brightness?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

// Liquid button WebGL fragment shader — same as the 21st.dev SURGE button
const LIQUID_FS = [
  "precision highp float;",
  "uniform vec2 u_res;",
  "uniform float u_time;",
  "uniform float u_level;",
  "uniform float u_tilt;",
  "uniform float u_slosh;",
  "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}",
  "float noise(vec2 p){",
  "  vec2 i=floor(p), f=fract(p);",
  "  vec2 u=f*f*(3.0-2.0*f);",
  "  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),",
  "             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);",
  "}",
  "float fbm(vec2 p){",
  "  float v=0.0; float a=0.5;",
  "  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.04+vec2(11.3,7.1); a*=0.5; }",
  "  return v;",
  "}",
  "void main(){",
  "  vec2 uv = gl_FragCoord.xy / u_res;",
  "  float ar = u_res.x / u_res.y;",
  "  float x = uv.x * ar;",
  "  float t = u_time;",
  "  float amp = 0.012 + u_slosh * 0.045;",
  "  float surf = u_level",
  "    + u_tilt * (uv.x - 0.5) * 0.34",
  "    + amp * sin(x * 5.1 + t * 4.6)",
  "    + amp * 0.62 * sin(x * 9.7 + t * (-6.8) + 1.7)",
  "    + amp * 0.38 * sin(x * 14.3 + t * 8.9 + 4.2);",
  "  float d = surf - uv.y;",
  "  vec3 col = mix(vec3(0.03, 0.06, 0.1), vec3(0.05, 0.09, 0.15), uv.y);",
  "  col += vec3(0.02, 0.05, 0.1) * pow(max(0.0, 1.0 - abs(uv.y - 0.88) * 6.0), 2.0);",
  "  float inside = smoothstep(0.0, 0.012, d);",
  "  float depth = clamp(d / max(u_level, 0.001), 0.0, 1.0);",
  "  vec3 liq = mix(vec3(0.0, 0.9, 1.0), vec3(0.02, 0.15, 0.45), depth);",
  "  float caust = fbm(vec2(x * 4.2, (uv.y + t * 0.14) * 4.2));",
  "  liq *= 0.8 + 0.42 * caust;",
  "  liq += vec3(0.02, 0.25, 0.35) * pow(max(0.0, d * 3.0), 1.5) * u_slosh;",
  "  col = mix(col, liq, inside);",
  "  col += vec3(0.4, 0.9, 1.0) * exp(-abs(d) * 80.0) * 0.85;",
  "  col += vec3(0.8, 0.98, 1.0) * exp(-abs(d) * 220.0) * 0.5;",
  "  vec2 e = uv * (1.0 - uv);",
  "  col *= 0.55 + 0.45 * pow(e.x * e.y * 16.0, 0.22);",
  "  gl_FragColor = vec4(col, 1.0);",
  "}",
].join("\n");

const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

export default function TactileButton({
  label = "SURGE",
  className,
  style,
  onClick,
}: TactileButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const btn = btnRef.current;
    if (!canvas || !btn) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      // Graceful CSS fallback
      btn.style.background =
        "linear-gradient(to top, #0284c7 0%, #06b6d4 52%, #a5f3fc 55%, #050b11 56%)";
      canvas.style.display = "none";
      return;
    }

    // Compile shader helper
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, LIQUID_FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const locP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uLevel = gl.getUniformLocation(prog, "u_level");
    const uTilt = gl.getUniformLocation(prog, "u_tilt");
    const uSlosh = gl.getUniformLocation(prog, "u_slosh");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    resize();

    // Physics state
    const BASE = 0.56;
    let level = BASE,
      gulp = 0,
      slosh = 0.4,
      tilt = 0,
      tiltTarget = 0,
      lastX: number | null = null,
      last = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / Math.max(1, rect.width);
      if (lastX !== null) slosh = Math.min(1.4, slosh + Math.abs(x - lastX) * 2.6);
      lastX = x;
      tiltTarget = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    };
    const onMouseLeave = () => {
      lastX = null;
      tiltTarget = 0;
    };
    const onFocus = () => {
      slosh = Math.min(1.4, slosh + 0.5);
    };
    const onClickInternal = () => {
      gulp = 1;
      slosh = Math.min(1.4, slosh + 0.7);
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);
    btn.addEventListener("focus", onFocus);
    btn.addEventListener("click", onClickInternal);

    // Animation loop
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      slosh *= Math.exp(-1.5 * dt);
      gulp *= Math.exp(-1.1 * dt);
      tilt += (tiltTarget - tilt) * Math.min(1, dt * 5);
      const levelTarget = BASE - 0.36 * gulp;
      level += (levelTarget - level) * Math.min(1, dt * 5.5);

      resize();
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, reduced ? 2.0 : now / 1000);
      gl!.uniform1f(uLevel, level);
      gl!.uniform1f(uTilt, tilt);
      gl!.uniform1f(uSlosh, reduced ? 0.25 : slosh);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
      btn.removeEventListener("focus", onFocus);
      btn.removeEventListener("click", onClickInternal);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      className={className}
      style={style}
    >
      {/* Gradient border wrapper — 1px padding, rounded pill */}
      <div className="p-[1px] rounded-[19px] bg-gradient-to-b from-cyan-500/30 via-neutral-800/20 to-cyan-950/40 shadow-2xl h-full w-full">
        <button
          ref={btnRef}
          type="button"
          onClick={onClick}
          className="relative flex items-center justify-center w-full h-full border-0 p-0 rounded-[18px] overflow-hidden cursor-pointer bg-[#050b11] transition-all duration-300 ease-out
            shadow-[0_22px_44px_rgba(4,24,36,0.35),0_3px_9px_rgba(5,10,15,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)]
            hover:-translate-y-[2px] hover:shadow-[0_28px_56px_rgba(6,182,212,0.25),0_4px_11px_rgba(5,10,15,0.45)]
            active:translate-y-[1px] active:scale-[0.985]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#06b6d4] focus-visible:outline-offset-[5px]"
        >
          {/* WebGL Liquid Canvas — fills the entire button */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full block"
          />
          {/* Label */}
          <span className="relative z-10 pointer-events-none font-normal text-sm tracking-[0.3em] indent-[0.3em] text-[#e0faff] drop-shadow-[0_1px_10px_rgba(0,18,25,0.85)] flex items-center gap-2 select-none">
            {label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 opacity-80"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
