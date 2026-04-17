# Technical Cutaway

**ID:** `TECHNICAL_CUTAWAY`

**Ingredients:** [[WIREFRAME_OVERLAY_BLEND]] + [[NOISE_MASKED_GEOMETRY]]

**Result:** Blueprint + selective reveal - technical documentation aesthetic

---

## Description

Overlay wireframe on noise-masked geometry to create technical documentation look. Some faces are revealed, others hidden, with wireframe showing the underlying structure.

---

## How To


1. Create base geometry
2. Apply noise mask to selectively render faces
3. Draw full geometry as wireframe overlay
4. Use different colors for revealed vs wireframe


---

## GLSL Hint


// Render solid faces where noise permits
float n = noise3D(centroid);
float visible = step(0.4, n) * (1.0 - step(0.6, n));
// Always render wireframe
vec3 wire = wireframeOverlay(barycentric);
// Mix based on visibility
vec3 final = mix(wire, solid, visible);


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
