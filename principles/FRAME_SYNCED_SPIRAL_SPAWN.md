# Frame Synced Spiral Spawn

**ID:** `FRAME_SYNCED_SPIRAL_SPAWN` | **Category:** Temporal | **Weird Factor:** 8/10

## Source

- **Sketch:** Uzumaki
- **Date:** 2026-04-01
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Spawn angle and radius derived directly from frame count.

## What Makes It Weird

Birth coordinates are purely a function of time - deterministic spiral with no randomness in positioning.

## The Twist

Radius expands modulo 360 creating infinite outward spiral that loops but never repeats exactly.

---

## Emotional Quality

**organic_nature** - Like watching a plant grow in time-lapse or a shell form. Deterministic yet organic.

---

## Variations

- [ ] Logarithmic spiral instead of linear
- [ ] Multiple spiral arms
- [ ] Fibonacci angle increments (137.5 degrees)
- [ ] Reverse direction inward spiral
- [ ] Noise perturbation on deterministic base

---

## Related Principles

- [[MODULO_SPAWN_PHASE_SHIFT]] - Shared frame-based timing
- [[DETERMINISTIC_FRAME_RANDOM]] - Deterministic generation approach

## Combinations

- [[SPIRAL_RIBBON]] - Spiral Ribbon

---

## Code Reference


// Uzumaki - spiral spawn
float frame = ofGetFrameNum();
float angle = ofDegToRad(frame * 14.4); // spin rate
float radius = (frame * 3) % 360; // expand and loop

// Convert to Cartesian
float x = cos(angle) * radius;
float y = sin(angle) * radius;

// Optional noise jitter
x += ofRandom(-2, 2);
y += ofRandom(-2, 2);

// Spawn particle
particles.emplace_back(x, y);


---

## GLSL Key

`See database.json for shader translation`
