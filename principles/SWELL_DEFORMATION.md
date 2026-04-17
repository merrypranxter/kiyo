# Swell Deformation

**ID:** `SWELL_DEFORMATION` | **Category:** Deformation | **Weird Factor:** 8/10

## Source

- **Sketch:** Swell
- **Date:** 2026-03-30
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Inflate mesh over time using sine-based displacement.

## What Makes It Weird

Organic breathing-like motion applied to any geometry - makes rigid objects feel alive.

## The Twist

Displacement follows surface normal but amplitude varies by vertex noise value - some parts swell more.

---

## Emotional Quality

**breathing_living** - Like watching something breathe or pulse. Gives inanimate objects life.

---

## Variations

- [ ] Multiple frequency叠加
- [ ] Radial falloff from center
- [ ] Noise-driven instead of sine
- [ ] Explosive swell (rapid inflate)
- [ ] Localized swell (only some regions)

---

## Related Principles

- [[HEART_GENERATIVE]] - Organic shape generation
- [[RAMPAGING_TORUS_KNOT]] - 3D deformation

## Combinations

- [[TEXTUAL_SWELL]] - Textual Swell

---

## Code Reference


// Swell deformation
for (auto& v : mesh.getVertices()) {
    float noise = ofNoise(v * 0.01);
    float swell = sin(ofGetElapsedTimef() * 2.0 + noise * 5.0) * 0.5 + 0.5;
    ofVec3f normal = mesh.getNormal(v); // or calculate
    v += normal * swell * maxDisplacement;
}

// Multiple frequency swell
float swell1 = sin(time * 1.0) * 0.3; // slow breath
float swell2 = sin(time * 3.0) * 0.1; // fast pulse
float totalSwell = swell1 + swell2;


---

## GLSL Key

`See database.json for shader translation`
