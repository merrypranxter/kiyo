# Spiral Ribbon

**ID:** `SPIRAL_RIBBON`

**Ingredients:** [[FRAME_SYNCED_SPIRAL_SPAWN]] + [[RIBBON_TWIST_DEFORM]]

**Result:** Twisted ribbon follows spiral path

---

## Description

A ribbon twists along a spiral trajectory. The deterministic spiral provides the path while ribbon twist adds 3D volume.

---

## How To


1. Generate spiral path from frame-synced params
2. Calculate tangent/normal/binormal frames
3. Apply progressive twist along path
4. Render ribbon mesh


---

## GLSL Hint


// Spiral path
float angle = iTime * 14.4 + s * TWO_PI * turns;
float radius = s * maxRadius;
vec3 pos = vec3(cos(angle)*radius, sin(angle)*radius, s * height);
// Twist
float twist = s * twistAmount + iTime;
// Build ribbon from Frenet frame


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
