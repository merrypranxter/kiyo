# Strobe Heartbeat

**ID:** `STROBE_HEARTBEAT`

**Ingredients:** [[TWO_FRAME_ANIMATION]] + [[HEART_GENERATIVE]]

**Result:** Pulsing generative heart with harsh strobe cuts

---

## Description

Flip between two heart states - contracted and expanded - using two-frame animation. Creates a jarring, medical-monitor-like heartbeat effect.

---

## How To


1. Generate parametric heart shape
2. Define contracted and expanded states
3. Hard cut between states (no interpolation)
4. Add slight noise jitter for analog feel


---

## GLSL Hint


// Two heart states
bool contracted = (int)(iTime * 2) % 2 == 0;
float scale = contracted ? 0.8 : 1.2;
// Hard cut - no smoothstep
// Render heart at scale
float x = 16*pow(sin(t),3) * scale;
float y = (13*cos(t)-5*cos(2*t)-2*cos(3*t)-cos(4*t)) * scale;


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
