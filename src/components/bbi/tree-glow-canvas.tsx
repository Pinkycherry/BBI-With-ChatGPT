import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
varying vec2 vUv;

float blob(vec2 p, vec2 centre, float radius) {
  return smoothstep(radius, 0.0, distance(p, centre));
}

void main() {
  vec2 uv = vUv;
  vec2 p = (gl_FragCoord.xy / uResolution) * 2.0 - 1.0;
  p.x *= uResolution.x / max(uResolution.y, 1.0);
  vec2 pointer = uPointer;
  pointer.x *= uResolution.x / max(uResolution.y, 1.0);
  float drift = uTime * 0.055;
  float blue = blob(p, vec2(-0.42 + pointer.x * 0.08, 0.16 + sin(drift) * 0.08), 0.92);
  float violet = blob(p, vec2(0.45 + cos(drift * 0.8) * 0.08, 0.02 + pointer.y * 0.08), 0.88);
  float cyan = blob(p, vec2(0.02 + sin(drift * 1.2) * 0.16, -0.42), 0.7);
  vec3 colour = vec3(0.0);
  colour += vec3(0.07, 0.43, 1.0) * blue * 0.16;
  colour += vec3(0.52, 0.2, 1.0) * violet * 0.14;
  colour += vec3(0.0, 0.82, 1.0) * cyan * 0.11;
  float vignette = smoothstep(1.35, 0.15, length(p));
  gl_FragColor = vec4(colour * vignette, (blue + violet + cyan) * 0.32);
}
`;

/**
 * A small OGL light field behind the supplied tree artwork. It is deliberately
 * optional and lazy: the image and all copy remain useful if WebGL is absent.
 */
export default function TreeGlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.25),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uResolution: { value: [1, 1] },
        uPointer: { value: [0, 0] },
        uTime: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    let visible = false;
    let hidden = document.hidden;
    let destroyed = false;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setSize(width, height);
      program.uniforms["uResolution"].value = [width, height];
    };

    const render = (now: number) => {
      raf = 0;
      if (destroyed || hidden || !visible) return;
      program.uniforms["uTime"].value = now * 0.001;
      program.uniforms["uPointer"].value = [pointerX, pointerY];
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!raf && visible && !hidden && !destroyed) raf = requestAnimationFrame(render);
    };
    const sleep = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibilityChange = () => {
      hidden = document.hidden;
      hidden ? sleep() : wake();
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      wake();
    };
    if (typeof IntersectionObserver === "undefined") {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        visible ? wake() : sleep();
      },
      { threshold: 0.01 },
    );
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    resizeObserver?.observe(host);
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      destroyed = true;
      sleep();
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="bbi-tree-glow" aria-hidden="true" />;
}
