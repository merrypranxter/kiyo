# Wireframe Overlay Blend

**ID:** `WIREFRAME_OVERLAY_BLEND` | **Category:** Rendering | **Weird Factor:** 6/10

## Source

- **Sketch:** Wireframe sketches
- **Date:** 2026-02-28
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Triangle edge overlay on solid geometry.

## What Makes It Weird

Technical drawing aesthetic combined with organic forms - blueprint meets biology.

## The Twist

Wireframe uses different blend mode than solid, creating layered depth that reads as both structural and finished.

---

## Emotional Quality

**technical_sci_fi** - Like seeing the scaffolding behind a building. Reveals the underlying structure.

---

## Variations

- [ ] Animated wireframe pulse
- [ ] Wireframe only on noise-selected faces
- [ ] Different wire colors per face group
- [ ] Wireframe thickness by depth
- [ ] Dashed wireframe lines

---

## Related Principles

- [[BLEND_MODE_MOOD_MAPPING]] - Blend mode layering
- [[NOISE_MASKED_GEOMETRY]] - Selective geometry rendering

## Combinations

- [[TECHNICAL_CUTAWAY]] - Technical Cutaway

---

## Code Reference


// Wireframe overlay using barycentric coordinates
// In fragment shader:
vec3 bary = vBarycentric;
vec3 d = fwidth(bary);
vec3 edge = smoothstep(vec3(0.0), d * 1.5, bary);
float edgeFactor = min(min(edge.x, edge.y), edge.z);

vec3 wireframeColor = mix(vec3(1.0), solidColor, edgeFactor);

// Draw solid first, then wireframe on top with ADD blend
ofEnableBlendMode(OF_BLENDMODE_ALPHA);
// draw solid geometry
ofEnableBlendMode(OF_BLENDMODE_ADD);
// draw wireframe edges


---

## GLSL Key

`See database.json for shader translation`
