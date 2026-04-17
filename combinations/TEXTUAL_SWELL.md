# Textual Swell

**ID:** `TEXTUAL_SWELL`

**Ingredients:** [[PRINT_TEXT_GENERATIVE]] + [[SWELL_DEFORMATION]]

**Result:** Typography that inflates and breathes

---

## Description

Convert text to geometry then apply swell deformation. Letters appear to breathe or inflate like balloons.

---

## How To


1. Convert text to mesh/vertices
2. Calculate normals for each vertex
3. Apply sine-based displacement along normals
4. Vary displacement by letter and position


---

## GLSL Hint


// Displace text vertices
for (auto& v : textMesh.getVertices()) {
    float noise = ofNoise(v * 0.05);
    float swell = sin(iTime * 2 + noise * 5) * 0.5 + 0.5;
    v += normal * swell * maxDisp;
}


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
