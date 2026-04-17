# Rampaging Torus Knot

**ID:** `RAMPAGING_TORUS_KNOT` | **Category:** 3D Topology | **Weird Factor:** 9/10

## Source

- **Sketch:** Rampaging torus
- **Date:** 2023-03-24
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Chaotic parameters on torus knot creating unstable, evolving forms.

## What Makes It Weird

Torus knot parameters (p, q) animated with noise instead of fixed - topology becomes fluid and unpredictable.

## The Twist

The knot can self-intersect and unravel in ways physical string couldn't - impossible geometry.

---

## Emotional Quality

**chaotic_energetic** - Like watching a roller coaster designed by a madman. Unpredictable, thrilling, slightly dangerous.

---

## Variations

- [ ] Extreme p/q values (wild shapes)
- [ ] Multiple overlapping knots
- [ ] Knot trail (history of positions)
- [ ] Knot as particle emitter
- [ ] Adaptive tube radius along knot

---

## Related Principles

- [[ALTERNATE_TORUS_FLIP]] - Torus topology variations
- [[SWELL_DEFORMATION]] - Organic 3D deformation

## Combinations

- [[TORUS_VOXELIZER]] - Torus Voxelizer

---

## Code Reference


// Rampaging torus knot
float theta = ofGetElapsedTimef() * 0.5;
float p = 2.0 + ofNoise(theta * 0.5) * 3.0; // chaotic p
float q = 3.0 + ofNoise(theta * 0.3 + 100) * 2.0; // chaotic q

ofBeginShape();
for (float t = 0; t < TWO_PI * q; t += 0.01) {
    float r = cos(q * t) + 2.0;
    float x = r * cos(p * t);
    float y = r * sin(p * t);
    float z = -sin(q * t);
    ofVertex(x * scale, y * scale, z * scale);
}
ofEndShape();
// p and q change over time, so the knot constantly morphs


---

## GLSL Key

`See database.json for shader translation`
