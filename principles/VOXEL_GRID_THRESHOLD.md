# Voxel Grid Threshold

**ID:** `VOXEL_GRID_THRESHOLD` | **Category:** Spatial | **Weird Factor:** 7/10

## Source

- **Sketch:** Voxel grid
- **Date:** 2026-03-10
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

3D grid where noise value determines if a voxel is rendered.

## What Makes It Weird

Instead of placing voxels by hand or with physics, noise creates the structure - emergent architecture.

## The Twist

Threshold creates sharp edges in otherwise smooth noise, making architectural forms appear from chaos.

---

## Emotional Quality

**technical_sci_fi** - Like watching a city plan crystallize from fog. Technical, emergent, mysterious.

---

## Variations

- [ ] Multiple threshold layers
- [ ] Animated noise (shifting structure)
- [ ] Different voxel sizes per threshold band
- [ ] Color by threshold value
- [ ] Hollow structures (invert threshold)

---

## Related Principles

- [[NOISE_MASKED_GEOMETRY]] - Both use noise for spatial culling
- [[CIRCLE_PACKING_GROWTH]] - Emergent spatial patterns

## Combinations

- [[PROXIMITY_NOISE]] - Noise-Gated Connections
- [[TORUS_VOXELIZER]] - Torus Voxelizer

---

## Code Reference


// Voxel grid with noise threshold
for (int x = 0; x < gridSize; x++) {
    for (int y = 0; y < gridSize; y++) {
        for (int z = 0; z < gridSize; z++) {
            float noiseVal = ofNoise(x * 0.1, y * 0.1, z * 0.1);
            if (noiseVal > 0.5) { // threshold
                ofDrawBox(x * spacing, y * spacing, z * spacing, voxelSize);
            }
        }
    }
}
// Only voxels where noise > 0.5 are rendered


---

## GLSL Key

`See database.json for shader translation`
