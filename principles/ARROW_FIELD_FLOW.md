# Arrow Field Flow

**ID:** `ARROW_FIELD_FLOW` | **Category:** Motion | **Weird Factor:** 6/10

## Source

- **Sketch:** Arrow sketches
- **Date:** 2025-11-12
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Grid of arrows that rotate to point toward a target.

## What Makes It Weird

Simple directional indicators create emergent flow field visualization - complex patterns from simple rules.

## The Twist

Arrows can point toward multiple targets with weighted influence, creating interference patterns.

---

## Emotional Quality

**directed_energy** - Like watching magnetic fields or wind patterns. Invisible forces made visible.

---

## Variations

- [ ] Arrow length by field strength
- [ ] Color gradient along field lines
- [ ] Animated wobble on direction
- [ ] Particles that follow arrows
- [ ] Multiple competing targets

---

## Related Principles

- [[TRAIL_HISTORY_BUFFER]] - Motion visualization
- [[FRAME_SYNCED_SPIRAL_SPAWN]] - Rotational patterns

## Combinations

- [[ARROW_GRAVITY]] - Arrow Gravity

---

## Code Reference


// Arrow field
for (int x = 0; x < cols; x++) {
    for (int y = 0; y < rows; y++) {
        ofVec2f arrowPos(x * spacing, y * spacing);

        // Direction to target(s)
        ofVec2f dir;
        for (auto& target : targets) {
            ofVec2f toTarget = target.pos - arrowPos;
            float weight = 1.0 / (toTarget.length() + 0.1);
            dir += toTarget.getNormalized() * weight;
        }
        dir.normalize();

        // Draw arrow
        float angle = atan2(dir.y, dir.x);
        ofPushMatrix();
        ofTranslate(arrowPos);
        ofRotateRad(angle);
        ofDrawLine(0, 0, arrowLength, 0);
        ofDrawTriangle(arrowLength, -3, arrowLength, 3, arrowLength + 5, 0);
        ofPopMatrix();
    }
}


---

## GLSL Key

`See database.json for shader translation`
