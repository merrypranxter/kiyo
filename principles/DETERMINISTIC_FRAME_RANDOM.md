# Deterministic Frame Random

**ID:** `DETERMINISTIC_FRAME_RANDOM` | **Category:** Pipeline | **Weird Factor:** 9/10

## Source

- **Sketch:** Multiple sketches
- **Date:** 2026-03-20
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Seed random number generator with frame number to get reproducible chaos.

## What Makes It Weird

Randomness changes frame-to-frame but is reproducible within a frame - same seed always gives same 'random' values.

## The Twist

Allows deterministic glitch effects where things look random but follow a predictable cycle, creating controlled chaos.

---

## Emotional Quality

**chaotic_controlled** - Like watching static that almost makes patterns. Chaotic but somehow ordered.

---

## Variations

- [ ] Seed with mouse position too
- [ ] Multi-parameter hash (id + frame + x + y)
- [ ] Smooth noise instead of hash
- [ ] Interpolate seed between frames
- [ ] Different seeds per particle group

---

## Related Principles

- [[MODULO_SPAWN_PHASE_SHIFT]] - Shared deterministic approach
- [[FRAME_SYNCED_SPIRAL_SPAWN]] - Frame-derived values

## Combinations

- [[TWO_TONE_ECHO]] - Two-Tone Echo

---

## Code Reference


// In update() - reseed every frame
ofSeedRandom(39); // or any fixed seed, or frame number

// Now all 'random' values are deterministic per frame
for (auto& p : particles) {
    p.offset = ofRandom(-10, 10); // Same every frame!
}

// In draw() - same seed, same result
ofSeedRandom(39);
for (auto& p : particles) {
    ofSetColor(ofRandom(100, 255));
    ofDrawCircle(p.pos, ofRandom(2, 5));
}


---

## GLSL Key

`See database.json for shader translation`
