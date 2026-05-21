/**
 * ScrollSmootherMock — drop-in replacement for the proprietary GSAP ScrollSmoother.
 * Provides all methods Navbar.tsx and initialFX.ts call so the app runs without errors.
 * Actual smooth-scroll physics are disabled; native browser scroll is used instead.
 */

// Minimal stub that satisfies gsap.registerPlugin(ScrollSmoother)
export const ScrollSmoother = {
  // Called by gsap.registerPlugin — GSAP checks for this name property
  name: "ScrollSmoother",
  // Required for gsap.registerPlugin compatibility
  register() {},
  init() {},

  // Factory method used in Navbar.tsx: ScrollSmoother.create({...})
  create(_config?: any): SmootherInstance {
    return new SmootherInstance();
  },

  // Called on window resize: ScrollSmoother.refresh(true)
  refresh(_soft?: boolean) {},
};

export class SmootherInstance {
  private _paused = false;

  /** pause / unpause scroll — no-op since we use native scroll */
  paused(_p: boolean): boolean { this._paused = _p; return _p; }

  /** Scroll to a pixel position */
  scrollTop(y?: number): number {
    if (y !== undefined) window.scrollTo({ top: y, behavior: "auto" });
    return window.scrollY;
  }

  /** Scroll to a CSS selector target */
  scrollTo(target: string | Element, _smooth?: boolean, _position?: string) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Default export mirrors named export for import flexibility
export default ScrollSmoother;