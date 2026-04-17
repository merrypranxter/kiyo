# Modulo Spawn Phase Shift

**ID:** `MODULO_SPAWN_PHASE_SHIFT` | **Category:** Temporal | **Weird Factor:** 8/10

## Source

- **Sketch:** Ripple on ripple
- **Date:** 2026-04-10
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Particles spawn in polar coordinates with modulo timing, creating rhythmic birth cycles.

## What Makes It Weird

Uses modulo arithmetic on frame number to create deterministic spawn waves instead of random or continuous spawning.

## The Twist

Dual-phase spawning where even/odd particles use different hue offsets (0 vs 128) creating interleaved color waves.

---

## Emotional Quality

**ethereal_ghostly** - The interleaved color waves feel like northern lights or bioluminescence. Ethereal and rhythmic.

---

## Variations

- [ ] Triple or quadruple phase shifts
- [ ] Prime number modulo values
- [ ] Sine-modulated spawn rate
- [ ] Random phase offset per burst
- [ ] Reverse phase on alternate cycles

---

## Related Principles

- [[FRAME_SYNCED_SPIRAL_SPAWN]] - Both use frame-derived spawn timing
- [[DETERMINISTIC_FRAME_RANDOM]] - Shared deterministic timing approach

## Combinations

- [[TWO_TONE_ECHO]] - Two-Tone Echo

---

## Code Reference


// Key pattern from Kiyoshi's sketches
for (int i = 0; i < particleCount; i++) {
    float phase = (ofGetFrameNum() * 10 + (i % 2) * 225) % 450;
    float hue = (i % 2 == 0) ? 0 : 128; // dual phase
    // Spawn at angle derived from phase
    float angle = ofDegToRad(phase);
    float radius = ofMap(i, 0, particleCount, 0, 300);
    ofSetColor(ofColor::fromHsb(hue, 255, 255));
    ofDrawCircle(cos(angle) * radius, sin(angle) * radius, 3);
}


---

## GLSL Key

`See database.json for shader translation`
