# Alternate Torus Flip

**ID:** `ALTERNATE_TORUS_FLIP` | **Category:** 3D Topology | **Weird Factor:** 9/10

## Source

- **Sketch:** Alternate torus
- **Date:** 2023-09-12
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Inside-out surface rendering of torus.

## What Makes It Weird

Flips face normals so you see the 'inside' of the surface - impossible in physical reality.

## The Twist

Can alternate which faces point outward based on noise or position, creating patchwork surfaces.

---

## Emotional Quality

**mind_bending** - Like looking at a mobius strip or klein bottle. Breaks intuitive understanding of inside/outside.

---

## Variations

- [ ] Gradual flip (transition zone)
- [ ] Flip based on viewing angle
- [ ] Partial flip (some faces, not all)
- [ ] Animated flip over time
- [ ] Noise-driven flip pattern

---

## Related Principles

- [[RAMPAGING_TORUS_KNOT]] - Torus topology
- [[NOISE_MASKED_GEOMETRY]] - Selective face rendering

## Combinations

- [[TORUS_VOXELIZER]] - Torus Voxelizer

---

## Code Reference


// Torus flip in shader
// Vertex shader:
vec3 normal = calculateNormal(position);
float flip = step(0.5, ofNoise(position * 2.0));
normal *= mix(1.0, -1.0, flip); // flip half the faces

// Or in OF:
for (auto& face : mesh.getFaces()) {
    ofVec3f center = face.getCentroid();
    if (ofNoise(center * 0.1) > 0.5) {
        // Flip this face's normal
        swap(face.getVertex(0), face.getVertex(2));
    }
}
// Now some faces point inward, some outward


---

## GLSL Key

`See database.json for shader translation`
