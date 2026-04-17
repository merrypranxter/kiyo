# Generative Heart

**ID:** `HEART_GENERATIVE` | **Category:** Shape | **Weird Factor:** 6/10

## Source

- **Sketch:** Heart on heart
- **Date:** 2025-06-18
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Parametric heart shape generation.

## What Makes It Weird

Uses parametric equations to create organic heart shapes rather than loaded models - procedural romance.

## The Twist

Multiple overlapping hearts with slight parameter variations create moire patterns and beating effects.

---

## Emotional Quality

**romantic_soft** - Warm, familiar, intimate. The universal symbol rendered through code.

---

## Variations

- [ ] Beating animation (scale pulse)
- [ ] Hearts made of particles
- [ ] Broken/shattered hearts
- [ ] Hearts that morph into other shapes
- [ ] 3D extruded hearts

---

## Related Principles

- [[SWELL_DEFORMATION]] - Organic deformation

## Combinations

- [[STROBE_HEARTBEAT]] - Strobe Heartbeat

---

## Code Reference


// Parametric heart
ofBeginShape();
for (float t = 0; t < TWO_PI; t += 0.01) {
    float x = 16 * pow(sin(t), 3);
    float y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t));
    ofVertex(x * scale, y * scale);
}
ofEndShape(true);

// Multiple overlapping hearts with variation
for (int i = 0; i < 10; i++) {
    float offset = ofRandom(-5, 5);
    float s = scale * ofRandom(0.8, 1.2);
    // Draw heart at offset with size s
}


---

## GLSL Key

`See database.json for shader translation`
