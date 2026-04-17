# Bidirectional Orbital Trails

**ID:** `BIDIRECTIONAL_ORBITAL_TRAILS` | **Category:** Motion | **Weird Factor:** 7/10

## Source

- **Sketch:** A missed connection
- **Date:** 2026-04-08
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Particles move in opposite directions on concentric rings.

## What Makes It Weird

Instead of all particles rotating the same direction, alternating rings (or random assignment) create counter-rotation.

## The Twist

Trails are drawn as overlapping circles, not lines - creating 'fat' motion blur artifacts that feel organic.

---

## Emotional Quality

**melancholic_yearning** - The counter-rotation suggests missed connections, parallel lives, things that almost touch but never do.

---

## Variations

- [ ] Speed differential between directions
- [ ] Gradual direction change over time
- [ ] Varying trail circle sizes
- [ ] Color per direction
- [ ] Accelerating/decelerating orbits

---

## Related Principles

- [[TRAIL_HISTORY_BUFFER]] - Both create persistent motion trails
- [[ARROW_FIELD_FLOW]] - Directional motion patterns

## Combinations

- [[ROTATING_AQUARIUM]] - Rotating Aquarium
- [[GRAVITY_WELL_ORBIT]] - Gravity Well Orbit

---

## Code Reference


// Counter-rotating rings
for (int ring = 0; ring < ringCount; ring++) {
    float direction = (ring % 2 == 0) ? 1 : -1; // alternate
    float speed = baseSpeed * (1 + ring * 0.1);
    float angle = ofGetElapsedTimef() * speed * direction + ringOffset;

    // Draw trail as overlapping circles
    for (int t = 0; t < trailLength; t++) {
        float trailAngle = angle - t * 0.1 * direction;
        float x = cos(trailAngle) * radius;
        float y = sin(trailAngle) * radius;
        float size = ofMap(t, 0, trailLength, 5, 2);
        ofDrawCircle(x, y, size); // fat trails!
    }
}


---

## GLSL Key

`See database.json for shader translation`
