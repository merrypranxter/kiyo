# Noise-Gated Connections

**ID:** `PROXIMITY_NOISE`

**Ingredients:** [[PROXIMITY_THRESHOLD_CONNECTION]] + [[NOISE_MASKED_GEOMETRY]]

**Result:** Lines only form in noise-threshold zones - organic network growth

---

## Description

Combine proximity-based line spawning with noise-based spatial masking. The result is a network that only grows in specific zones defined by Perlin noise, creating organic vine-like or neural patterns.

---

## How To


1. Generate noise field (3D or animated 2D)
2. Threshold noise to define 'active' zones
3. Run proximity check only within active zones
4. Render connections with stepped alpha fade


---

## GLSL Hint


// Combine both techniques:
float n = noise3D((p1+p2)/2 * scale);
float inZone = step(0.4, n) * (1.0 - step(0.6, n));
float dist = length(p1 - p2);
float connect = step(dist, threshold) * inZone;


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
