# Noise Masked Geometry

**ID:** `NOISE_MASKED_GEOMETRY` | **Category:** Geometry | **Weird Factor:** 9/10

## Source

- **Sketch:** Sphere by triangles
- **Date:** 2026-04-05
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Use 3D noise to selectively render faces of geometry.

## What Makes It Weird

Instead of culling by normal or frustum, Perlin noise decides which faces exist - creating organic erosion effects on rigid geometry.

## The Twist

Inset triangles (scaled 0.6x toward centroid) create 'cut-out' effect without expensive boolean operations.

---

## Emotional Quality

**technical_sci_fi** - Like watching a technical diagram dissolve and reform. Precise yet organic - alien technology aesthetic.

---

## Variations

- [ ] Animated noise (time-evolving mask)
- [ ] Multi-octave noise masking
- [ ] Inverted mask (render outside range)
- [ ] Gradient threshold instead of binary
- [ ] Noise-driven inset amount

---

## Related Principles

- [[VOXEL_GRID_THRESHOLD]] - Both use noise for spatial culling
- [[MOSAIC_RECONSTRUCTION]] - Geometric decomposition patterns

## Combinations

- [[PROXIMITY_NOISE]] - Noise-Gated Connections
- [[TECHNICAL_CUTAWAY]] - Technical Cutaway

---

## Code Reference


// Noise-based face culling
for (auto& face : mesh.getFaces()) {
    ofVec3f centroid = (face.getVertex(0) + face.getVertex(1) + face.getVertex(2)) / 3;
    float noiseVal = ofNoise(centroid * 0.01);

    // Only render faces where noise is in specific range
    if (noiseVal > 0.4 && noiseVal < 0.6) {
        // Inset triangle toward centroid
        ofVec3f v0 = ofVec3f::middle(face.getVertex(0), centroid, 0.6);
        ofVec3f v1 = ofVec3f::middle(face.getVertex(1), centroid, 0.6);
        ofVec3f v2 = ofVec3f::middle(face.getVertex(2), centroid, 0.6);
        ofDrawTriangle(v0, v1, v2);
    }
}


---

## GLSL Key

`See database.json for shader translation`
