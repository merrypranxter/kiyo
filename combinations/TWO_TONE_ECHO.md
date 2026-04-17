# Two-Tone Echo

**ID:** `TWO_TONE_ECHO`

**Ingredients:** [[MODULO_SPAWN_PHASE_SHIFT]] + [[STEPPED_LIFETIME_ALPHA]]

**Result:** Dual-phase ripples with stepped fade - ethereal echo effect

---

## Description

Interleave two spawn phases with different properties while applying stepped alpha fading. Creates ghostly echoes where one wave is full and present while the other fades abruptly.

---

## How To


1. Set up dual phase spawn (even/odd different hues)
2. Apply stepped alpha to one phase only
3. Use ADD blend mode for ethereal glow
4. Offset spawn timing for echo effect


---

## GLSL Hint


// Phase A: full presence
// Phase B: stepped fade
float phaseB = mod(iTime * 10.0 + 225.0, 450.0);
float life = phaseB / 450.0;
float alpha = life < 0.5 ? 1.0 : smoothstep(0.5, 1.0, life);


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
