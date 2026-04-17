# Ribbon Twist Deformation

**ID:** `RIBBON_TWIST_DEFORM` | **Category:** Deformation | **Weird Factor:** 7/10

## Source

- **Sketch:** Ribbon sketches
- **Date:** 2025-12-01
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Twist a flat ribbon along its path.

## What Makes It Weird

Simple 2D ribbon becomes 3D through progressive rotation along its length.

## The Twist

Twist amount can vary along the ribbon, creating sections of flat and twisted.

---

## Emotional Quality

**flowing_graceful** - Like fabric in wind or a gymnast's ribbon. Graceful, flowing, elegant.

---

## Variations

- [ ] Progressive twist (more at end)
- [ ] Sine wave along ribbon edge
- [ ] Variable width
- [ ] Multiple ribbon strands
- [ ] Ribbon following a 3D curve

---

## Related Principles

- [[SWELL_DEFORMATION]] - Mesh deformation
- [[BIDIRECTIONAL_ORBITAL_TRAILS]] - Curved paths

## Combinations

- [[SPIRAL_RIBBON]] - Spiral Ribbon

---

## Code Reference


// Ribbon along curve with twist
ofVec3f getCurvePoint(float t) {
    // Catmull-Rom or Bezier curve
    return bezier(t, controlPoints);
}

void drawRibbon() {
    for (float t = 0; t < 1; t += 0.01) {
        ofVec3f pos = getCurvePoint(t);
        ofVec3f tangent = getCurveTangent(t).getNormalized();

        // Twist increases along curve
        float twist = t * twistAmount + ofGetElapsedTimef() * twistSpeed;

        // Normal perpendicular to tangent
        ofVec3f ref = abs(tangent.y) < 0.9 ? ofVec3f(0,1,0) : ofVec3f(1,0,0);
        ofVec3f normal = tangent.getCrossed(ref).getNormalized();
        ofVec3f binormal = tangent.getCrossed(normal).getNormalized();

        // Rotate normal by twist
        normal = normal * cos(twist) + binormal * sin(twist);

        // Draw ribbon segment
        ofVec3f left = pos - normal * ribbonWidth * 0.5;
        ofVec3f right = pos + normal * ribbonWidth * 0.5;
        // Add to mesh...
    }
}


---

## GLSL Key

`See database.json for shader translation`
