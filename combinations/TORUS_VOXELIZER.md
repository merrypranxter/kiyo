# Torus Voxelizer

**ID:** `TORUS_VOXELIZER`

**Ingredients:** [[RAMPAGING_TORUS_KNOT]] + [[VOXEL_GRID_THRESHOLD]]

**Result:** 3D printed torus knots as voxel structures

---

## Description

Sample a torus knot SDF on a voxel grid. The knot becomes a blocky, Minecraft-like structure that still follows the smooth knot path.

---

## How To


1. Define torus knot SDF
2. Sample on 3D grid
3. Place voxel where SDF < threshold
4. Vary voxel size by SDF gradient


---

## GLSL Hint


// Torus knot SDF
float sdTorusKnot(vec3 p) {
    float r = length(p.xy) - majorRadius;
    vec2 q = vec2(length(vec2(r, p.z)) - minorRadius, atan(p.y,p.x));
    // ... knot parameterization
    return length(q) - tubeRadius;
}
// Place voxel if inside
if (sdTorusKnot(gridPos) < 0) renderVoxel();


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
